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
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreatePersonnelDTO } from './dto/create-personnel.dto';
import { GetPersonnelDTO } from './dto/get-personnel.dto';
import { PersonnelService } from './personnel.service';
import { GetPersonnelRO } from './ro/get-personnel.ro';
import { PersonnelRO } from './ro/personnel.ro';
import { RequestWithRoles, Role } from '../auth/interface';
import { Roles } from '../auth/roles.decorator';

import { PersonnelEntity } from '../database/entities/personnel.entity';

import { QueryTransformPipe } from '../query-validation.pipe';
import { AppLogger } from '../logger/logger.service';
import { Endpoint } from '../common/enums/endpoint.enum';

@Controller('personnel')
@ApiTags('Personnel API')
@UseInterceptors(ClassSerializerInterceptor)
export class PersonnelController {
  constructor(
    @Inject(PersonnelService)
    private readonly personnelService: PersonnelService,
    private logger: AppLogger,
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
      `${Endpoint.CREATE_PERSONNEL}, ${req.username}, ${req.role}`,
    );
    return await this.personnelService.createPersonnel(personnel);
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
    this.logger.log(`${Endpoint.GET_PERSONNEL}, ${req.username}, ${req.role}`);

    const queryResponse = await this.personnelService.getPersonnel(query);

    const personnel = queryResponse.personnel.map((personnelEntity) =>
      personnelEntity.toResponseObject(req.role),
    );

    return {
      personnel,
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
      `${Endpoint.GET_PERSONNEL_BY_ID}, ${req.username}, ${req.role}`,
    );
    const personnelRO: PersonnelEntity =
      await this.personnelService.getPersonnelById(id);
    return personnelRO.toResponseObject(req.role);
  }
}
