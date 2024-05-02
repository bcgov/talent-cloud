import { Injectable } from '@nestjs/common';

@Injectable()
export class FormService {
  constructor() { // private readonly logger: AppLogger, // @Inject(EmcrService) private emcrService: EmcrService, // @Inject(PersonnelService) private personnelService: PersonnelService, // @InjectRepository(Form) private formRepo: Repository<Form>,
    // this.logger.setContext(FormService.name);
  }

  // /**
  //  * process form submission event payload
  //  * @param eventPayload
  //  */
  // public async processEventPayload(eventPayload: FormSubmissionEventPayload) {
  //   this.logger.log(
  //     `${this.processEventPayload.name}, Submission ID: ${eventPayload.submissionId}, form ID: ${eventPayload.formId}`,
  //   );
  //   const { submissionId, formId } = eventPayload;

  //   const requestFormData = await axios.get(
  //     `${process.env.CHEFS_API}/app/api/v1/submissions/${submissionId}`,
  //     {
  //       auth: {
  //         username: `${formId}`,
  //         password: `${process.env.CHEFS_API_KEY}`,
  //       },
  //     },
  //   );
  //   this.logger.log(`Received form data from submission event`);

  //   requestFormData &&
  //     this.processFormData({
  //       submissionId,
  //       formId,
  //       data: requestFormData.data.submission.submission.data,
  //     });
  // }
  // //TODO PROD: unique constraint on email address
  // /**
  //  * Create a new form entity, and passes the form id and submission id to createPersonnel function
  //  * @param submission
  //  */
  // async processFormData(submission: CreateFormDTO): Promise<void> {
  //   const form = await this.saveForm(submission);
  //   // return await this.createPersonnel(submission.data, form);
  // }
  // /**
  //  * Saves the form id and submission id
  //  * @param data
  //  * @returns
  //  */
  // async saveForm(data: CreateFormDTO): Promise<Form> {
  //   try {
  //     this.logger.log(`Form data saved successfully`);
  //     return await this.formRepo.save(this.formRepo.create(data));
  //   } catch (e) {
  //     this.logger.error(`Error saving form data: ${e}`);
  //   }
  // }
  // /**
  //  * Creates a new personnel entity from the form
  //  * @param data
  //  * @param form
  //  * @returns
  //  */
  // async createPersonnel(
  //   data: IntakeFormData,
  //   form: Form,
  // ): Promise<void> {
  //   const {
  //     personalDetails,
  //     roles,
  //     workDetails,
  //     supervisorInfo,
  //     experience,
  //     deploymentPreferences,
  //     other,
  //   } = data;

  //   const workLocation = await this.emcrService.getLocationByName(
  //     workDetails.workLocation,
  //   );

  //   const homeLocation = await this.emcrService.getLocationByName(
  //     personalDetails.homeLocation,
  //   );

  //   const functions = await this.emcrService.getFunctions();

  //   const interestedIn = Object.keys(roles).filter(
  //     (role) => roles[role] === true,
  //   );

  //   const functionsArray: EmcrPersonnelExperienceDTO[] = functions
  //     .filter((func) => interestedIn.includes(func.abbreviation))
  //     .map((func) => ({
  //       functionId: func.id,
  //       experienceType: Experience.INTERESTED,
  //     }));

  //   const createEMCRPersonnelDTO: CreatePersonnelEmcrDTO = {
  //     workLocation: workLocation,
  //     homeLocation: homeLocation,
  //     dateJoined: undefined,
  //     firstNationExperienceLiving:
  //       experience.firstNations?.living === ''
  //         ? false
  //         : (experience.firstNations?.living as boolean),
  //     firstNationExperienceWorking:
  //       experience.firstNations?.working === ''
  //         ? false
  //         : (experience.firstNations?.working as boolean),
  //     peccExperience:
  //       experience.pecc === '' ? false : (experience.pecc as boolean),
  //     preocExperience:
  //       experience.preoc === '' ? false : (experience.preoc as boolean),
  //     emergencyExperience:
  //       experience.emergency === '' ? false : (experience.emergency as boolean),
  //     coordinatorNotes: '',
  //     logisticsNotes: '',
  //     trainings: [],
  //     applicationDate: new Date(),
  //     experiences: functionsArray,
  //   };
  //   const createPersonnelDTO: CreatePersonnelDTO = {
  //     firstName: personalDetails.firstName,
  //     lastName: personalDetails.lastName,

  //     ministry: Object.values(Ministry)[0],
  //     primaryPhone: personalDetails.primaryPhone.replace(/[(]|-|[)]|\s/gi, ''),
  //     secondaryPhone:
  //       personalDetails?.secondaryPhone?.replace(/[(]|-|[)]|\s/gi, '') ?? '',
  //     workPhone: workDetails.workPhone.replace(/[(]|-|[)]|\s/gi, ''),
  //     email: workDetails.workEmail,
  //     supervisorFirstName: supervisorInfo?.supervisorFirstName,
  //     supervisorLastName: supervisorInfo?.supervisorLastName,
  //     supervisorEmail: supervisorInfo?.supervisorEmail,

  //     unionMembership: UnionMembership[workDetails.unionMembership],
  //     remoteOnly: deploymentPreferences.remoteOnly,
  //     willingToTravel: deploymentPreferences.willingToTravel,

  //     jobTitle: workDetails.jobTitle,
  //     driverLicense: other.dl.join(';'),
  //     // firstAidLevel: other.firstAid.level,
  //     // firstAidExpiry: other.firstAid.expiryDate,
  //     // psychologicalFirstAid: other.pfa === '' ? false : (other.pfa as boolean),
  //     intakeForm: form,
  //     // emcr: createEMCRPersonnelDTO,
  //   };

  //   try {
  //     this.logger.log(`Form data saved successfully`);
  //     // return await this.personnelService.createPersonnel([createPersonnelDTO]);
  //   } catch (e) {
  //     this.logger.error(`Error saving form data: ${e}`);
  //   }
  // }
}
