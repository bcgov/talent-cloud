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
    console.log(id)
    await this.intakeFormRepository.save(
      this.intakeFormRepository.create({
        ...createIntakeFormDto,
        createdByEmail: req.idir,
      }),
    );
    await this.personnelService.findOneByEmail(
      createIntakeFormDto.personnel.email,
    );
    // TODO
    const person = new PersonnelRO();
    return person;
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
      return existingform.toResponseObject(personnel.emcr ? Program.EMCR : Program.BCWS)
    }

    if (existingform && !personnel) {
      return existingform.toResponseObject()
    }

    if (!existingform && personnel) {
      const intakeForm = new IntakeFormEntity({
        createdByEmail: req.idir,
        status: FormStatusEnum.DRAFT,
        program: personnel.emcr ? Program.BCWS : Program.EMCR,
        personnel: {...personnel}
      });
      const form = await this.intakeFormRepository.save(intakeForm);
      return form.toResponseObject(personnel.emcr ? Program.EMCR : Program.BCWS);
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
    return await this.intakeFormRepository.update(id, form);
  }
}
