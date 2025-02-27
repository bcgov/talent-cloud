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
import { PersonnelEntity } from 'src/database/entities/personnel/personnel.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdatePersonnelDTO } from './dto';
import { GetAvailabilityDTO } from './dto/availability/get-availability.dto';
import { UpdateAvailabilityDTO } from './dto/availability/update-availability.dto';
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
import { ConfirmAvailabilityDTO } from './dto/confirm-availability.dto';
import { UpdatePreferencesDTO } from './update-preferences.dto';

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
    summary: 'Member Get Profile Endpoint',
    description: 'Returns the member data specific to the logged in user',
  })
  @Roles(Role.MEMBER)
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetPersonnelRO,
  })
  async getPersonnel(
    @Req() req: RequestWithRoles,
  ): Promise<Record<string, PersonnelRO>> {
    this.logger.log(`${req.method}: ${req.url} - ${req.username}`);
    return await this.personnelService.getPersonnel(req);
  }

  @Patch()
  @ApiOperation({
    summary: 'Member Update Profile Endpoint',
    description: 'Edit the member data specific to the logged in user',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetPersonnelRO,
  })
  @Roles(Role.MEMBER)
  async updatePersonnel(
    @Req() req: RequestWithRoles,
    @Body() personnel: UpdatePersonnelDTO,
  ): Promise<Record<'Member', PersonnelRO>> {
    this.logger.log(`${req.method}: ${req.url} - ${req.username}`);

    const person = await this.personnelService.findOneByEmail(req.idir);
    return await this.personnelService.updatePersonnel(
      personnel,
      req,
      person.id,
    );
  }

  @Patch('/preferences')
  @ApiOperation({
    summary: 'Member Update Preferences Endpoint',
    description:
      'Edit the member roles/functions/preferences specific to the logged in user',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetPersonnelRO,
  })
  @Roles(Role.MEMBER)
  async updatePersonnelPreferences(
    @Req() req: RequestWithRoles,
    @Body() preferences: UpdatePreferencesDTO,
  ): Promise<PersonnelEntity> {
    this.logger.log(`${req.method}: ${req.url} - ${req.username}`);
    return await this.personnelService.updatePersonnelPreferences(
      preferences,
      req,
    );
  }

  @Patch('/skills')
  @ApiOperation({
    summary: 'Member Update Skills Endpoint',
    description: 'Edit the member skills specific to the logged in user',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetPersonnelRO,
  })
  @Roles(Role.MEMBER)
  async updatePersonnelSkills(
    @Req() req: RequestWithRoles,
    @Body() skills: UpdatePersonnelDTO,
  ): Promise<PersonnelEntity> {
    this.logger.log(`${req.method}: ${req.url} - ${req.username}`);
    const person = await this.personnelService.findOneByEmail(req.idir);
    return await this.personnelService.updatePersonnelSkills(
      {
        tools: skills.tools,
        certifications: skills.certifications,
        languages: skills.languages,
      },
      person.id,
    );
  }

  @ApiOperation({
    summary: 'Member/Logistics/Coordinator Update Schedule Endpoint',
    description: 'Edit the member availability',
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
    summary: 'Member Confirmation of Availability',
    description: 'Update availability',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetPersonnelRO,
  })
  @Roles(Role.MEMBER)
  @Patch(':id/availability/confirm')
  async confirmAvailability(
    @Body() confirmAvailability: ConfirmAvailabilityDTO,
    @Param() id: string,
    @Req() req: RequestWithRoles,
  ) {
    this.logger.log(`${req.method}: ${req.url} - ${req.username}`);
    return await this.personnelService.confirmAvailability(
      confirmAvailability.date,
      id,
    );
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
  ): Promise< AvailabilityRO[]> {
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
