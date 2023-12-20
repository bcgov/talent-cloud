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
import { CreatePersonnelDTO } from './personnel.dto';
import { PersonnelService } from './personnel.service';
import { QueryTransformPipe, QueryDto } from '../query-validation.pipe';

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
  @Get()
  @UsePipes(new QueryTransformPipe())
  async getResources(@Query() query?: QueryDto) {
    return this.personnelService.getPersonnel(query);
  }
}
