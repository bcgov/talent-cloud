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
import { GetBcwsPersonnelDTO } from './dto/bcws/get-bcws-personnel.dto';
import { CreatePersonnelDTO } from './dto/create-personnel.dto';
import { GetEmcrPersonnelDTO, UpdateEmcrPersonnelDTO } from './dto/emcr';
import { GetAvailabilityDTO } from './dto/get-availability.dto';
import { UpdateAvailabilityDTO } from './dto/update-availability.dto';
import { PersonnelService } from './personnel.service';
import { AvailabilityRO } from './ro/availability.ro';
import { GetPersonnelRO } from './ro/get-personnel.ro';
import { PersonnelRO } from './ro/personnel.ro';
import { Program, RequestWithRoles, TokenType } from '../auth/interface';
import { Token } from '../auth/token.decorator';
import { ICS_TRAINING_NAME } from '../common/const';
import { AvailabilityEntity } from '../database/entities/availability.entity';
import { AppLogger } from '../logger/logger.service';
import { QueryTransformPipe } from '../query-validation.pipe';
import { UpdateBcwsPersonnelDTO } from './dto/bcws/update-bcws-personnel.dto';
import {Programs} from '../auth/program.decorator';

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
  @Programs([Program.EMCR, Program.ADMIN])
  @Patch('/emcr/:id')
  async updatePersonnel(
    @Body() personnel: UpdateEmcrPersonnelDTO,
    @Request() req: RequestWithRoles,
    @Param('id') id: string,
  ) {
    this.logger.log(`${req.method}: ${req.url} - ${req.username}`);

    if (personnel.icsTraining === true) {
      personnel.trainings = await this.personnelService.getTrainingsByNames([
        ICS_TRAINING_NAME,
      ]);
      delete personnel.icsTraining
    } else if (personnel.icsTraining === false) {
      personnel.trainings = [];
    }
    
    const { experiences, ...details } = personnel;

    // For now, these are distinct and will not be updated at the same time
    if (experiences) {
      return this.personnelService.updatePersonnelExperiences(
        id,
        experiences,
        req.role,
      );
    } else if (Object.keys(details).length > 0) {
      return this.personnelService.updatePersonnel(id, details, req.role);
    } else {
      return this.personnelService.getEmcrPersonnelById(req.role,  id);
    }
  }


  @ApiOperation({
    summary: 'Update personnel',
    description: 'Update existing personnel data.',
  })
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
  })
  @Patch('/bcws/:id')
  async updateBcwsPersonnel(
    @Body() personnel: UpdateBcwsPersonnelDTO,
    @Request() req: RequestWithRoles,
    @Param('id') id: string,
  ) {
    this.logger.log(`${req.method}: ${req.url} - ${req.username}`);
    return this.personnelService.updateBcwsPersonnel(id, personnel, req.role);
  }


  @ApiOperation({
    summary: 'Get emcr personnel',
    description: 'Returns the personnel data to the dashboard view',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetPersonnelRO,
  })
  
  @Programs([Program.EMCR, Program.ADMIN])
  @Get('/emcr')
  @UsePipes(new QueryTransformPipe())
  async getEmcrPersonnel(
    @Request() req: RequestWithRoles,
    @Query() query?: GetEmcrPersonnelDTO,
  ): Promise<GetPersonnelRO> {
    this.logger.log(`${req.method}: ${req.url} - ${req.username}`);

    const { personnel, count } = await this.personnelService.getEmcrPersonnel(query);

    return {
      personnel: personnel.map((itm) =>
        itm.toResponseObject(req.role),
      ),
      count,
      rows: query.rows,
      page: query.page,
    };
  }

  @ApiOperation({
    summary: 'Get bcws personnel',
    description: 'Returns the personnel data to the dashboard view',
  })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @Get('/bcws')
  @Programs([Program.BCWS, Program.ADMIN])
  @UsePipes(new QueryTransformPipe())
  async getBcwsPersonnel(
    @Request() req: RequestWithRoles,
    @Query() query?: GetBcwsPersonnelDTO,
  ): Promise<GetPersonnelRO> {
    this.logger.log(`${req.method}: ${req.url} - ${req.username}`);

    const { personnel, count } = await this.personnelService.getBcwsPersonnel(query);

    return {
      personnel: personnel.map((itm) =>
        itm.toResponseObject(req.role),
      ),
      count,
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
  @Get('/emcr/:id')
  async getPersonnelById(
    @Param('id') id: string,
    @Req() req: RequestWithRoles,
  ): Promise<Record<'Personnel', PersonnelRO>> {
    this.logger.log(`${req.method}: ${req.url} - ${req.username}`);

    const personnelRO: Record<'Personnel', PersonnelRO> =
      await this.personnelService.getEmcrPersonnelById(req.role, id);
      

    return personnelRO;
  }

  @ApiOperation({
    summary: 'Get personnel By Id',
    description: 'Returns the personnel data to the profile view',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetPersonnelRO,
  })
  @Get('/bcws/:id')
  async getBcwsPersonnelById(
    @Param('id') id: string,
    @Req() req: RequestWithRoles,
    ): Promise<Record<'Personnel', PersonnelRO>> {
      this.logger.log(`${req.method}: ${req.url} - ${req.username}`);
  
      const personnelRO: Record<'Personnel', PersonnelRO> =
        await this.personnelService.getBcwsPersonnelById(req.role,  id);
  
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
      const firstEventDateEnd = dates.findIndex(
        (d) => d.availabilityType !== firstDate.availabilityType,
      );
      for (let i = 0; i < firstEventDateEnd; i++) {
        dateROs[i].actualStartDate = actualStart;
      }
    }

    const lastDate = dates[dates.length - 1];
    if (lastDate.availabilityType !== 'NOT_INDICATED') {
      const actualEnd = await this.personnelService.getEventEndDate(
        id,
        lastDate,
      );
      const lastEventDateStart = dates
        .reverse()
        .findIndex((d) => d.availabilityType !== lastDate.availabilityType);
      for (let i = 1; i <= lastEventDateStart; i++) {
        dateROs[dateROs.length - i].actualEndDate = actualEnd;
      }
    }

    return dateROs;
  }
  @Get('/bcws/approved')
  @Token(TokenType.BCWS)
  async getApprovedApplicants(): Promise<
    { employeeId: number; firstName: string; lastName: string }[]
  > {
    return this.personnelService.getApprovedBCWSMembers();
  }
}
