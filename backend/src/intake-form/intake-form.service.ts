import { BadRequestException, Inject, Injectable } from '@nestjs/common';
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
import {
  BcwsRoleName,
  ChipsMinistryName,
  Experience,
  ExperienceLevel,
  LanguageLevelType,
  LanguageProficiency,
  Section,
  SectionName,
  Status,
  ToolsProficiency,
  UnionMembership,
} from '../common/enums';
import { RegionsAndLocationsService } from '../region-location/region-location.service';
import { LanguageEntity } from '../database/entities/personnel/personnel-language.entity';
import { PersonnelCertificationEntity } from '../database/entities/personnel/personnel-certification.entity';
import {
  BcwsTravelPreference,
  EmcrTravelPreference,
} from '../common/enums/travel-preference.enum';
import {
  CreatePersonnelEmcrDTO,
  EmcrPersonnelExperienceDTO,
} from '../emcr/dto';
import {
  CreateBcwsPersonnelRolesDTO,
  CreatePersonnelBcwsDTO,
} from '../bcws/dto';
import { LocationEntity } from '../database/entities/location.entity';
import { CreatePersonnelToolsDTO } from '../personnel/dto/skills/create-personnel-tools.dto';

@Injectable()
export class IntakeFormService {
  constructor(
    @InjectRepository(IntakeFormEntity)
    private intakeFormRepository: Repository<IntakeFormEntity>,
    @Inject(PersonnelService)
    private personnelService: PersonnelService,
    @Inject(RegionsAndLocationsService)
    private locationService: RegionsAndLocationsService,
    
  ) {}
  /**
   * Creates new Personnel, EMCR Personnel, BCWS Personnel from Intake Form data
   * @param createIntakeFormDto
   * @param req
   * @param id
   * @returns
   */
  async submitIntakeForm(
    createIntakeFormDto: IntakeFormDTO,
    req: RequestWithRoles,
  ): Promise<IntakeFormRO> {
   
      const email = req.idir;
      const existingPerson =
        await this.personnelService.findOneWithAllRelationsByEmail(email);
        
      const personnelFromFormData = await this.createPersonnel(
        createIntakeFormDto.personnel,
      );
    
      if (!existingPerson) {
        await this.personnelService.createPerson(personnelFromFormData);
        
        await this.intakeFormRepository.save({
          ...createIntakeFormDto,
          status: FormStatusEnum.SUBMITTED,
        });

        
      } else {
        await this.personnelService.updatePerson({
          ...existingPerson,
          ...personnelFromFormData,
        });

        
      }
      return await this.intakeFormRepository.save({
        ...createIntakeFormDto,
        status: FormStatusEnum.SUBMITTED,
      });
    
    
  }

  /**
   * Creates new personnel entities from the form data
   * @param personnel
   * @returns
   */
  async createPersonnel(
    personnel: IntakeFormPersonnelData,
  ): Promise<CreatePersonnelDTO> {
    const locations = await this.locationService.getAllLocations();
    const personnelDTO = this.mapFormDataToPersonnel(personnel, locations);

    if (personnel.program === Program.ALL) {
      const emcrDTO = this.mapEmcrFormDataToPersonnel(personnel);
      const bcwsDTO = this.mapBcwsFormDataToPersonnel(personnel);

      return { ...personnelDTO, emcr: emcrDTO, bcws: bcwsDTO };
    } else if (personnel.program === Program.BCWS) {
      const bcwsDTO = this.mapBcwsFormDataToPersonnel(personnel);

      return { ...personnelDTO, bcws: bcwsDTO };
    } else if (personnel.program === Program.EMCR) {
      const emcrDTO = this.mapEmcrFormDataToPersonnel(personnel);
      return { ...personnelDTO, emcr: emcrDTO };
    }
  }

