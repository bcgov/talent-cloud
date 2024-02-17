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
import { AvailabilityEntity } from 'src/database/entities/availability.entity';
import { UpdateResult } from 'typeorm';
import { CreatePersonnelDTO } from './dto/create-personnel.dto';
import { GetPersonnelDTO } from './dto/get-personnel.dto';
import { UpdateAvailabilityDTO } from './dto/update-availability.dto';
import { UpdatePersonnelDTO } from './dto/update-personnel.dto';
import { PersonnelService } from './personnel.service';
import { GetPersonnelRO } from './ro/get-personnel.ro';
import { PersonnelRO } from './ro/personnel.ro';
import { RequestWithRoles, Role } from '../auth/interface';
import { Roles } from '../auth/roles.decorator';
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
  async createPersonnel(
    @Body() personnel: CreatePersonnelDTO[],
    @Request() req: RequestWithRoles,
  ) {
    this.logger.log(
      `${this.createPersonnel.name}, ${req.username}, ${req.role}`,
    );
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
  @Roles(Role.COORDINATOR)
  async updatePersonnel(
    @Body() personnel: UpdatePersonnelDTO,
    @Request() req: RequestWithRoles,
    @Param('id') id: string,
  ) {
    this.logger.log(
      `${this.updatePersonnel.name} ${req.username}, ${req.role}`,
    );
    return await this.personnelService.updatePersonnel(id, personnel);
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
    this.logger.log(`${this.getPersonnel.name}, ${req.username}, ${req.role}`);

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
    this.logger.log(
      `${this.getPersonnelById.name}, ${req.username}, ${req.role}`,
    );
    const personnelRO: Record<'Personnel', PersonnelRO> =
      await this.personnelService.getPersonnelById(req.role, id);

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
  @Patch(':id/availability')
  @Roles(Role.COORDINATOR, Role.LOGISTICS)
  async updatePersonnelAvailability(
    @Param('id') id: string,
    @Body() personnel: UpdateAvailabilityDTO,
    @Req() req: RequestWithRoles,
  ): Promise<(UpdateResult | AvailabilityEntity)[]> {
    this.logger.log(
      `${this.getPersonnelById.name}, ${req.username}, ${req.role}`,
    );

    return await this.personnelService.updateAvailability(id, personnel);
  }
}
