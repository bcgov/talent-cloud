import { Inject, Injectable } from '@nestjs/common';
import { IntakeFormRO } from './ro/intake-form.ro';
import { IntakeFormDTO } from './dto/intake-form.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { IntakeFormEntity } from '../database/entities/form/intake-form.entity';
import {
  Repository,
  UpdateResult,
} from 'typeorm';
import { Program, RequestWithRoles, Role } from '../auth/interface';
import { PersonnelService } from '../personnel/personnel.service';
import { PersonnelRO } from '../personnel';
import { FormStatusEnum } from '../common/enums/form-status.enum';
import { PersonnelEntity } from '../database/entities/personnel/personnel.entity';



@Injectable()
export class IntakeFormService {
  constructor(
    @InjectRepository(IntakeFormEntity)
    private intakeFormRepository: Repository<IntakeFormEntity>,
    @Inject(PersonnelService)
    private personnelService: PersonnelService
  ) {}
  
  async submitIntakeForm(createIntakeFormDto: IntakeFormDTO, req: RequestWithRoles, id:string): Promise<PersonnelRO> { 
    await this.intakeFormRepository.save(this.intakeFormRepository.create({...createIntakeFormDto, createdByEmail: req.idir}))
    await this.personnelService.findOneByEmail(createIntakeFormDto.personnel.email)
    // TODO
      const person = new PersonnelRO()    
    return  person
    
  }

  async checkProgramEnrollment(req: RequestWithRoles): Promise<PersonnelEntity | {error: string}> {
    const personnel = await this.personnelService.findOneByEmail(req.idir)
    return personnel
  }

  async getSavedIntakeForm(req: RequestWithRoles): Promise<IntakeFormRO|{error: string}> { 

    const personnel = await this.personnelService.findOneByEmail(req.idir)

    const existingform = await this.intakeFormRepository.findOneBy({createdByEmail: req.idir, status: FormStatusEnum.DRAFT})


    if(personnel?.emcr && personnel?.bcws) {
      return {error: 'User is enrolled in both programs'}
    }

    if(existingform) {
      return existingform.toResponseObject()
    }
    
    if(!existingform) {
      return personnel.emcr ? await this.createForm(req,  Program.BCWS) : personnel.bcws ? await this.createForm(req, Program.EMCR) : await this.createForm(req, Program.ALL)
    }

    
    
    
  }

  async createForm(req: RequestWithRoles,  program?: Program): Promise<IntakeFormRO> {
    const intakeForm = new IntakeFormEntity({createdByEmail: req.idir,  status: FormStatusEnum.DRAFT, program: program})  
    const form = await this.intakeFormRepository.save(intakeForm)
    return  form.toResponseObject()
  }

  async updateFormProgress(id: string, form: Partial<IntakeFormDTO>): Promise<UpdateResult> { 
    return  await this.intakeFormRepository.update(id, form)  
    
  }
}
