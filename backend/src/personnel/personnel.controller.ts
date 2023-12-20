import {
  Body,
  Post,
  Controller,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreatePersonnelDTO } from './personnel.dto';

@Controller('personnel')
@ApiTags('Personnel API')
export class PersonnelController {
  constructor() {

  }

  @ApiOperation({
    summary: 'Add personnel',
    description: 'NON-WORKING ENDPOINT - This endpoint is to demonstrate what pieces the app needs for personnel data',
  })
  @ApiResponse({
    status: HttpStatus.ACCEPTED
  })
  @Post()
  async createPersonnel(
    @Body() personnel: CreatePersonnelDTO,
  ) {
    return personnel;
  }
}