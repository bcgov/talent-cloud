import {
  Body,
  Controller,
  HttpStatus,
  Get,
  ClassSerializerInterceptor,
  UseInterceptors,
  Inject,
  Req,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreatePersonnelDTO } from './dto';
import { PersonnelService } from './personnel.service';
import { PersonnelRO } from './ro';
import { GetPersonnelRO } from './ro/get-personnel.ro';
import { RequestWithRoles, Role } from '../auth/interface';
import { Roles } from '../auth/roles.decorator';
import { AppLogger } from '../logger/logger.service';
import { UpdatePersonnelRecommitmentDTO } from './dto/update-personnel-recommitment.dto';
import { UpdateResult } from 'typeorm';
import { RecommitmentService } from './recommitment.service';

@Controller('supervisor')
@ApiTags('Supervisor API')
@UseInterceptors(ClassSerializerInterceptor)
@Roles(Role.SUPERVISOR)
export class SupervisorController {
  constructor(
    @Inject(PersonnelService)
    private readonly personnelService: PersonnelService,
    @Inject(RecommitmentService)
    private readonly recommitmentService: RecommitmentService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(SupervisorController.name);
  }
  @Get('/personnel')
  @ApiOperation({
    summary: 'Get personnel data for supervisor',
    description: 'Returns the personnel data to the supervisor view',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetPersonnelRO,
  })
  async getSupervisorPersonnel(
    @Req() req: RequestWithRoles,
    @Query() query: {rows: number, page: number},
  ): Promise<{personnel: Record<string, PersonnelRO>[], count: number}> {
    const {personnel, count} = await this.personnelService.getSupervisorPersonnel(req, query.rows, query.page);
    return {personnel: personnel.map(itm => itm.toResponseObject(req.roles)), count};
  }

  @Patch('/personnel/:id')
  @ApiOperation({
    summary: 'Update personnel data',
    description: 'Update personnel data',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetPersonnelRO,
  })
  async updatePersonnel(
    @Param('id') id: string,
    @Req() req: RequestWithRoles,
    @Body() personnel: Partial<UpdatePersonnelRecommitmentDTO>,
  ): Promise<UpdateResult|void> {
    return await this.recommitmentService.updatePersonnelRecommitmentStatus(id, personnel, req);
  }  
}