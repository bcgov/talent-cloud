import { Body, Controller, Inject, Get, Post, Req, Patch, Param, HttpStatus } from '@nestjs/common';
import { IntakeFormService } from './intake-form.service';
import { PersonnelRO } from '../personnel';
import { IntakeFormDTO } from './dto/intake-form.dto';
import { IntakeFormRO } from './ro/intake-form.ro';
import { RequestWithRoles } from '../auth/interface';
import { UpdateResult } from 'typeorm';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('Intake Form API')
@Controller('intake-form')
export class IntakeFormController {
  constructor(
    @Inject(IntakeFormService)
    private readonly intakeFormService: IntakeFormService,
  ) {}  
  
  @ApiOperation({
    summary: 'Get intake form data',
    description: 'Returns the partially completed intake form data',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IntakeFormRO,
  })
  @Get()
  async getIntakeForm(@Req() req: RequestWithRoles): Promise<
IntakeFormRO|{error:string}> {
    return await this.intakeFormService.getSavedIntakeForm(req);
  }

  @ApiOperation({
    summary: 'Post request to create and save intake form id for the logged in user',
    description: 'Returns the form id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IntakeFormRO,
  })
  @Post()
  async createIntakeForm(@Req() req: RequestWithRoles): Promise<IntakeFormRO>  {
    
    return await this.intakeFormService.createForm(req);
  }

  @ApiOperation({
    summary: 'Intake form update endpoint',
    description: 'Returns the update result',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IntakeFormRO,
  })
  @Patch(':id')
  async updateIntakeForm(@Req() req: RequestWithRoles, @Param() id: string,  @Body() intakeFormDto: IntakeFormDTO): Promise<UpdateResult> {
    return await this.intakeFormService.updateFormProgress(id,  intakeFormDto);
  }

  @ApiOperation({
    summary: 'Post request to save final  form copy for the logged in user',  
    description: 'Returns the created personnel object',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IntakeFormRO,
  })
  @Post(':id')
  async submitIntakeForm(
    @Body() createIntakeFormDto: IntakeFormDTO,
    @Req() req: RequestWithRoles,
    @Param() id: string
  ): Promise<PersonnelRO> {
    return await this.intakeFormService.submitIntakeForm(createIntakeFormDto, req, id);
  }
}
