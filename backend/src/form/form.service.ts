import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { FormSubmissionEventPayload, IntakeFormData } from './interface';
import { Form } from '../database/entities/form.entity';
import { AppLogger } from '../logger/logger.service';
import { PersonnelService } from '../personnel/personnel.service';
import { CreatePersonnelDTO } from '../personnel/dto/create-personnel.dto';
import { RegionsAndLocationsService } from '../region-location/region-location.service';
import { Experience, Ministry, UnionMembership } from '../common/enums';
import { CreateFormDTO } from './form.dto';
import { format } from 'date-fns';
import { FunctionService } from '../function/function.service';
import { PersonnelExperienceDTO } from '../personnel/dto/personnel-experiences.dto';
import { PersonnelEntity } from 'src/database/entities/personnel.entity';
// WIP
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

  //TODO unique constraint on email
  async processFormData(submission: CreateFormDTO) {
    const form = await this.saveForm(submission);
    await this.createPersonnel(submission.data, form);
  }

  async saveForm(data: CreateFormDTO): Promise<Form> {
    try {
      this.logger.log(`Form data saved successfully`);
      return await this.formRepo.save(this.formRepo.create(data));
    } catch (e) {
      this.logger.error(`Error saving form data: ${e}`);
    }
  }
  async createPersonnel(data: IntakeFormData, form: Form): Promise<PersonnelEntity[]> {
    
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

    const functionsArray: PersonnelExperienceDTO[] = functions
      .filter((func) => interestedIn.includes(func.abbreviation))
      .map((func) => ({
        functionId: func.id,
        experienceType: Experience.INTERESTED,
      }));

    console.log(functionsArray, 'FUNCS');
    const createPersonnelDTO: CreatePersonnelDTO = {
      firstName: personalDetails.firstName,
      lastName: personalDetails.lastName,
      workLocation: workLocation,
      homeLocation: homeLocation,
      ministry: Object.values(Ministry)[0],
      primaryPhone: personalDetails.primaryPhone.replace(/[(]|-|[)]|\s/gi, ''),
      secondaryPhone:
        personalDetails?.secondaryPhone?.replace(/[(]|-|[)]|\s/gi, '') ?? '',
      workPhone: workDetails.workPhone.replace(/[(]|-|[)]|\s/gi, ''),
      email: workDetails.workEmail,
      supervisorFirstName: supervisorInfo?.supervisorFirstName,
      supervisorLastName: supervisorInfo?.supervisorLastName,
      supervisorEmail: supervisorInfo?.supervisorEmail,
      dateJoined: format(new Date(), 'yyyy-MM-dd'),
      unionMembership: UnionMembership[workDetails.unionMembership],
      remoteOnly: deploymentPreferences.remoteOnly as boolean,
      willingToTravel: deploymentPreferences.remoteOnly as boolean,
      firstNationExperienceLiving:
        experience.firstNations?.living === ''
          ? false
          : (experience.firstNations?.living as boolean),
      firstNationExperienceWorking:
        experience.firstNations?.working === ''
          ? false
          : (experience.firstNations?.working as boolean),
      peccExperience:
        experience.pecc === '' ? false : (experience.pecc as boolean),
      preocExperience:
        experience.preoc === '' ? false : (experience.preoc as boolean),
      emergencyExperience:
        experience.emergency === '' ? false : (experience.emergency as boolean),
      jobTitle: workDetails.jobTitle,
      driverLicense: other.dl.join(';'),
      firstAidLevel: other.firstAid.level,
      firstAidExpiry: other.firstAid.expiryDate,
      psychologicalFirstAid: other.pfa === '' ? false : (other.pfa as boolean),
      intakeForm: form,
      skillsAbilities: '',
      coordinatorNotes: '',
      logisticsNotes: '',
      trainings: [],
      applicationDate: format(new Date(), 'yyyy-MM-dd'),
      experiences: functionsArray,
    };
    try {
      this.logger.log(`Form data saved successfully`);
      return await this.personnelService.createPersonnel([
        createPersonnelDTO,
      ]);
      
      
    } catch (e) {
      this.logger.error(`Error saving form data: ${e}`);
    }
    
  }
}
