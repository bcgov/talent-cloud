import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { CreateFormDTO } from './form.dto';
import { BcwsFormData, EmcrFormData, FormSubmissionEventPayload, IntakeFormData, PersonnelFormData } from './interface';
import { Experience, ExperienceLevel, LanguageLevelType, LanguageProficiency, Status, ToolsProficiency, UnionMembership } from '../common/enums';
import { Form } from '../database/entities/form.entity';
import { AppLogger } from '../logger/logger.service';
import { CreatePersonnelDTO } from '../personnel';
import { CreatePersonnelBcwsDTO } from '../personnel/dto/bcws';
import { CreatePersonnelEmcrDTO } from '../personnel/dto/emcr';
import { PersonnelService } from '../personnel/personnel.service';
import { PersonnelEntity } from 'src/database/entities/personnel.entity';


@Injectable()
export class FormService {
  constructor(
    @InjectRepository(Form) private formRepo: Repository<Form>,
    @Inject(PersonnelService) private personnelService: PersonnelService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(FormService.name);
  }
  /**
   * process form submission event payload
   * @param eventPayload
   */
  public async processEventPayload(eventPayload: FormSubmissionEventPayload): Promise<Form>{
    const { submissionId, formId } = eventPayload;
    
    this.logger.log(`Requesting form data from submission event`);
    this.logger.log(`Submission ID: ${submissionId}`);
    this.logger.log(`Form ID: ${formId}`);

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
    this.logger.log(`Parsing form data for: ${requestFormData?.data?.submission?.submission?.data?.personnel?.program} program(s)`);
    this.logger.log(`Personnel Data:`)
    this.logger.log(requestFormData?.data?.submission?.submission?.data?.personnel)
    this.logger.log(`EMCR Data:`)
    this.logger.log(requestFormData?.data?.submission?.submission?.data?.emcr)
    this.logger.log(`BCWS Data: `)
    this.logger.log(requestFormData?.data?.submission?.submission?.data?.bcws)

    
      const form = requestFormData && await this.processFormData({
        submissionId,
        formId,
        data: requestFormData.data.submission.submission.data,
      });
      this.logger.log(`Form data saved successfully. Form id: ${form.id}`);
      return form
  }
  //TODO PROD: unique constraint on email address
  /**
   * Create a new form entity, and passes the form id and submission id to createPersonnel function
   * @param submission
   */
  async processFormData(submission: CreateFormDTO): Promise<Form> {
    const form = await this.saveForm(submission);
    const personnel = await this.createPersonnelEntities(submission.data, form.id);

    
      this.logger.log(`Personnel entities created successfully. Personnel id: ${personnel.id}`);
      return form
    
      
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
    formId: number
    
  ): Promise<PersonnelEntity> {
    
      const emcrPersonnel = data.personnel.program === 'EMCR' || data.personnel.program === 'BOTH' ? this.parseEmcrPersonnel(data.emcr) : undefined;
      const bcwsPersonnel = data.personnel.program === 'BCWS' || data.personnel.program === 'BOTH' ? this.parseBcwsPersonnel(data.bcws) : undefined;
    
      if(data.personnel.program === 'BOTH' && !emcrPersonnel && !bcwsPersonnel) {
      this.logger.error(`Error saving form data: Both programs selected but no data found for either program`);
      throw new BadRequestException(`Both programs selected but no data found for either program`);
    } else if( data.personnel.program === 'EMCR' && !emcrPersonnel) {
      this.logger.error(`Error saving form data: EMCR program selected but no data found for EMCR program`);
      throw new BadRequestException(`EMCR program selected but no data found for EMCR program`);
    } else if (
      data.personnel.program === 'BCWS' && !bcwsPersonnel) {
      this.logger.error(`Error saving form data: BCWS program selected but no data found for BCWS program`);
      throw new BadRequestException(`BCWS program selected but no data found for BCWS program`);
    } 
    const personnel = this.parsePersonnel(data.personnel, formId);
    

    try {
      return await this.personnelService.createOnePerson(personnel, emcrPersonnel, bcwsPersonnel);
    } catch (e) {
      this.logger.error(`Error saving form data: ${e}`);
      throw new BadRequestException(e);
    }
  }

