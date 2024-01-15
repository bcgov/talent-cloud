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
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreatePersonnelDTO } from './dto/create-personnel.dto';
import { GetPersonnelDTO } from './dto/get-personnel.dto';
import { PersonnelService } from './personnel.service';
import { GetPersonnelRO } from './ro/get-personnel.ro';
import { QueryTransformPipe } from '../query-validation.pipe';

@Controller('personnel')
@ApiTags('Personnel API')
@UseInterceptors(ClassSerializerInterceptor)
export class PersonnelController {
  constructor(
    @Inject(PersonnelService)
    private readonly personnelService: PersonnelService,
  ) {}

  @ApiOperation({
    summary: 'Add personnel',
    description:
      'NON-WORKING ENDPOINT - This endpoint is to demonstrate what pieces the app needs for personnel data',
  })
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
  })
  @Post()
  async createPersonnel(@Body() personnel: CreatePersonnelDTO) {
    return personnel;
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
  @UsePipes(new QueryTransformPipe())
  async getPersonnel(@Query() query?: GetPersonnelDTO): Promise<GetPersonnelRO> {
    const queryResponse = await this.personnelService.getPersonnel(query);
    const personnel = queryResponse.personnel.map((personnelEntity) => personnelEntity.toResponseObject());
    return {
      personnel,
      count: queryResponse.count,
      rows: query.rows,
      page: query.page,
    };
  }
}
