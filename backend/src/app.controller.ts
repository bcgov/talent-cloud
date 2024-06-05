import { Request, Controller, Get, Inject } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  HealthCheckService,
  HealthCheck,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { RequestWithRoles } from './auth/interface';
import { Public } from './auth/public.decorator';
import { FunctionService } from './function/function.service';
import { AppLogger } from './logger/logger.service';
import { RegionsAndLocationsService } from './region-location/region-location.service';
import { Ministry, MinistryName } from './common/enums';

@ApiTags('Application API')
@Controller()
@Public()
export class AppController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    @Inject(FunctionService) private functionService: FunctionService,
    @Inject(RegionsAndLocationsService)
    private locationService: RegionsAndLocationsService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(AppController.name);
  }

  @ApiOperation({
    summary: 'Application Health',
    description: 'Health Check Endpoint',
  })
  @ApiResponse({
    status: 200,
    description: 'User Info',
    schema: {
      type: 'object',
      properties: {
        api: {},
        db: {},
      },
    },
  })
  @Get('/health')
  @HealthCheck()
  async checkApp() {
    return {
      api: await this.health.check([]),
      db: await this.health.check([() => this.db.pingCheck('database')]),
    };
  }

  @Get('/keycloak')
  async getKeycloak() {
    return {
      authUrl: process.env.KEYCLOAK_AUTH_URL,
      client: process.env.KEYCLOAK_CLIENT,
      realm: process.env.KEYCLOAK_REALM,
    };
  }

  /**
   * Return lists of values used by frontend for filtering emcr personnel
   * @param req 
   * @returns 
   */
  @Public()
  @Get('/emcr/filters')
  async getEmcrFilters(@Request() req: RequestWithRoles) {
    this.logger.log(`${req.url} ${req.role}`);
    return {
      functions: await this.functionService.getFunctions(),
      locations: (await this.locationService.getRegionsAndLocations()).filter(
        (itm) => itm.region !== null,
      ),
    };
  }
  /**
   * Return lists of values used by frontend for filtering bcws personnel
   * @param req 
   * @returns 
   */
  @Get('/bcws/filters')
  async getBcwsFilters(@Request() req: RequestWithRoles) {
    this.logger.log(`${req.url} ${req.role}`);

    return {
      functions: await this.functionService.getRoles(),
      locations: (await this.locationService.getRegionsAndLocations()).filter(
        (itm) => itm.fireCentre !== null,
      )
    };
  }

  /**
   * Public endpoint with form ID and form enabled status
   * @returns {Object} Form info
   */
  @Get('/form-info')
  @Public()
  async getFormInfo() {
    return {
      formId: process.env.CHEFS_FORM_ID,
      formEnabled: process.env.CHEFS_FORM_ENABLED === 'true',
 
    };
  }

  /**
   * Public endpoint to get list of ministries
   * Used by CHEFS form
   * @returns {Ministry[]} List of ministries
   */
  @Public()
  @Get('/ministries')
  getMinistries() {
    return { data: Object.values(Ministry).map((ministry) => ({ value: ministry, label: MinistryName[ministry] })) }
  }
}
