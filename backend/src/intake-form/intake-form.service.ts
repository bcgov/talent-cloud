import { Inject, Injectable } from '@nestjs/common';
import { IntakeFormRO } from './ro/intake-form.ro';
import { IntakeFormDTO } from './dto/intake-form.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IntakeFormEntity } from '../database/entities/form/intake-form.entity';
import { Repository, UpdateResult } from 'typeorm';
import { Program, RequestWithRoles } from '../auth/interface';
import { PersonnelService } from '../personnel/personnel.service';
import { CreatePersonnelDTO } from '../personnel';
import { FormStatusEnum } from '../common/enums/form-status.enum';
import { PersonnelEntity } from '../database/entities/personnel/personnel.entity';
import { IntakeFormPersonnelData } from './types';
import { DriverLicense, Experience, ExperienceLevel, LanguageProficiency, Ministry, Section, Status, ToolsProficiency, UnionMembership } from '../common/enums';
import { RegionsAndLocationsService } from '../region-location/region-location.service';
import { PersonnelTools } from '../database/entities/personnel/personnel-tools.entity';
import { LanguageEntity } from '../database/entities/personnel/personnel-language.entity';
import { PersonnelCertificationEntity } from '../database/entities/personnel/personnel-certification.entity';
import { EmcrExperienceEntity, EmcrPersonnelEntity } from '../database/entities/emcr';
import { BcwsPersonnelEntity, BcwsSectionsAndRolesEntity } from '../database/entities/bcws';
import { BcwsTravelPreference, EmcrTravelPreference } from '../common/enums/travel-preference.enum';


@Injectable()
export class IntakeFormService {
  constructor(
    @InjectRepository(IntakeFormEntity)
    private intakeFormRepository: Repository<IntakeFormEntity>,
    @Inject(PersonnelService)
    private personnelService: PersonnelService,
    @Inject(RegionsAndLocationsService)
    private locationService: RegionsAndLocationsService
  ) {}

  async submitIntakeForm(
    createIntakeFormDto: IntakeFormDTO,
    req: RequestWithRoles,
    id: string,
  ): Promise<PersonnelEntity> {
    //TODO
    console.log(id);
    // await this.intakeFormRepository.save({...createIntakeFormDto, 
    //   status: FormStatusEnum.SUBMITTED
    // });
const email = req.idir;
    const person = await this.personnelService.findOne(undefined, 
      email
    );
    
    // TODO
    if(!person){
      const personnel = await this.mapFormToPersonnel(createIntakeFormDto.personnel)
      const personnelEntity = await this.personnelService.createPerson(personnel);
    
      return personnelEntity;
    } else {
      const personnel = await this.mapFormToPersonnel(createIntakeFormDto.personnel)
      const personnelEntity = await this.personnelService.updatePerson({...person, ...personnel});
      console.log(personnelEntity, "personnelentity");
      return personnelEntity;
    }
    
  }

