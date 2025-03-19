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
  DriverLicense,
  Experience,
  ExperienceLevel,
  LanguageProficiency,
  Ministry,
  Section,
  Status,
  ToolsProficiency,
  UnionMembership,
} from '../common/enums';
import { RegionsAndLocationsService } from '../region-location/region-location.service';
import { PersonnelTools } from '../database/entities/personnel/personnel-tools.entity';
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
  CreatePersonnelBcwsDTO,
} from '../bcws/dto';
import { LocationEntity } from '../database/entities/location.entity';

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
    try {
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
    } catch (e) {
      throw new BadRequestException(e.message);
    }
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
    const personnel = await this.personnelService.findOneByEmail(req.idir);

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
        return existingform.toResponseObject(
          personnel.emcr ? Program.EMCR : Program.BCWS,
        );
      }
      return existingform.toResponseObject();
    }

if
      (
        existingform && existingform.status === FormStatusEnum.SUBMITTED 
      
    ) {
      const intakeForm = new IntakeFormEntity();
      intakeForm.createdByEmail = req.idir;
      intakeForm.status = FormStatusEnum.DRAFT;
      intakeForm.program = personnel.emcr ? Program.BCWS : Program.EMCR;
      intakeForm.personnel = this.mapPersonnelToForm(personnel);
      const form = await this.intakeFormRepository.save(intakeForm);
      return form.toResponseObject(
        personnel.emcr ? Program.EMCR : Program.BCWS,
      );
    }

    if (!existingform && !personnel) {
      const intakeForm = new IntakeFormEntity();

      intakeForm.createdByEmail = req.idir;
      intakeForm.status = FormStatusEnum.DRAFT;

      const form = await this.intakeFormRepository.save(intakeForm);
      return form.toResponseObject();
    }
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
    const bcwsData = {
      status: Status.PENDING,
      dateApplied: new Date(),
      travelPreference: BcwsTravelPreference[personnel.travelPreferenceBcws],
      liaisonFirstName: personnel.liaisonFirstName,
      liaisonLastName: personnel.liaisonLastName,
      liaisonPhoneNumber: personnel.liaisonPhoneNumber,
      liaisonEmail: personnel.liaisonEmail,

      firstChoiceSection: Section[personnel.firstChoiceSection],
      secondChoiceSection: personnel.secondChoiceSection
        ? Section[personnel?.secondChoiceSection]
        : undefined,
      thirdChoiceSection: personnel.thirdChoiceSection
        ? Section[personnel?.thirdChoiceSection]
        : undefined,
        // TODO
      // roles: roles.length > 0 ? roles?.map((item) => {
      //   const role = new CreateBcwsPersonnelRolesDTO();
      //   role.roleId = parseInt(item);
      //   role.expLevel = ExperienceLevel.INTERESTED;
      //   return role;
      // }) : [],
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
      travelPreference: EmcrTravelPreference[personnel.travelPreferenceEmcr],
      dateApplied: new Date(),
      status: Status.PENDING,
      firstChoiceSection: parseInt(personnel.firstChoiceFunction),
      secondChoiceSection: personnel.secondChoiceFunction
        ? parseInt(personnel.secondChoiceFunction)
        : undefined,
      thirdChoiceSection: personnel.thirdChoiceFunction
        ? parseInt(personnel.thirdChoiceFunction)
        : undefined,
      firstNationExperienceLiving:
        personnel.firstNationsExperience === 'true' ? true : false,
      peccExperience: personnel.peccExperience === 'true' ? true : false,
      preocExperience: personnel.preocExperience === 'true' ? true : false,
      emergencyExperience:
        personnel.emergencyExperience === 'true' ? true : false,
      experiences: personnel.functions?.map((item) => {
        const functionExp = new EmcrPersonnelExperienceDTO();
        functionExp.functionId = parseInt(item);
        functionExp.experienceType = Experience.INTERESTED;
        return functionExp;
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
    if(personnel.tools[0].toolId === '' && personnel.tools[0].toolProficiency === ''){
      delete personnel.tools
    }
    if(personnel.languages[0].language === '' && personnel.languages[0].languageProficiency === ''){
      delete personnel.languages
    }
    if(personnel.certifications[0].certificationId === ''){
      delete personnel.certifications
    }
    const personData = {
      firstName: personnel.firstName,
      lastName: personnel.lastName,
      employeeId: personnel.employeeId,
      paylistId: personnel.paylistId,
      purchaseCardHolder: personnel.purchaseCardHolder,
      email: personnel.email,
      primaryPhone: personnel.primaryPhone,
      secondaryPhone: personnel.secondaryPhone,
      workPhone: personnel.workPhone,
      unionMembership: UnionMembership[personnel.unionMembership],
      supervisorFirstName: personnel.supervisorFirstName,
      supervisorLastName: personnel.supervisorLastName,
      supervisorEmail: personnel.supervisorEmail,
      supervisorPhone: personnel.supervisorPhone,
      driverLicense: personnel.driverLicense.map((itm) => DriverLicense[itm]),
      homeLocation: locations?.find(
        (itm) => itm.id === parseInt(personnel.homeLocation),
      ),
      ministry: Ministry[personnel.ministry],
      division: personnel.division,
      tools: personnel.tools ? personnel.tools?.map((item) => {
        
        const tool = new PersonnelTools();
        tool.toolId = parseInt(item.toolId);
        tool.proficiencyLevel = ToolsProficiency[item.toolProficiency];
        return tool;
      }) : [],
      languages: personnel.languages ? personnel.languages.map((item) => {
        if(item.language === '' && item.languageProficiency === ''){
          return
        } 
        const language = new LanguageEntity();
        language.language = item.language;
        language.level = LanguageProficiency[item.languageProficiency];
        return language;
      }) : [],
      certifications: personnel.certifications ? personnel.certifications?.map((item) => {
        if(item.certificationId === '' && item.expiry === undefined){
          return
        }
        const certification = new PersonnelCertificationEntity();
        certification.certificationId = parseInt(item.certificationId);
        certification.expiry = item.expiry ?? undefined;
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
    
    return {
      firstName: personnel.firstName,
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
      primaryPhone: personnel.primaryPhone,
      secondaryPhone: personnel.secondaryPhone,
      workPhone: personnel.workPhone,
      unionMembership: personnel?.unionMembership,
      supervisorFirstName: personnel.supervisorFirstName,
      supervisorLastName: personnel.supervisorLastName,
      supervisorEmail: personnel?.supervisorEmail,
      supervisorPhone: personnel?.supervisorPhone,
      driverLicense: personnel.driverLicense?.map((itm) => itm.toString()),
      homeLocation: personnel.homeLocation.id.toString(),
      ministry: personnel.ministry,
      division: personnel.division,
      tools: personnel.tools.length === 0 ? [{
        toolId: '',
        toolProficiency: '',
      }]:personnel.tools?.map((item) => ({
        toolId: item.tool.id.toString(),
        toolProficiency: item.proficiencyLevel,
      })),
      languages: personnel.languages.length === 0 ? [{language: '', languageProficiency: ''}]: personnel.languages?.map((item) => ({
        language: item.language,
        languageProficiency: item.level,
      })),
      certifications: personnel.certifications.length === 0 ? [{
        certificationId: '',
        expiry: undefined,
        
      }]: personnel.certifications?.map((item) => ({
        certificationId: item.certificationId.toString(),
        expiry: item.expiry ? new Date(item.expiry) : undefined,
      })),
      emergencyContactFirstName: personnel?.emergencyContactFirstName,
      emergencyContactLastName: personnel?.emergencyContactLastName,
      emergencyContactPhoneNumber: personnel?.emergencyContactPhoneNumber,
      emergencyContactRelationship: personnel?.emergencyContactRelationship,
      firstChoiceFunction: personnel.emcr?.firstChoiceSection,
      secondChoiceFunction: personnel.emcr?.secondChoiceSection,
      thirdChoiceFunction: personnel.emcr?.thirdChoiceSection,
      functions: personnel.emcr?.experiences?.map((item) =>
        item.functionId.toString(),
      ),
      travelPreferenceEmcr: personnel.emcr?.travelPreference,
      travelPreferenceBcws: personnel.bcws?.travelPreference,
      firstNationsExperience: personnel.emcr?.firstNationExperienceLiving
        ? 'true'
        : personnel.emcr?.firstNationExperienceWorking
        ? 'true'
        : 'false',
      peccExperience: personnel.emcr?.peccExperience.toString(),
      preocExperience: personnel.emcr?.preocExperience.toString(),
      emergencyExperience: personnel.emcr?.emergencyExperience.toString(),
      purchaseCardHolder: personnel.bcws?.purchaseCardHolder,
      liaisonFirstName: personnel.bcws?.liaisonFirstName,
      liaisonLastName: personnel.bcws?.liaisonLastName,
      liaisonPhoneNumber: personnel.bcws?.liaisonPhoneNumber,
      liaisonEmail: personnel.bcws?.liaisonEmail,
      firstChoiceSection: personnel.bcws?.firstChoiceSection,
      secondChoiceSection: personnel.bcws?.secondChoiceSection,
      thirdChoiceSection: personnel.bcws?.thirdChoiceSection,
      roles: personnel.bcws?.roles?.map((item) => item.roleId.toString()),
    };
  }
}
