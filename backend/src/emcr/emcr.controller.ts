import {
  Request,
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Query,
  Req,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  GetEmcrPersonnelDTO,
  
  UpdateEmcrPersonnelDTO,
} from './dto';
import { EmcrService } from './emcr.service';
import { Program, RequestWithRoles, Role } from '../auth/interface';
import { Programs } from '../auth/program.decorator';
import { AppLogger } from '../logger/logger.service';
import { GetPersonnelRO, PersonnelRO, UpdatePersonnelDTO  } from '../personnel';
import { QueryTransformPipe } from '../query-validation.pipe';
import { EmcrRO } from './ro';
import { PersonnelService } from '../personnel/personnel.service';
import { UpdateEmcrExperiencesDTO } from './dto/update-emcr-experiences.dto';
import { EmcrUpdateAdapter } from './dto/helpers';
import { UpdateSkillsDTO } from '../personnel/dto/skills/update-personnel-skills.dto';
import { Roles } from '../auth/roles.decorator';
import { UpdateResult } from 'typeorm';
import { PersonnelEntity } from '../database/entities/personnel/personnel.entity';

@Controller('emcr')
@ApiTags('EMCR Personnel API')
export class EmcrController {
  constructor(
    @Inject(EmcrService)
    private readonly emcrService: EmcrService,
    @Inject(PersonnelService)
    private readonly personnelService: PersonnelService,
    private readonly logger: AppLogger,
  ) {}

  @ApiOperation({
    summary: 'Coordinator/Logistics Get EMCR Personnel Endpoint',
    description: 'Returns the personnel data to the dashboard view',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetPersonnelRO,
  })
  @Programs(Program.EMCR)
  @Roles(Role.COORDINATOR, Role.LOGISTICS)
  @Get()
  @UsePipes(new QueryTransformPipe())
  async getEmcrPersonnel(
    @Request() req: RequestWithRoles,
    @Query() query?: GetEmcrPersonnelDTO,
  ): Promise<GetPersonnelRO> {
    this.logger.log(`${req.method}: ${req.url} - ${req.username}`);

    const { personnel, count } = await this.emcrService.getEmcrPersonnel(query);

    return {
      personnel: personnel.map((itm) => itm.toResponseObject(req.roles)),
      count,
      rows: query.rows,
      page: query.page,
    };
  }

  @ApiOperation({
    summary: 'Coordinator/Logistics Get EMCR Personnel By ID Endpoint',
    description: 'Returns the personnel data to the profile view',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetPersonnelRO,
  })
  @Programs(Program.EMCR)
  @Get(':id')
  async getPersonnelById(
    @Param('id') id: string,
    @Req() req: RequestWithRoles,
  ): Promise<Record<'Personnel', EmcrRO>> {
    this.logger.log(`${req.method}: ${req.url} - ${req.username}`);

    const personnelRO: Record<'Personnel', EmcrRO> =
      await this.emcrService.getEmcrPersonnelById(req.roles, id);

    return personnelRO;
  }

  @ApiOperation({
    summary: 'Coordinator Update Emcr Personnel Endpoint',
    description: 'Coordinator endpoint to update EMCR personnel data',
  })
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
  })
  @Programs(Program.EMCR)
  @Roles(Role.COORDINATOR, Role.LOGISTICS)
  @Patch(':id')
  async updatePersonnel(
    @Body() personnel: UpdateEmcrPersonnelDTO & UpdatePersonnelDTO,
    @Request() req: RequestWithRoles,
    @Param('id') id: string,
  ): Promise<UpdateResult> {
    this.logger.log(`${req.method}: ${req.url} - ${req.username}`);

    const person = new EmcrUpdateAdapter(personnel);
    
    if(personnel.trainings){
      await this.emcrService.updateTraining(personnel.trainings, id);
    }
    
    await this.emcrService.updateEmcrPersonnel(person.emcr, id);

    return await this.personnelService.updatePersonnelDetails(person.details,   id);
  }

  @ApiOperation({
    summary: 'Coordinator/Logistics Update Emcr Personnel Experiences',
    description: 'Coordinator/logistics endpoint to update emcr experiences',
})
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
  })
  @Roles(Role.COORDINATOR, Role.LOGISTICS)  
  @Programs(Program.EMCR)
  @Patch(':id/experiences')
  async updatePersonnelExperiences(
    @Body() experiences: UpdateEmcrExperiencesDTO[],    
    @Request() req: RequestWithRoles,
    @Param('id') id: string,
  ) {
    this.logger.log(`${req.method}: ${req.url} - ${req.username}`);

    return await this.emcrService.updatePersonnelExperiences(
      id,
      experiences,
      
    );
  }

  @ApiOperation({
    summary: 'Coordinator/Logistics Update  Skills',
    description: 'Coordinator/logistics endpoint to update personnel skills',
  })
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
  })
  @Programs(Program.EMCR)
  @Roles(Role.COORDINATOR, Role.LOGISTICS)
  @Patch(':id/skills')
  async updatePersonnelSkills(
    @Body() personnel: UpdateSkillsDTO,
    @Request() req: RequestWithRoles,
    @Param('id') id: string,
  ): Promise<PersonnelEntity>{
    this.logger.log(`${req.method}: ${req.url} - ${req.username}`);

    return await this.personnelService.updatePersonnelSkills(
      personnel,
      id,
      
    );
  }
}
