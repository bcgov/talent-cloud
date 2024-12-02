import {
  Body,
  Controller,
  HttpStatus,
  Get,
  Query,
  ClassSerializerInterceptor,
  UseInterceptors,
  Inject,
  Param,
  Req,
  Patch,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';
import { GetAvailabilityDTO } from './dto/get-availability.dto';
import { UpdateAvailabilityDTO } from './dto/update-availability.dto';
import { PersonnelService } from './personnel.service';
import { PersonnelRO } from './ro';
import { AvailabilityRO } from './ro/availability.ro';
import { GetPersonnelRO } from './ro/get-personnel.ro';
import { Program, RequestWithRoles, TokenType } from '../auth/interface';
import { Programs } from '../auth/program.decorator';
import { Token } from '../auth/token.decorator';
import { AvailabilityEntity } from '../database/entities/personnel/availability.entity';
import { AppLogger } from '../logger/logger.service';
import { CreatePersonnelDTO } from './dto';

@Controller('personnel')
@ApiTags('Personnel API')
@UseInterceptors(ClassSerializerInterceptor)
export class PersonnelController {
  constructor(
    @Inject(PersonnelService)
    private readonly personnelService: PersonnelService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(PersonnelController.name);
  }
  @Get()
  @ApiOperation({
    summary: 'Get personnel data',
    description: 'Returns the personnel data to the profile view',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetPersonnelRO,
  })
  async getPersonnel(
    @Req() req: RequestWithRoles,
  ): Promise<Record<string, PersonnelRO>> {
    return await this.personnelService.getPersonnel(req);
  }

  @Patch()
  @ApiOperation({
    summary: 'Update personnel data',
    description: 'Update personnel data',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetPersonnelRO,
  })
  async updatePersonnel(@Req() req: RequestWithRoles, @Body() personnel: Partial<CreatePersonnelDTO>): Promise<Record<string, PersonnelRO>> {
    return await this.personnelService.updatePersonnel(personnel, req);
  } 

  @ApiOperation({
    summary: 'Update personnel availability',
    description: 'Update availability',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetPersonnelRO,
  })
  @Programs([Program.EMCR, Program.BCWS])
  @Patch(':id/availability')
  async updatePersonnelAvailability(
    @Param('id') id: string,
    @Body() availability: UpdateAvailabilityDTO,
    @Req() req: RequestWithRoles,
  ): Promise<{
    updates: (UpdateResult | AvailabilityEntity)[];
    deleted?: DeleteResult;
  }> {
    this.logger.log(`${req.method}: ${req.url} - ${req.username}`);

    return await this.personnelService.updateAvailability(id, availability);
  }

  @ApiOperation({
    summary: 'Get personnel availability for specific dates',
    description: 'Returns the personnel data to the profile view',
  })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @Get(':id/availability')
  @Programs([Program.EMCR, Program.BCWS])
  async getPersonnelAvailability(
    @Param('id') id: string,
    @Req() req: RequestWithRoles,
    @Query() query: GetAvailabilityDTO,
  ): Promise<AvailabilityRO[]> {
    this.logger.log(`${req.method}: ${req.url} - ${req.username}`);
    return await this.personnelService.getAvailability(id, query);
  }

  @Get('/bcws/approved')
  @Token([TokenType.BCWS])
  async getApprovedApplicants(): Promise<
    { employeeId: string; firstName: string; lastName: string }[]
  > {
    return this.personnelService.getApprovedBCWSMembers();
  }
}
