import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { CreateFormDTO } from './form.dto';
import { FormSubmissionEventPayload, IntakeFormData } from './interface';
import { Experience, Ministry, UnionMembership } from '../common/enums';
import { Form } from '../database/entities/form.entity';
import { PersonnelEntity } from '../database/entities/personnel.entity';
import { FunctionService } from '../function/function.service';
import { AppLogger } from '../logger/logger.service';
import { CreatePersonnelDTO } from '../personnel';
import { EmcrPersonnelExperienceDTO } from '../personnel/dto/emcr';
import { PersonnelService } from '../personnel/personnel.service';
import { RegionsAndLocationsService } from '../region-location/region-location.service';

@Injectable()
export class FormService {
  constructor(
    @InjectRepository(Form) private formRepo: Repository<Form>,
    @Inject(PersonnelService) private personnelService: PersonnelService,
    @Inject(RegionsAndLocationsService)
    private locationService: RegionsAndLocationsService,
    @Inject(FunctionService) private functionService: FunctionService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(FormService.name);
  }
  /**
   * process form submission event payload
   * @param eventPayload
   */
  public async processEventPayload(eventPayload: FormSubmissionEventPayload) {
    this.logger.log(
      `${this.processEventPayload.name}, Submission ID: ${eventPayload.submissionId}, form ID: ${eventPayload.formId}`,
    );
    const { submissionId, formId } = eventPayload;
    const requestFormData = await axios.get(
      `${process.env.CHEFS_API}/app/api/v1/submissions/${submissionId}`,
      {
        auth: {
          username: `${formId}`,
          password: `${process.env.CHEFS_API_KEY}`,
        },
      },
    );
    this.logger.log(`Received form data from submission event`);
    requestFormData &&
      this.processFormData({
        submissionId,
        formId,
        data: requestFormData.data.submission.submission.data,
      });
  }
  //TODO PROD: unique constraint on email address
  /**
   * Create a new form entity, and passes the form id and submission id to createPersonnel function
   * @param submission
   */
  async processFormData(submission: CreateFormDTO): Promise<PersonnelEntity[]> {
    const form = await this.saveForm(submission);
    return await this.createPersonnel(submission.data, form);
  }
  /**
   * Saves the form id and submission id
   * @param data
   * @returns
   */
  async saveForm(data: CreateFormDTO): Promise<Form> {
    try {
      this.logger.log(`Form data saved successfully`);
      return await this.formRepo.save(this.formRepo.create(data));
    } catch (e) {
      this.logger.error(`Error saving form data: ${e}`);
    }
  }
  /**
   * Creates a new personnel entity from the form
   * @param data
   * @param form
   * @returns
   */
  async createPersonnel(
    data: IntakeFormData,
    form: Form,
  ): Promise<PersonnelEntity[]> {
    const {
      personalDetails,
      roles,
      workDetails,
      supervisorInfo,
      experience,
      deploymentPreferences,
      other,
    } = data;
    const workLocation = await this.locationService.getLocationByName(
      workDetails.workLocation,
    );
    const homeLocation = await this.locationService.getLocationByName(
      personalDetails.homeLocation,
    );
    const functions = await this.functionService.getFunctions();
    const interestedIn = Object.keys(roles).filter(
      (role) => roles[role] === true,
    );
    const functionsArray: EmcrPersonnelExperienceDTO[] = functions
      .filter((func) => interestedIn.includes(func.abbreviation))
      .map((func) => ({
        functionId: func.id,
        experienceType: Experience.INTERESTED,
      }));
    const createPersonnelDTO: CreatePersonnelDTO = {
      firstName: personalDetails.firstName,
      lastName: personalDetails.lastName,
      ministry: Object.values(Ministry)[0],
      primaryPhone: personalDetails.primaryPhone.replace(/[(]|-|[)]|\s/gi, ''),
      secondaryPhone:
        personalDetails?.secondaryPhone?.replace(/[(]|-|[)]|\s/gi, '') ?? '',
      workPhone: workDetails.workPhone.replace(/[(]|-|[)]|\s/gi, ''),
      email: workDetails.workEmail,
      supervisorFirstName: supervisorInfo?.supervisorFirstName,
      supervisorLastName: supervisorInfo?.supervisorLastName,
      supervisorEmail: supervisorInfo?.supervisorEmail,
      unionMembership: UnionMembership[workDetails.unionMembership],
      remoteOnly: deploymentPreferences.remoteOnly,
      willingToTravel: deploymentPreferences.willingToTravel,
      jobTitle: workDetails.jobTitle,
      driverLicense: other.dl,
      intakeForm: form,
    };
    const emcrData = {
      applicationDate: new Date(),
      peccExperience:
        experience.pecc === '' ? false : (experience.pecc as boolean),
      preocExperience:
        experience.preoc === '' ? false : (experience.preoc as boolean),
      emergencyExperience:
        experience.emergency === '' ? false : (experience.emergency as boolean),
      firstAidLevel: other.firstAid.level,
      firstAidExpiry: other.firstAid.expiryDate,
      psychologicalFirstAid: other.pfa === '' ? false : (other.pfa as boolean),
      coordinatorNotes: '',
      logisticsNotes: '',
      trainings: [],
      experiences: functionsArray,
      homeLocation,
      workLocation,
    };
    //TODO
    console.log(emcrData);
    try {
      this.logger.log(`Form data saved successfully`);
      return await this.personnelService.createPersonnel([createPersonnelDTO]);
    } catch (e) {
      this.logger.error(`Error saving form data: ${e}`);
    }
  }
}
