import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { CreateFormDTO } from './form.dto';
import {
  BcwsFormData,
  EmcrFormData,
  FormDeployment,
  FormSubmissionEventPayload,
  IntakeFormData,
  PersonnelFormData,
} from './interface';
import { FormSubmissionDTO } from './submission.dto';
import { Program } from '../auth/interface';
import { BcwsService } from '../bcws/bcws.service';
import { CreatePersonnelBcwsDTO } from '../bcws/dto';
import {
  CertificationName,
  DriverLicense,
  Experience,
  ExperienceLevel,
  LanguageLevelType,
  LanguageProficiency,
  Ministry,
  Section,
  Status,
  ToolsProficiency,
  UnionMembership,
} from '../common/enums';
import { TravelPreference } from '../common/enums/travel-preference.enum';
import { Form } from '../database/entities/form.entity';
import { CreatePersonnelEmcrDTO } from '../emcr/dto';
import { EmcrService } from '../emcr/emcr.service';
import { AppLogger } from '../logger/logger.service';
import { CreatePersonnelDTO } from '../personnel';
import { CreateCertificationsDTO } from '../personnel/dto/skills/create-certifications.dto';
import { PersonnelService } from '../personnel/personnel.service';

@Injectable()
export class FormService {
  constructor(
    @InjectRepository(Form) private formRepo: Repository<Form>,
    @Inject(PersonnelService) private personnelService: PersonnelService,
    @Inject(EmcrService) private emcrService: EmcrService,
    @Inject(BcwsService) private bcwsService: BcwsService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(FormService.name);
  }
  /**
   * process form submission event payload
   * @param eventPayload
   */
  public async processEventPayload(
    eventPayload: FormSubmissionEventPayload,
  ): Promise<Form> {
    const { submissionId, formId, subscriptionEvent } = eventPayload;

    this.logger.log(`Event: ${subscriptionEvent}`);

    if (subscriptionEvent === 'eventSubmission') {
      this.logger.log(`Requesting form data from submission event`);
      this.logger.log(`Submission ID: ${submissionId}`);
      this.logger.log(`Form ID: ${formId}`);

      const requestFormData: FormSubmissionDTO = await axios.get(
        `${process.env.CHEFS_API}/app/api/v1/submissions/${submissionId}`,
        {
          auth: {
            username: `${formId}`,
            password: `${process.env.CHEFS_API_KEY}`,
          },
        },
      );

      this.logger.log(`Received form data from submission event`);

      if (requestFormData.data.submission.draft === true) {
        this.logger.error(`Error saving form data: Draft submission received`);
        throw new BadRequestException(`Draft submission received`);
      }

      const form =
        requestFormData &&
        (await this.processFormData({
          submissionId: requestFormData.data.submission.id,
          formId: formId,
          data: requestFormData.data.submission.submission.data,
        }));
      return form;
    }
  }
  //TODO PROD: unique constraint on email address
  /**
   * Create a new form entity, and passes the form id and submission id to createPersonnel function
   * @param submission
   */
  async processFormData(submission: CreateFormDTO): Promise<Form> {
    this.logger.log(
      `Parsing form data for: ${submission.data.personnel?.program} program(s)`,
    );

    const form = await this.saveForm(submission);
    this.logger.log(`Form data saved successfully. Form id: ${form.id}`);

    const successMessage = await this.createPersonnelEntities(
      submission.data,
      form.id,
    );

    this.logger.log(`${successMessage}`);
    return form;
  }
  /**
   * Saves the form id and submission id
   * @param data
   * @returns
   */
  async saveForm(data: CreateFormDTO): Promise<Form> {
    try {
      return await this.formRepo.save(this.formRepo.create(data));
    } catch (e) {
      this.logger.error(`Error saving form data: ${e}`);
      throw new BadRequestException(e);
    }
  }
  /**
   * Creates a new personnel entity from the form
   * @param data
   * @param form
   * @returns
   */
  async createPersonnelEntities(
    data: IntakeFormData,
    formId: number,
  ): Promise<string> {
    let deployment;
    if (data.personnel.deployment.emcr) {
      deployment = data.personnel.deployment.emcr;
    } else if (data.personnel.deployment.bcws) {
      deployment = data.personnel.deployment.bcws;
    } else {
      deployment = data.personnel.deployment.both;
    }

    const emcrPersonnel =
      data.personnel.program === 'EMCR' || data.personnel.program === 'BOTH'
        ? this.parseEmcrPersonnel(data.emcr, deployment)
        : undefined;

    const bcwsPersonnel =
      data.personnel.program === 'BCWS' || data.personnel.program === 'BOTH'
        ? this.parseBcwsPersonnel(data.bcws, deployment)
        : undefined;

    if (data.personnel.program === 'BOTH' && !emcrPersonnel && !bcwsPersonnel) {
      this.logger.error(
        `Error saving form data: Both programs selected but no data found for either program`,
      );
      throw new BadRequestException(
        `Both programs selected but no data found for either program`,
      );
    } else if (data.personnel.program === 'EMCR' && !emcrPersonnel) {
      this.logger.error(
        `Error saving form data: EMCR program selected but no data found for EMCR program`,
      );
      throw new BadRequestException(
        `EMCR program selected but no data found for EMCR program`,
      );
    } else if (data.personnel.program === 'BCWS' && !bcwsPersonnel) {
      this.logger.error(
        `Error saving form data: BCWS program selected but no data found for BCWS program`,
      );
      throw new BadRequestException(
        `BCWS program selected but no data found for BCWS program`,
      );
    }
    const personnel = this.parsePersonnel(
      data.personnel,
      formId,
      data.personnel.pfa,
      data.personnel.firstAidLevel,
      data.personnel.firstAidExpiry,
    );

    try {
      const person = await this.personnelService.createOnePerson(personnel);
      emcrPersonnel &&
        (await this.emcrService.createEmcerPersonnel(emcrPersonnel, person.id));
      bcwsPersonnel &&
        (await this.bcwsService.createBcwsPersonnel(bcwsPersonnel, person.id));

      return 'Created Personnel Successfully';
    } catch (e) {
      this.logger.error(`Error saving form data: ${e}`);
      throw new BadRequestException(e);
    }
  }

