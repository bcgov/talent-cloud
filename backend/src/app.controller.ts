import { Request, Controller, Get, Inject } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  HealthCheckService,
  HealthCheck,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { RequestWithRoles } from './auth/interface';
import { Public } from './auth/public.decorator';
import { BcwsService } from './bcws/bcws.service';
import { Ministry, MinistryName } from './common/enums';
import { EmcrService } from './emcr/emcr.service';
import { AppLogger } from './logger/logger.service';
import { RegionsAndLocationsService } from './region-location/region-location.service';
import axios from 'axios';

@ApiTags('Application API')
@Controller()
@Public()
export class AppController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    @Inject(BcwsService) private bcwsService: BcwsService,
    @Inject(EmcrService) private emcrService: EmcrService,
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

  @Public()
  @Get('/chips')
  async chips() {
    this.logger.log('CHIPS');
    try {
      const response = await axios.get(`${process.env.CHIPS_API}/?$top=100`, {
        headers: {
          'x-cdata-authtoken': process.env.CHIPS_API_KEY,
        }
      });
      this.logger.log('SUCCESS');
      this.logger.log(response);
      return response;
    } catch (e) {
      this.logger.error("ERROR");
      this.logger.error(e);
      return 'error';
    }
  }

  /**
   * Return lists of values used by frontend and CHEFS form
   * @param req
   * @returns
   */
  @Public()
  @Get('/field/data')
  async getBcwsFilters(@Request() req: RequestWithRoles) {
    this.logger.log(`${req.url} ${req.role}`);

    const sections = await this.bcwsService.getRoles();
    const certificates = await this.bcwsService.getCertificates(true);
    const tools = await this.bcwsService.getTools();
    const roles = await this.bcwsService.getAllRoles();
    const functions = await this.emcrService.getFunctions();
    /**
     * !! IMPORANT - ensure any changes made to this endpoint are reflected in the CHEFS form !!
     */
    return {
      ministries: Object.values(Ministry).map((ministry) => ({
        value: ministry,
        label: MinistryName[ministry],
      })),

      locations: (await this.locationService.getRegionsAndLocations()).filter(
        (itm) => itm.fireCentre !== null,
      ),
      sections,
      roles: roles.map((itm) => itm.toResponseObject()),
      bcwsRoles: await this.bcwsService.getRoles(),
      certs: certificates.map((c) => c.toResponseObject()),
      tools: tools.map((t) => t.toResponseObject()),
      functions: functions.map((f) => f.toResponseObject()),
    };
  }
}