  parsePersonnel(data: PersonnelFormData, formId: number): CreatePersonnelDTO {
    
    const personnelData: CreatePersonnelDTO = {
      intakeForm: formId,
      unionMembership: UnionMembership[data.unionMembership],
      ministry: data.ministry.value,
      division: data.division,
      homeLocation: data.homeLocation,
      workLocation: data.workLocation,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      primaryPhone: data.primaryPhone.replace(/[(]|-|[)]|\s/gi, ''),
      secondaryPhone: data?.secondaryPhone?.replace(/[(]|-|[)]|\s/gi, ''),
      workPhone: data?.workPhone?.replace(/[(]|-|[)]|\s/gi, ''),
      supervisorEmail: data.supervisorEmail,
      supervisorLastName: data.supervisorLastName,
      supervisorFirstName: data.supervisorFirstName,
      supervisorPhone: data?.supervisorPhoneNumber?.replace(/[(]|-|[)]|\s/gi, ''),
      remoteOnly: data.deployment === 'remoteOnly',
      driverLicense: data.dl,
      willingToTravel: data.deployment === "willingToTravel",
      availability: [],
      jobTitle: data.jobTitle,
    };
    return personnelData

  }

  parseEmcrPersonnel(data: EmcrFormData): CreatePersonnelEmcrDTO {
    const functions = Object.keys(data.functions).filter(itm => data.functions[itm] === true)

    const emcrData: CreatePersonnelEmcrDTO = {
      dateApplied: new Date(),
      firstNationExperienceWorking: data.experience?.firstNationsWorking,
      peccExperience: data.experience?.peccExperience,
      preocExperience: data.experience?.preocExperience,
      emergencyExperience: data.experience?.emergencyExperience,
      trainings: [],
      experiences: functions.map(itm => ({
        functionId: parseInt(itm),
        experienceType: Experience.INTERESTED
      }))
    }


    return emcrData
  }

  parseBcwsPersonnel(data: BcwsFormData): CreatePersonnelBcwsDTO {

    //TODO prevent duplicate tools to be submitted and then remove this:      
    const uniqueToolIds = Array.from(new Set(data?.tools?.map(itm => itm.name.id)))

    const tools = uniqueToolIds.map(itm =>
    ({
      toolId: itm,
      proficiencyLevel: ToolsProficiency[data.tools.find(tool => tool.name.id === itm).proficiency.name]
    }))


    //TODO prevent duplicate tools to be submitted and then remove this:      
    const roles = Object.keys(data.sections).map(itm =>
      data.sections[itm]
    ).filter(itm =>
      itm.length > 0
    ).flatMap(itm =>
      // eslint-disable-next-line 
      itm.map(({ role, experience }: { role: any; experience: ExperienceLevel }) =>
      ({
        roleId: role.id,
        expLevel: experience
      })))

    const uniqueRoleIds = Array.from(new Set(roles.map(itm => itm.roleId)))

    const uniqueRoles = uniqueRoleIds.map(itm => roles.find(role => role.roleId === itm))

    const bcwsData: CreatePersonnelBcwsDTO = {
      dateApplied: new Date(),
      coordinatorNotes: '',
      logisticsNotes: '',
      employeeId: data.employeeId,
      paylistId: data.paylistId,
      status: Status.PENDING,
      purchaseCardHolder: data.purchaseCard,
      liaisonFirstName: data?.liaisonFirstName,
      liaisonLastName: data?.liaisonLastName,
      liaisonPhoneNumber: data?.liaisonPhoneNumber?.replace(/[(]|-|[)]|\s/gi, ''),
      liaisonEmail: data.liaisonEmail,
      firstChoiceSection: data.firstChoiceSection,
      secondChoiceSection: data.secondChoiceSection,
      languages: Array.from(new Set(data?.languages?.map(itm => ({
        language: itm.language,
        level: LanguageProficiency[itm.proficiency.split('.')[0] ?? itm.proficiency],
        type: LanguageLevelType[itm.proficiency.split('.')[1] ?? 'BOTH']
      })))),
      roles: uniqueRoles,
      tools: tools,
      certifications: data.certificationContainer?.certificates?.map(itm => ({ certificationId: itm.id, expiry: itm.id === 6 ? data.certificationContainer?.bcws?.foodSafe1Expiry : itm.id === 7 ? data.certificationContainer?.bcws?.foodSafe2Expiry : undefined })),
      emergencyContactFirstName: data.emergencyContactFirstName,
      emergencyContactLastName: data.emergencyContactLastName,
      emergencyContactPhoneNumber: data.emergencyContactPhoneNumber?.replace(/[(]|-|[)]|\s/gi, ''),
      emergencyContactRelationship: data.emergencyContactRelationship,
    };
    return bcwsData
  }
}