  mapPersonnelToForm(personnel: PersonnelEntity): IntakeFormPersonnelData {
    return{
    firstName: personnel.firstName,
    program: personnel.bcws && personnel.emcr ? 'all' : personnel.bcws ? 'bcws' : 'emcr',
    lastName: personnel.lastName,
    employeeId: personnel?.employeeId,
    paylistId: personnel?.paylistId,
    email: personnel.email,
    primaryPhone: personnel.primaryPhone,
    secondaryPhone: personnel.secondaryPhone,
    workPhone: personnel.workPhone,
    unionMembership: personnel?.unionMembership,
    supervisorFirstName: personnel.supervisorFirstName,
    supervisorLastName: personnel.supervisorLastName,
    supervisorEmail: personnel?.supervisorEmail,
    supervisorPhone: personnel?.supervisorPhone,
    driverLicense: personnel.driverLicense.map(itm => itm.toString()),
    homeLocation: personnel.homeLocation.id,
    ministry: personnel.ministry,
    division: personnel.division,
    tools: personnel.tools?.map(item => ({toolId: item.tool.id.toString(), toolProficiency: item.proficiencyLevel})),
    languages: personnel.languages?.map(item => ({
      language: item.language,
      languageProficiency: item.level,
      })),
    certifications: personnel.certifications?.map(item => ({certificationId: item.certificationId.toString(),  expiry: item.expiry ? new Date(item.expiry) : undefined})),
    emergencyContactFirstName: personnel?.emergencyContactFirstName,
    emergencyContactLastName: personnel?.emergencyContactLastName,
    emergencyContactPhoneNumber: personnel?.emergencyContactPhoneNumber,
    emergencyContactRelationship: personnel?.emergencyContactRelationship,
     firstChoiceFunction:personnel.emcr?.firstChoiceSection,
      secondChoiceFunction:personnel.emcr?.secondChoiceSection,
      thirdChoiceFunction:personnel.emcr?.thirdChoiceSection,
      functions: personnel.emcr?.experiences.map(item => ({id: item.function.id.toString(), name: item.function.name, experience: item.experienceType})),
      travelPreferenceEmcr:personnel.emcr?.travelPreference,
      travelPreferenceBcws:personnel.bcws?.travelPreference,
      firstNationExperience:personnel.emcr?.firstNationExperienceLiving ?? personnel.emcr?.firstNationExperienceWorking,
      peccExperience:personnel.emcr?.peccExperience,
      preocExperience:personnel.emcr?.preocExperience,
      emergencyExperience:personnel.emcr?.emergencyExperience,
    
      purchaseCardHolder: personnel.bcws?.purchaseCardHolder,
      liaisonFirstName: personnel.bcws?.liaisonFirstName,
      liaisonLastName: personnel.bcws?.liaisonLastName,
      liaisonPhoneNumber: personnel.bcws?.liaisonPhoneNumber,
      liaisonEmail: personnel.bcws?.liaisonEmail,
      firstChoiceSection: personnel.bcws?.firstChoiceSection,
      secondChoiceSection: personnel.bcws?.secondChoiceSection,
      thirdChoiceSection: personnel.bcws?.thirdChoiceSection,
      roles: personnel.bcws?.roles?.map(item => ({id: item.roleId.toString()})),
    
  }
  }