  /**
   * Get Saved intake form or create new
   * @param req
   * @returns
   */
  async getSavedIntakeForm(
    req: RequestWithRoles,
  ): Promise<Partial<IntakeFormRO>> {
    const personnel = await this.personnelService.findOneWithAllRelationsByEmail(req.idir);

    const existingform = await this.intakeFormRepository.findOneBy({
      createdByEmail: req.idir,
    });

    if (personnel?.emcr && personnel?.bcws) {
      return { currentProgram: Program.ALL };
    }

    if (
      existingform &&
      existingform.status === FormStatusEnum.DRAFT
      
    ) {
      if(personnel){
        existingform.personnel.disabledProgram = personnel.emcr ? Program.EMCR : Program.BCWS
        return existingform.toResponseObject(
          personnel.emcr ? Program.EMCR : Program.BCWS,
        );
      }

      return existingform.toResponseObject();
    }

    if (
        existingform && existingform.status === FormStatusEnum.SUBMITTED 
    ) {
      if(personnel){
      
        const intakeForm = new IntakeFormEntity();
      intakeForm.createdByEmail = req.idir;
      intakeForm.status = FormStatusEnum.DRAFT;
      intakeForm.program = personnel.emcr ? Program.BCWS : Program.EMCR;
      intakeForm.personnel = this.mapPersonnelToForm(personnel);
      intakeForm.personnel.program = personnel.emcr ? Program.BCWS : Program.EMCR;
      intakeForm.personnel.disabledProgram = personnel.emcr ? Program.EMCR : Program.BCWS
      intakeForm.personnel.step = 0;
      intakeForm.personnel.completedSteps = []
      intakeForm.personnel.errorSteps = []
      const form = await this.intakeFormRepository.save(intakeForm);
      return form.toResponseObject(
        personnel.emcr ? Program.EMCR : Program.BCWS,
      );
    }
  }

    if (!existingform && !personnel) {
      const intakeForm = new IntakeFormEntity();

      intakeForm.createdByEmail = req.idir;
      intakeForm.status = FormStatusEnum.DRAFT;
      

      const chipsData = await this.getChipsForIntake(req);
      if (chipsData) {
        intakeForm.personnel = {
          ...chipsData,
          email: req.idir,
        };
      }
      
      intakeForm.personnel.step = 0;
      intakeForm.personnel.completedSteps = []
      intakeForm.personnel.errorSteps = []

      const form = await this.intakeFormRepository.save(intakeForm);
      return form.toResponseObject();
    }
    return {};
  }
  /***
   * Updates the form progress
   */
  async updateFormProgress(
    id: string,
    form: IntakeFormDTO,
  ): Promise<UpdateResult> {
    delete form.currentProgram;
    return await this.intakeFormRepository.update(id, form);
  }
  /**
   * Map form data to BCWS Personnel DTO
   * @param personnel
   * @returns
   */
  mapBcwsFormDataToPersonnel(
    personnel: IntakeFormPersonnelData,
  ): CreatePersonnelBcwsDTO {
    
    
    
    const bcwsPerson = new CreatePersonnelBcwsDTO();
    const roles = [...personnel.PLANNING, ...personnel.AVIATION, ...personnel.COMMAND, ...personnel.FINANCE_ADMIN, ...personnel.OPERATIONS, ...personnel.LOGISTICS ].map(itm => {
      const entity = new CreateBcwsPersonnelRolesDTO()
      entity.roleId = itm.id
      
        entity.expLevel=ExperienceLevel.INTERESTED
        return entity
      }
    )
    const bcwsData = {
      status: Status.PENDING,
      dateApplied: new Date(),
      travelPreference: personnel.travelPreferenceBcws,
      liaisonFirstName: personnel.liaisonFirstName ?? undefined,
      liaisonLastName: personnel.liaisonLastName ?? undefined,
      liaisonPhoneNumber: personnel.liaisonPhoneNumber?? undefined,
      liaisonEmail: personnel.liaisonEmail ?? undefined,
      purchaseCardHolder: personnel.purchaseCardHolder ?? undefined,
      firstChoiceSection: Section[personnel.firstChoiceSection.id] ?? undefined,
      secondChoiceSection: Section[personnel.secondChoiceSection?.id] ?? undefined,
      thirdChoiceSection: Section[personnel.thirdChoiceSection?.id] ?? undefined,
      roles
      
    };
    return Object.assign(bcwsData, bcwsPerson);
  }
  /**
   * Map form data to EMCR Personnel DTO
   * @param personnel
   * @returns
   */
  mapEmcrFormDataToPersonnel(
    personnel: IntakeFormPersonnelData,
  ): CreatePersonnelEmcrDTO {
    const emcrPerson = new CreatePersonnelEmcrDTO();
    const emcrData = {
      trainings: [],
      travelPreference: personnel.travelPreferenceEmcr,
      dateApplied: new Date(),
      status: Status.PENDING,
      firstChoiceSection: personnel.firstChoiceFunction?.name ?? undefined,
      secondChoiceSection: personnel.secondChoiceFunction?.name ?? undefined,
      thirdChoiceSection: personnel.thirdChoiceFunction?.name
        ?? undefined,
      
      firstNationExperience:
        personnel.firstNationsExperience === 'true' ? true : false,
      peccExperience: personnel.peccExperience === 'true' ? true : false,
      preocExperience: personnel.preocExperience === 'true' ? true : false,
      emergencyExperience:
        personnel.emergencyExperience === 'true' ? true : false,
      experiences: personnel?.functions && Array.from(new Set(personnel.functions))?.filter(itm => !!itm).map((item) => {
        if(item){
        const functionExp = new EmcrPersonnelExperienceDTO();
        functionExp.functionId = item.id;
        functionExp.experienceType = Experience.INTERESTED;
        return functionExp;
        }
      }),
    };

    return Object.assign(emcrPerson, emcrData);
  }
  /**
   * Maps the form data to Personnel DTO
   * @param personnel
   * @param locations
   * @returns
   */
  mapFormDataToPersonnel(
    personnel: IntakeFormPersonnelData,
    locations: LocationEntity[],
  ): CreatePersonnelDTO {
    const person = new CreatePersonnelDTO();
    if(!personnel.tools || personnel.tools.length === 0   || !personnel.tools[0].tool || personnel.tools?.[0].tool === undefined && personnel.tools[0].toolProficiency === undefined){
      delete personnel.tools
    }
    if(!personnel.languages || personnel.languages[0].language === '' && personnel.languages[0].languageProficiency === ''){
      delete personnel.languages
    }
    if(!personnel.certifications || personnel.certifications.length ===  0 || personnel.certifications[0].certification === undefined){
      delete personnel.certifications
    }
    const personData = {
      firstName: personnel.firstName,
      lastName: personnel.lastName,
      employeeId: personnel.employeeId,
      paylistId: personnel.paylistId,
      email: personnel.email,
      primaryPhone: personnel.primaryPhoneNumber,
      secondaryPhone: personnel.secondaryPhoneNumber,
      workPhone: personnel.workPhoneNumber,
      unionMembership: personnel.unionMembership,
      supervisorFirstName: personnel.supervisorFirstName,
      supervisorLastName: personnel.supervisorLastName,
      supervisorEmail: personnel.supervisorEmail,
      supervisorPhone: personnel.supervisorPhoneNumber,
      driverLicense: personnel.driverLicense?.map((itm) => itm),
      homeLocation: locations?.find(
        (itm) => itm.id === personnel.homeLocation.id,
      ),
      ministry:personnel.ministry,
      division: personnel.division,
      tools: personnel.tools && personnel.tools?.map((item) => {
        if(item && item?.tool && item?.tool?.id){
        const tool = new CreatePersonnelToolsDTO();
        tool.toolId = item?.tool?.id
        tool.proficiencyLevel = ToolsProficiency[item.toolProficiency];
        return tool;
        }
      }).filter(itm => itm.toolId !== undefined),
      languages: personnel.languages ? personnel.languages.map((item) => {
        
        const language = new LanguageEntity();
        language.language = item.language;
        language.level = LanguageProficiency[item.languageProficiency];
        language.type = LanguageLevelType.BOTH
        return language;
      }) : [],
      certifications: personnel.certifications ? personnel.certifications?.map((item) => {
        if(item.certification === undefined && item.expiry === undefined){
          return
        }
        const certification = new PersonnelCertificationEntity();
        certification.certificationId = item.certification.id
        if(item.expiry){
          certification.expiry = item.expiry ?? undefined;
        }
        
        return certification;
      }) : [],
      emergencyContactFirstName: personnel.emergencyContactFirstName,
      emergencyContactLastName: personnel.emergencyContactLastName,
      emergencyContactPhoneNumber: personnel.emergencyContactPhoneNumber,
      emergencyContactRelationship: personnel.emergencyContactRelationship,
    };
    return Object.assign(personData, person);
  }
  /**
   * Prefill form data with existing data from personnel
   * @param personnel
   * @returns
   */
  mapPersonnelToForm(personnel: PersonnelEntity): IntakeFormPersonnelData {
    const functions = personnel?.emcr?.experiences?.map(itm => ({name: itm?.function?.name, id: itm?.functionId}))
    return {
      firstName: personnel.firstName,
      jobTitle: personnel.jobTitle,
      
      program:
        personnel.bcws && personnel.emcr
          ? Program.ALL
          : personnel.bcws
          ? Program.BCWS
          : Program.EMCR,
      lastName: personnel.lastName,
      employeeId: personnel?.employeeId,
      paylistId: personnel?.paylistId,
      email: personnel.email,
      primaryPhoneNumber: personnel.primaryPhone,
      secondaryPhoneNumber: personnel.secondaryPhone,
      workPhoneNumber: personnel.workPhone,
      unionMembership: personnel.unionMembership,
      supervisorFirstName: personnel.supervisorFirstName,
      supervisorLastName: personnel.supervisorLastName,
      supervisorEmail: personnel?.supervisorEmail,
      supervisorPhoneNumber: personnel?.supervisorPhone,
      driverLicense: personnel.driverLicense?.map((itm) => itm),
      homeLocation: {...personnel.homeLocation, id: personnel.homeLocation.id, name: personnel.homeLocation.locationName},
      ministry: personnel.ministry,
      division: personnel.division,
      tools: !personnel.tools || personnel.tools?.length === 0 ? [{
        tool: undefined,
        toolProficiency:'',
      }]: personnel.tools?.map((item) => ({
        tool: {
          id: item.tool?.id, 
        name: item.tool?.name
      },
        toolProficiency: item.proficiencyLevel
      })),
      languages: !personnel.languages || personnel.languages?.length === 0 ? [{language: '', languageProficiency: ''}]: personnel.languages?.map((item) => ({
        language: item.language,
        languageProficiency: item.level
      })),
      certifications: !personnel.certifications || personnel.certifications?.length === 0 ? [{
        certification: undefined,
        expiry: undefined,
        
      }]: personnel.certifications?.map((item) => ({
        certification: {
          id: item.certification.id, 
        name: item.certification.name},
        expiry: item.expiry ? new Date(item.expiry) : undefined,
      })),
      emergencyContactFirstName: personnel?.emergencyContactFirstName,
      emergencyContactLastName: personnel?.emergencyContactLastName,
      emergencyContactPhoneNumber: personnel?.emergencyContactPhoneNumber,
      emergencyContactRelationship: personnel?.emergencyContactRelationship,
      firstChoiceFunction: functions?.find(itm => itm?.name === personnel.emcr?.firstChoiceSection),
      secondChoiceFunction: functions?.find(itm => itm?.name ===personnel.emcr?.secondChoiceSection),
      thirdChoiceFunction: functions?.find(itm => itm?.name ===personnel.emcr?.thirdChoiceSection),
      functions: personnel.emcr?.experiences?.map(itm => ({
        id: itm.functionId, 
        name: itm.function?.name
      })),
      travelPreferenceEmcr: EmcrTravelPreference[personnel.emcr?.travelPreference],
      travelPreferenceBcws: BcwsTravelPreference[personnel.bcws?.travelPreference],
      firstNationsExperience: personnel.emcr?.firstNationExperience
        ? 'true'
        
        : 'false',
      peccExperience: personnel.emcr?.peccExperience.toString(),
      preocExperience: personnel.emcr?.preocExperience.toString(),
      emergencyExperience: personnel.emcr?.emergencyExperience.toString(),
      purchaseCardHolder: personnel.bcws?.purchaseCardHolder.toString(),
      liaisonFirstName: personnel.bcws?.liaisonFirstName,
      liaisonLastName: personnel.bcws?.liaisonLastName,
      liaisonPhoneNumber: personnel.bcws?.liaisonPhoneNumber,
      liaisonEmail: personnel.bcws?.liaisonEmail,
      firstChoiceSection: {id: personnel.bcws?.firstChoiceSection, name: SectionName[personnel.bcws?.firstChoiceSection]},
      secondChoiceSection: {id: personnel.bcws?.secondChoiceSection, name: SectionName[personnel.bcws?.secondChoiceSection]},
      thirdChoiceSection: {id: personnel.bcws?.thirdChoiceSection, name: SectionName[personnel.bcws?.thirdChoiceSection]},
      PLANNING: personnel.bcws?.roles?.filter(itm => itm.role.section === Section.PLANNING).map(itm => ({ name: BcwsRoleName[itm.role.name], id: itm.role.id, }) ),
      LOGISTICS: personnel.bcws?.roles?.filter(itm => itm.role.section === Section.LOGISTICS).map(itm => ({ name: BcwsRoleName[itm.role.name], id: itm.role.id, }) ),
      FINANCE_ADMIN: personnel.bcws?.roles?.filter(itm => itm.role.section === Section.FINANCE_ADMIN).map(itm => ({ name: BcwsRoleName[itm.role.name], id: itm.role.id, }) ),
      OPERATIONS: personnel.bcws?.roles?.filter(itm => itm.role.section === Section.OPERATIONS).map(itm => ({ name: BcwsRoleName[itm.role.name], id: itm.role.id, }) ),
      COMMAND: personnel.bcws?.roles?.filter(itm => itm.role.section === Section.COMMAND).map(itm => ({ name: BcwsRoleName[itm.role.name], id: itm.role.id, }) ),
      AVIATION: personnel.bcws?.roles?.filter(itm => itm.role.section === Section.AVIATION).map(itm => ({ name: BcwsRoleName[itm.role.name], id: itm.role.id, }) )
      
    };
  }