  parseTravelPreference(deployment: FormDeployment, route: Program) {
    switch (deployment) {
      case 'remoteOnly':
        return TravelPreference.REMOTE_ONLY;
      case 'travelHome':
        return TravelPreference.WILLING_TO_TRAVEL_HOME_LOCATION;
      case 'travelFireZone':
        return route === Program.BCWS
          ? TravelPreference.WILLING_TO_TRAVEL_FIRE_ZONE
          : TravelPreference.WILLING_TO_TRAVEL_HOME_LOCATION;
      case 'travelFireCentre':
        return route === Program.BCWS
          ? TravelPreference.WILLING_TO_TRAVEL_FIRE_CENTRE
          : TravelPreference.WILLING_TO_TRAVEL_REGION;
      case 'travelRegion':
        return route === Program.EMCR
          ? TravelPreference.WILLING_TO_TRAVEL_REGION
          : TravelPreference.WILLING_TO_TRAVEL_FIRE_CENTRE;
      case 'travelAnywhere':
        return TravelPreference.WILLING_TO_TRAVEL_ANYWHERE;
      default:
        return TravelPreference.WILLING_TO_TRAVEL_UNKNOWN;
    }
  }

  parsePersonnel(
    data: PersonnelFormData,
    formId: number,
    pfa: string,
    firstAidLevel?: string,
    firstAidExpiry?: Date,
  ): CreatePersonnelDTO {
    const uniqueToolIds = Array.from(
      new Set(data?.tools?.map((itm) => itm.name.id)),
    );

    const tools = uniqueToolIds?.map((itm) => ({
      toolId: itm,
      proficiencyLevel:
        ToolsProficiency[
          data.tools.find((tool) => tool.name.id === itm).proficiency.name
        ],
    }));
    const parsedCertifications: CreateCertificationsDTO[] =
      data.certificates?.map((itm) => ({
        certificationId: itm?.id,
        expiry:
          itm?.id === 6
            ? data?.foodSafe1Expiry
            : itm?.id === 7
            ? data?.foodSafe2Expiry
            : undefined,
      })) ?? [];

    if (pfa === 'yes') {
      parsedCertifications.push({ certificationId: 2, expiry: undefined });
    }

    if (firstAidLevel) {
      if (CertificationName[firstAidLevel] === CertificationName.OFA_I) {
        parsedCertifications.push({
          certificationId: 8,
          expiry: firstAidExpiry,
        });
      } else if (
        CertificationName[firstAidLevel] === CertificationName.OFA_II
      ) {
        parsedCertifications.push({
          certificationId: 9,
          expiry: new Date(firstAidExpiry),
        });
      } else if (
        CertificationName[firstAidLevel] === CertificationName.OFA_III
      ) {
        parsedCertifications.push({
          certificationId: 10,
          expiry: new Date(firstAidExpiry),
        });
      }
    }

    const personnelData: CreatePersonnelDTO = {
      intakeFormId: formId,
      employeeId: data.employeeId,
      paylistId: data.paylistId,
      unionMembership: UnionMembership[data.unionMembership],
      ministry: Ministry[data.ministry.value],
      division: data.division,
      homeLocation: data.homeLocation,
      workLocation: data.workLocation,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      primaryPhone: data.primaryPhone.replace(/[(]|-|[)]|\s/gi, ''),
      secondaryPhone: data?.secondaryPhone?.replace(/[(]|-|[)]|\s/gi, ''),
      workPhone: data?.workPhone?.replace(/[(]|-|[)]|\s/gi, ''),
      supervisorEmail: data.supervisorEmail?.toLowerCase().trim(),
      supervisorLastName: data.supervisorLastName,
      supervisorFirstName: data.supervisorFirstName,
      supervisorPhone: data?.supervisorPhoneNumber?.replace(
        /[(]|-|[)]|\s/gi,
        '',
      ),
      driverLicense: data.dl.map((itm) => DriverLicense[itm]),
      jobTitle: data.jobTitle,

      languages: Array.from(
        new Set(
          data?.languages?.map((itm) => ({
            language: itm.language,
            level:
              LanguageProficiency[
                itm.proficiency.split('.')[0] ?? itm.proficiency
              ],
            type: LanguageLevelType[itm.proficiency.split('.')[1] ?? 'BOTH'],
          })),
        ),
      ),

      tools: tools ?? [],
      certifications: parsedCertifications ?? [],
      emergencyContactFirstName: data.emergencyContactFirstName,
      emergencyContactLastName: data.emergencyContactLastName,
      emergencyContactPhoneNumber: data.emergencyContactPhoneNumber?.replace(
        /[(]|-|[)]|\s/gi,
        '',
      ),
      emergencyContactRelationship: data.emergencyContactRelationship,
    };
    return personnelData;
  }