  async mapFormToPersonnel(personnel: IntakeFormPersonnelData): Promise<CreatePersonnelDTO> {
    const locations = await this.locationService.getAllLocations();
    

    return new CreatePersonnelDTO({
    firstName: personnel.firstName,
    lastName: personnel.lastName,
    employeeId: personnel.employeeId,
    paylistId: personnel.paylistId,
    email: personnel.email,
    primaryPhone: personnel.primaryPhone,
    secondaryPhone: personnel.secondaryPhone,
    workPhone: personnel.workPhone,
    unionMembership: UnionMembership[personnel.unionMembership],
    supervisorFirstName: personnel.supervisorFirstName,
    supervisorLastName: personnel.supervisorLastName,
    supervisorEmail: personnel.supervisorEmail,
    supervisorPhone: personnel.supervisorPhone,
    driverLicense: personnel.driverLicense.map(itm => DriverLicense[itm]),
    homeLocation: locations?.find(itm => itm.id === personnel.homeLocation),
    ministry: Ministry[personnel.ministry],
    division: personnel.division,
    tools: personnel.tools?.map(item => {
      const tool = new PersonnelTools()
      tool.toolId = parseInt(item.toolId)
      tool.proficiencyLevel = ToolsProficiency[item.toolProficiency]
      return tool
    }
    ),
    languages: personnel.languages.map(item => {
      const language = new LanguageEntity()
      language.language= item.language
      language.level= LanguageProficiency[item.languageProficiency]
      return language
    }),
    certifications: personnel.certifications?.map(item => {
      const certification = new PersonnelCertificationEntity()
      certification.certificationId = parseInt(item.certificationId)
      certification.expiry = item.expiry ?? undefined
      return certification
      
    }),
    emergencyContactFirstName: personnel.emergencyContactFirstName,
    emergencyContactLastName: personnel.emergencyContactLastName,
    emergencyContactPhoneNumber: personnel.emergencyContactPhoneNumber,
    emergencyContactRelationship: personnel.emergencyContactRelationship,
    emcr: new EmcrPersonnelEntity({
      trainings: [],
      travelPreference: EmcrTravelPreference[personnel.travelPreferenceEmcr], 
      status: Status.PENDING, 
      firstChoiceSection: personnel.firstChoiceFunction,
      secondChoiceSection:personnel.secondChoiceFunction,
      thirdChoiceSection:personnel.thirdChoiceFunction,
      firstNationExperienceLiving: personnel.firstNationExperience,
      peccExperience:personnel.peccExperience,
      preocExperience:personnel.preocExperience,
      emergencyExperience:personnel.emergencyExperience,
      experiences: personnel.functions.map(item => {
        const functionExp = new EmcrExperienceEntity()
        functionExp.functionId = parseInt(item.id) 
        functionExp.experienceType = Experience.INTERESTED
        return functionExp
      }),
    }),
    bcws: new BcwsPersonnelEntity({
      status: Status.PENDING,
      travelPreference: BcwsTravelPreference[personnel.travelPreferenceBcws],
      liaisonFirstName: personnel.liaisonFirstName,
      liaisonLastName: personnel.liaisonLastName,
      liaisonPhoneNumber: personnel.liaisonPhoneNumber,
      liaisonEmail: personnel.liaisonEmail,
      purchaseCardHolder: personnel.purchaseCardHolder,
      firstChoiceSection: Section[personnel.firstChoiceSection],
      secondChoiceSection: personnel.secondChoiceSection ? Section[personnel?.secondChoiceSection] : undefined,
      thirdChoiceSection: personnel.thirdChoiceSection ? Section[personnel?.thirdChoiceSection] : undefined,
      // roles: personnel.roles.length > 0 && personnel.roles?.map(item => {
      //   const role = new BcwsSectionsAndRolesEntity()
      //   role.roleId = parseInt(item.id)
      //   role.expLevel = ExperienceLevel.INTERESTED

      //   return role
      // })
    })
     
  })
      
      
      
    
  
  }

  async getSavedIntakeForm(
    req: RequestWithRoles,
  ): Promise<Partial<IntakeFormRO>> {
    const personnel = await this.personnelService.findOneByEmail(req.idir);

    const existingform = await this.intakeFormRepository.findOneBy({
      createdByEmail: req.idir,
      status: FormStatusEnum.DRAFT,
    });

    if (personnel?.emcr && personnel?.bcws) {
      return { currentProgram: Program.ALL };
    }

    if (existingform && personnel) {
      return existingform.toResponseObject(
        personnel.emcr ? Program.EMCR : Program.BCWS,
      );
    }

    if (existingform && !personnel) {
      return existingform.toResponseObject();
    }

    if (!existingform && personnel) {

      const intakeForm = new IntakeFormEntity()
        intakeForm.createdByEmail= req.idir
        intakeForm.status= FormStatusEnum.DRAFT
        intakeForm.program=personnel.emcr ? Program.BCWS : Program.EMCR
        intakeForm.personnel=this.mapPersonnelToForm(personnel)
      const form = await this.intakeFormRepository.save(intakeForm);
      return form.toResponseObject(
        personnel.emcr ? Program.EMCR : Program.BCWS,
      );
    }

    if (!existingform && !personnel) {
      const intakeForm = new IntakeFormEntity()
      
      intakeForm.createdByEmail= req.idir
      intakeForm.status= FormStatusEnum.DRAFT
      
      const form = await this.intakeFormRepository.save(intakeForm);
      return form.toResponseObject();

    }
  }

  async updateFormProgress(
    id: string,
    form: IntakeFormDTO,
  ): Promise<UpdateResult> {
    delete form.currentProgram
    return await this.intakeFormRepository.update(id, form);
   
  }
}