  async getChipsForIntake(req: RequestWithRoles): Promise<Partial<IntakeFormPersonnelData> | null> {
    const chipsData = await this.personnelService.getChipsMemberData(req.idir);
    if (chipsData.success) {
      const data = chipsData.data;
      let ministry = '';
      if (ChipsMinistryName[data.organization.trim()]) {
        ministry = ChipsMinistryName[data.organization.trim()];
      }

      const allLocations =
        await this.locationService.getAllLocations();
      
      
      let homeLocation = allLocations.find(
        (l) => l.locationName === data.homeCity?.trim(),
      )

      let unionMembership;
      if (UnionMembership[data.employeeGroup?.toUpperCase()]) {
        unionMembership = UnionMembership[data.employeeGroup?.toUpperCase()];
      } else {
        unionMembership = UnionMembership.EXCLUDED;
      }

      const personnelUpdates: Partial<IntakeFormPersonnelData> = {
        employeeId: data.emplId,
        lastName: data.name.split(',')[0]?.trim() || '',
        firstName: data.name.split(',')[1]?.trim() || '',
        division: data.levelOne,
        jobTitle: data.currentPositionTitle || '',
        unionMembership,
        ministry,
        homeLocation: {id: homeLocation.id, name: homeLocation.locationName},
        paylistId: data.deptId,
        supervisorLastName: data.currentSupervisorName.split(',')[0],
        supervisorFirstName: data.currentSupervisorName.split(',')[1],
        supervisorEmail: data.currentSupervisorEmail,
        chipsLastActionDate: data.actionDate,
      };

      return personnelUpdates;
    } else {
      return null;
    }
  }
}
