import {
  Controller,
  ClassSerializerInterceptor,
  UseInterceptors,
  Inject,
  Get,
  Request,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RegionsAndLocationsService } from './region-location.service';
import { RequestWithRoles, Role } from '../auth/interface';
import { Roles } from '../auth/roles.decorator';
import { AppLogger } from '../logger/logger.service';

@Controller('regions-locations')
@ApiTags('RegionsAndLocations API')
@UseInterceptors(ClassSerializerInterceptor)
export class RegionsAndLocationsController {
  constructor(
    @Inject(RegionsAndLocationsService)
    private readonly regionsAndLocations: RegionsAndLocationsService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(RegionsAndLocationsController.name);
  }
  @ApiOperation({
    summary: 'Get list of regions and locations',
    description: 'Used by the frontend for the dashbaord filters',
  })
  @Roles(Role.COORDINATOR, Role.LOGISTICS)
  @Get()
  async getRegionsAndLocations(@Request() req: RequestWithRoles) {
    this.logger.log(`${req.url}, ${req.username}, ${req.role}`);
    return await this.regionsAndLocations.getRegionsAndLocations();
  }
}