  parseEmcrPersonnel(
    data: EmcrFormData,
    deployment: FormDeployment,
  ): CreatePersonnelEmcrDTO {
    const functions = Object.keys(data.functions).filter(
      (itm) => data.functions[itm] === true,
    );

    const emcrData: CreatePersonnelEmcrDTO = {
      dateApplied: new Date(),
      firstNationExperienceWorking: data.experience?.firstNationsWorking,
      peccExperience: data.experience?.peccExperience,
      preocExperience: data.experience?.preocExperience,
      emergencyExperience: data.experience?.emergencyExperience,
      trainings: [],
      travelPreference: this.parseTravelPreference(deployment, Program.EMCR),
      experiences: functions.map((itm) => ({
        functionId: parseInt(itm),
        experienceType: Experience.INTERESTED,
      })),
    };

    return emcrData;
  }

  parseBcwsPersonnel(
    data: BcwsFormData,
    deployment: FormDeployment,
  ): CreatePersonnelBcwsDTO {
    //TODO prevent duplicate tools to be submitted and then remove this:

    //TODO prevent duplicate tools to be submitted and then remove this:
    const roles = Object.keys(data?.sections)
      ?.map((itm) => data?.sections[itm])
      .filter((itm) => itm?.length > 0)
      .flatMap(
        (itm) =>
          // eslint-disable-next-line
          itm?.map(
            ({
              role,
              experience,
            }: {
              role: { id: number };
              experience: ExperienceLevel;
            }) => ({
              roleId: role?.id,
              expLevel: experience,
            }),
          ),
      );

    const uniqueRoleIds = Array.from(new Set(roles?.map((itm) => itm?.roleId)));

    const uniqueRoles = uniqueRoleIds?.map(
      (itm) => roles?.find((role) => role?.roleId === itm),
    );

    const bcwsData: CreatePersonnelBcwsDTO = {
      dateApplied: new Date(),
      coordinatorNotes: '',
      logisticsNotes: '',
      status: Status.PENDING,
      purchaseCardHolder: data.purchaseCard,
      liaisonFirstName: data?.liaisonFirstName,
      liaisonLastName: data?.liaisonLastName,
      liaisonPhoneNumber: data?.liaisonPhoneNumber?.replace(
        /[(]|-|[)]|\s/gi,
        '',
      ),
      liaisonEmail: data.liaisonEmail,
      firstChoiceSection: Section[data.firstChoiceSection],
      secondChoiceSection:
        data.secondChoiceSection === ''
          ? undefined
          : Section[data.secondChoiceSection],
      travelPreference: this.parseTravelPreference(deployment, Program.BCWS),
      roles: uniqueRoles ?? [],
    };
    return bcwsData;
  }
}
