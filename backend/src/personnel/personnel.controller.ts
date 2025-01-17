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
  ForbiddenException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreatePersonnelDTO } from './dto';
import { GetAvailabilityDTO } from './dto/get-availability.dto';
import { UpdateAvailabilityDTO } from './dto/update-availability.dto';
import { PersonnelService } from './personnel.service';
import { PersonnelRO } from './ro';
import { AvailabilityRO } from './ro/availability.ro';
import { GetPersonnelRO } from './ro/get-personnel.ro';
import { AuditService } from '../audit/audit.service';
import { RequestWithRoles, Role, TokenType } from '../auth/interface';
import { Roles } from '../auth/roles.decorator';
import { Token } from '../auth/token.decorator';
import { AvailabilityEntity } from '../database/entities/personnel/availability.entity';
import { AppLogger } from '../logger/logger.service';

@Controller('personnel')
@ApiTags('Personnel API')
@UseInterceptors(ClassSerializerInterceptor)
export class PersonnelController {
  constructor(
    @Inject(PersonnelService)
    private readonly personnelService: PersonnelService,
    private readonly logger: AppLogger,
    @Inject(AuditService)
    private readonly auditService: AuditService,
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
  async updatePersonnel(
    @Req() req: RequestWithRoles,
    @Body() personnel: Partial<CreatePersonnelDTO>,
  ): Promise<Record<string, PersonnelRO>> {
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
  @Roles(Role.LOGISTICS, Role.COORDINATOR, Role.MEMBER)
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
    if (req.roles.length === 1 && req.roles.includes(Role.MEMBER) && req.idir) {
      const personnel = await this.personnelService.findOneByEmail(req.idir);
      if (personnel.id !== id) {
        this.logger.error('Member updating availability for wrong member id');
        throw new ForbiddenException('Members can only edit own availability');
      }
    }

    const availabilityUpdate = await this.personnelService.updateAvailability(
      id,
      availability,
    );
    this.auditService.logAudit(
      'NULL',
      `availability type ${availability.type} from ${availability.from} to ${
        availability.to
      } with removals from ${availability.removeFrom || 'NULL'} to ${
        availability.removeTo || 'NULL'
      } updated`,
      'AvailabilityEntity',
      id,
    );
    return availabilityUpdate;
  }

  @ApiOperation({
    summary: 'Get personnel availability for specific dates',
    description: 'Returns the personnel data to the profile view',
  })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @Get(':id/availability')
  @Roles(Role.LOGISTICS, Role.COORDINATOR, Role.MEMBER)
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
