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
import { BcwsService } from './bcws.service';
import { GetBcwsPersonnelDTO } from './dto/get-bcws-personnel.dto';
import {  UpdateBcwsPersonnelDTO } from './dto/update-bcws-personnel.dto';
import { Program, RequestWithRoles, Role } from '../auth/interface';
import { Programs } from '../auth/program.decorator';
import { AppLogger } from '../logger/logger.service';
import { UpdatePersonnelDTO, GetPersonnelRO, PersonnelRO,  } from '../personnel';
import { QueryTransformPipe } from '../query-validation.pipe';
import { BcwsRO } from './ro';
import { PersonnelService } from '../personnel/personnel.service';
import { UpdateBcwsRolesAndPreferencesDTO, UpdateBcwsRolesDTO } from './dto/update-bcws-personnel-roles.dto';
import { BcwsUpdateAdapter } from './dto/helpers';
import { UpdateSkillsDTO } from '../personnel/dto/skills/update-personnel-skills.dto';
import { UpdateResult } from 'typeorm';
import { Roles } from '../auth/roles.decorator';

@Controller('bcws')
@ApiTags('BCWS Personnel API')
export class BcwsController {
  constructor(
    @Inject(BcwsService)
    private readonly bcwsService: BcwsService,
    @Inject(PersonnelService )
    private readonly personnelService: PersonnelService,
    private readonly logger: AppLogger,
  ) {}

  @ApiOperation({
    summary: 'BCWS Coordinator Update Personnel Endpoint',
    description: 'Update existing bcws/personnel data',
  })
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
  })
  @Programs(Program.BCWS)
  @Roles(Role.COORDINATOR)
  @Patch('/:id')
  async updateBcwsPersonnel(
    @Body() personnel: UpdateBcwsPersonnelDTO & UpdatePersonnelDTO,
    @Request() req: RequestWithRoles,
    @Param('id') id: string,
  ): Promise<UpdateResult> {
    this.logger.log(`${req.method}: ${req.url} - ${req.username}`);
    
    const person = new BcwsUpdateAdapter(personnel)
    
    await this.bcwsService.updateBcwsPersonnel(person.bcws, id);

    return await this.personnelService.updatePersonnelDetails(person.details,   id);
   
  }

  @ApiOperation({
    summary: 'BCWS Coordinator Update Roles Endpoint',
    description: 'Update existing personnel roles',
  })
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
  })
  @Roles(Role.COORDINATOR, Role.LOGISTICS)
  @Programs(Program.BCWS)
  @Patch('/:id/roles')
  async updateBcwsPersonnelRoles(
    @Body() preferences: UpdateBcwsRolesAndPreferencesDTO,  
    @Request() req: RequestWithRoles,
    @Param('id') id: string,
  ): Promise<UpdateBcwsRolesDTO[]> {

    this.logger.log(`${req.method}: ${req.url} - ${req.username}`);

    return await this.bcwsService.updateRoles(id, preferences);

    
  }

  @ApiOperation({
    summary: 'BCWS Coordinator Update Skills Endpoint',
    description: 'Coordinator endpoint to update personnel skills',
  })
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
  })
  @Programs(Program.BCWS)
  @Roles(Role.COORDINATOR, Role.LOGISTICS)
  @Patch(':id/skills')
  async updatePersonnelSkills(
    @Body() skills: UpdateSkillsDTO,
    @Request() req: RequestWithRoles,
    @Param('id') id: string,
  ): Promise<Record<string, PersonnelRO>> {
    this.logger.log(`${req.method}: ${req.url} - ${req.username}`);

    return await this.personnelService.updatePersonnelSkills(
      skills,
      id,
      req,
    );
  }

  @ApiOperation({
    summary: 'BCWS Coordinator/Logistics Get Personnel Endpoint',
    description: 'Returns the personnel data to the dashboard view',
  })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @Programs(Program.BCWS)
  @Roles(Role.COORDINATOR, Role.LOGISTICS)
  @Get()
  @UsePipes(new QueryTransformPipe())
  async getBcwsPersonnel(
    @Request() req: RequestWithRoles,
    @Query() query?: GetBcwsPersonnelDTO,
  ): Promise<GetPersonnelRO> {
    this.logger.log(`${req.method}: ${req.url} - ${req.username}`);

    const { personnel, count } = await this.bcwsService.getBcwsPersonnel(query);

    return {
      personnel: personnel.map((itm) => itm.toResponseObject(req.roles)),
      count,
      rows: query.rows,
      page: query.page,
    };
  }

  @ApiOperation({
    summary: 'BCWS Coordinator/Logistics Get Personnel  By ID Endpoint',
    description: 'Returns the personnel data to the profile view',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetPersonnelRO,
  })
  @Programs(Program.BCWS)
  @Roles(Role.COORDINATOR, Role.LOGISTICS)
  @Get('/:id')
  async getBcwsPersonnelById(
    @Param('id') id: string,
    @Req() req: RequestWithRoles,
  ): Promise<Record<'Personnel', BcwsRO>> {
    this.logger.log(`${req.method}: ${req.url} - ${req.username}`);

    return await this.bcwsService.getBcwsPersonnelById(req.roles, id);
  }
}
