import {
  Body,
  Post,
  Controller,
  HttpStatus,
  Get,
  Query,
  UsePipes,
  ClassSerializerInterceptor,
  UseInterceptors,
  Inject,
  Param,
  Req,
  Request,
  Patch,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreatePersonnelDTO } from './dto/create-personnel.dto';
import { GetAvailabilityDTO } from './dto/get-availability.dto';
import { GetPersonnelDTO } from './dto/get-personnel.dto';
import { UpdateAvailabilityDTO } from './dto/update-availability.dto';
import { UpdatePersonnelDTO } from './dto/update-personnel.dto';
import { PersonnelService } from './personnel.service';
import { AvailabilityRO } from './ro/availability.ro';
import { GetPersonnelRO } from './ro/get-personnel.ro';
import { PersonnelRO } from './ro/personnel.ro';
import { RequestWithRoles, Role } from '../auth/interface';
import { Roles } from '../auth/roles.decorator';
import { AvailabilityEntity } from '../database/entities/availability.entity';
import { PersonnelEntity } from '../database/entities/personnel.entity';
import { AppLogger } from '../logger/logger.service';
import { QueryTransformPipe } from '../query-validation.pipe';

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

  @ApiOperation({
    summary: 'Add personnel',
    description:
      'NON-WORKING ENDPOINT - This endpoint is to demonstrate what pieces the app needs for personnel data',
  })
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
  })
  @Post()
  @Roles(Role.COORDINATOR, Role.LOGISTICS)
  async createPersonnel(
    @Body() personnel: CreatePersonnelDTO[],
    @Request() req: RequestWithRoles,
  ) {
    this.logger.log(`${req.method}: ${req.url} - ${req.username}`);
    return await this.personnelService.createPersonnel(personnel);
  }

  @ApiOperation({
    summary: 'Update personnel',
    description: 'Update existing personnel data.',
  })
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
  })
  @Patch(':id')
  @Roles(Role.COORDINATOR, Role.LOGISTICS)
  async updatePersonnel(
    @Body() personnel: UpdatePersonnelDTO,
    @Request() req: RequestWithRoles,
    @Param('id') id: string,
  ) {
    this.logger.log(`${req.method}: ${req.url} - ${req.username}`);

    delete personnel.availability;  // Ensure we don't use this endpoint to update availability
    const { experiences, ...details } = personnel;

    // For now, these are distinct and will not be updated at the same time
    if (experiences) {
      return this.personnelService.updatePersonnelExperiences(id, experiences, req.role);
    } else if (Object.keys(details).length > 0) {
      return this.personnelService.updatePersonnel(id, details, req.role);
    } else {
      return this.personnelService.getPersonnelById(req.role, id);
    }
  }

  @ApiOperation({
    summary: 'Get personnel',
    description: 'Returns the personnel data to the dashboard view',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetPersonnelRO,
  })
  @Get()
  @Roles(Role.COORDINATOR, Role.LOGISTICS)
  @UsePipes(new QueryTransformPipe())
  async getPersonnel(
    @Request() req: RequestWithRoles,
    @Query() query?: GetPersonnelDTO,
  ): Promise<GetPersonnelRO> {
    this.logger.log(`${req.method}: ${req.url} - ${req.username}`);

    const queryResponse: {
      personnel: PersonnelEntity[];
      count: number;
    } = await this.personnelService.getPersonnel(query);

    return {
      personnel: queryResponse.personnel.map((itm) =>
        itm.toResponseObject(req.role),
      ),
      count: queryResponse.count,
      rows: query.rows,
      page: query.page,
    };
  }

  @ApiOperation({
    summary: 'Get personnel By Id',
    description: 'Returns the personnel data to the profile view',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetPersonnelRO,
  })
  @Get(':id')
  @Roles(Role.COORDINATOR, Role.LOGISTICS)
  async getPersonnelById(
    @Param('id') id: string,
    @Req() req: RequestWithRoles,
  ): Promise<Record<'Personnel', PersonnelRO>> {
    this.logger.log(`${req.method}: ${req.url} - ${req.username}`);

    const personnelRO: Record<'Personnel', PersonnelRO> =
      await this.personnelService.getPersonnelById(req.role, id);

    return personnelRO;
  }

  @ApiOperation({
    summary: 'Update personnel availability',
    description: 'Update availability',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetPersonnelRO,
  })
  @Patch(':id/availability')
  @Roles(Role.COORDINATOR, Role.LOGISTICS)
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
  @Roles(Role.COORDINATOR, Role.LOGISTICS)
  async getPersonnelAvailability(
    @Param('id') id: string,
    @Req() req: RequestWithRoles,
    @Query() query: GetAvailabilityDTO,
  ): Promise<AvailabilityRO[]> {
    this.logger.log(`${req.method}: ${req.url} - ${req.username}`);
    const dates = await this.personnelService.getAvailability(id, query);

    const dateROs = dates.map((d) => d.toResponseObject());

    const firstDate = dates[0];
    if (firstDate.availabilityType !== 'NOT_INDICATED') {
      const actualStart = await this.personnelService.getEventStartDate(
        id,
        firstDate,
      );
      dateROs[0].actualStartDate = actualStart;
    }

    const lastDate = dates[dates.length - 1];
    if (lastDate.availabilityType !== 'NOT_INDICATED') {
      const actualEnd = await this.personnelService.getEventEndDate(
        id,
        lastDate,
      );
      dateROs[dateROs.length - 1].actualEndDate = actualEnd;
    }

    return dateROs;
  }
}
