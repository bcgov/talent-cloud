import { Inject, Injectable } from '@nestjs/common';
import { IntakeFormRO } from './ro/intake-form.ro';
import { IntakeFormDTO } from './dto/intake-form.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IntakeFormEntity } from '../database/entities/form/intake-form.entity';
import { Repository, UpdateResult } from 'typeorm';
import { Program, RequestWithRoles } from '../auth/interface';
import { PersonnelService } from '../personnel/personnel.service';
import { PersonnelRO } from '../personnel';
import { FormStatusEnum } from '../common/enums/form-status.enum';
import { IntakeFormPersonnelData } from './types';
import { PersonnelEntity } from '../database/entities/personnel/personnel.entity';

@Injectable()
export class IntakeFormService {
  constructor(
    @InjectRepository(IntakeFormEntity)
    private intakeFormRepository: Repository<IntakeFormEntity>,
    @Inject(PersonnelService)
    private personnelService: PersonnelService,
  ) {}

  async submitIntakeForm(
    createIntakeFormDto: IntakeFormDTO,
    req: RequestWithRoles,
    id: string,
  ): Promise<PersonnelRO> {
    //TODO
    console.log(id);
    // await this.intakeFormRepository.update(createIntakeFormDto.id, {
    //   ...createIntakeFormDto,
    //   status: FormStatusEnum.SUBMITTED,
    // });
    await this.personnelService.findOneByEmail(
      req.idir,
    );
    // TODO
    const person = new PersonnelRO();
    return person;
  }

  mapPersonnelToForm(personnel: PersonnelEntity): IntakeFormPersonnelData {
    return{
    firstName: personnel.firstName,
    lastName: personnel.lastName,
    employeeId: personnel.employeeId,
    paylistId: personnel.paylistId,
    email: personnel.email,
    primaryPhone: personnel.primaryPhone,
    secondaryPhone: personnel.secondaryPhone,
    workPhone: personnel.workPhone,
    unionMembership: personnel.unionMembership,
    supervisorFirstName: personnel.supervisorFirstName,
    supervisorLastName: personnel.supervisorLastName,
    supervisorEmail: personnel.supervisorEmail,
    supervisorPhone: personnel.supervisorPhone,
    driverLicense: personnel.driverLicense.map(itm => itm.toString()),
    homeLocation: personnel.homeLocation,
    workLocation: personnel.workLocation,
    ministry: personnel.ministry,
    division: personnel.division,
    // tools: personnel.tools.map(item => ({tool: item.tool, proficiencyLevel: item.proficiencyLevel})),
    // languages: personnel.languages.map(item => ({id: item.id,
    //   language: item.language,
    //   level: item.level,
    //   type: item.type})),
    // certifications: personnel.certifications.map(item => ({id: item.id, name: item.name, expiry: item.expiry})),
    emergencyContactFirstName: personnel.emergencyContactFirstName,
    emergencyContactLastName: personnel.emergencyContactLastName,
    emergencyContactPhoneNumber: personnel.emergencyContactPhoneNumber,
    emergencyContactRelationship: personnel.emergencyContactRelationship,
    // firstAidLevel: personnel.firstAidLevel,
    // firstAidExpiry: personnel.firstAidExpiry,
    // psychologicalFirstAid: personnel.psychologicalFirstAid,
    emcr: {
      firstChoiceFunction:personnel.emcr.firstChoiceSection,
      secondChoiceFunction:personnel.emcr.secondChoiceSection,
      thirdChoiceFunction:personnel.emcr.thirdChoiceSection,
      experiences: personnel.emcr.experiences.map(item => ({id: item.function.id, name: item.function.name, experience: item.experienceType})),
      travelPreference:personnel.emcr.travelPreference,
      firstNationExperienceLiving:personnel.emcr.firstNationExperienceLiving,
      firstNationExperienceWorking:personnel.emcr.firstNationExperienceWorking,
      peccExperience:personnel.emcr.peccExperience,
      preocExperience:personnel.emcr.preocExperience,
      emergencyExperience:personnel.emcr.emergencyExperience,
    },
    bcws: {
      purchaseCardHolder: personnel.bcws.purchaseCardHolder,
      liaisonFirstName: personnel.bcws.liaisonFirstName,
      liaisonLastName: personnel.bcws.liaisonLastName,
      liaisonPhoneNumber: personnel.bcws.liaisonPhoneNumber,
      liaisonEmail: personnel.bcws.liaisonEmail,
      firstChoiceSection: personnel.bcws.firstChoiceSection,
      // secondChoiceSection: personnel.bcws.secondChoiceSection,
      thirdChoiceSection: personnel.bcws.thirdChoiceSection,
      // roles: personnel.bcws.roles.map(item => ({id: item.id, name: item.roleName, section: item.section})),
    }
  }
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

      const intakeForm = new IntakeFormEntity({
        createdByEmail: req.idir,
        status: FormStatusEnum.DRAFT,
        program: personnel.emcr ? Program.BCWS : Program.EMCR,
        personnel: {}
      });

      const form = await this.intakeFormRepository.save(intakeForm);
      return form.toResponseObject(
        personnel.emcr ? Program.EMCR : Program.BCWS,
      );
    }

    if (!existingform && !personnel) {
      const intakeForm = new IntakeFormEntity({
        createdByEmail: req.idir,
        status: FormStatusEnum.DRAFT,
      });
      const form = await this.intakeFormRepository.save(intakeForm);
      return form.toResponseObject();
    }
  }

  async updateFormProgress(
    id: string,
    form: Partial<IntakeFormDTO>,
  ): Promise<UpdateResult> {
    // return await this.intakeFormRepository.update(id, form);
    return
  }
}
