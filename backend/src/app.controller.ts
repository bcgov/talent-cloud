import { Request, Controller, Get, Inject, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  HealthCheckService,
  HealthCheck,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import axios from 'axios';
import { RequestWithRoles } from './auth/interface';
import { Public } from './auth/public.decorator';
import { BcwsService } from './bcws/bcws.service';
import { Ministry, MinistryName } from './common/enums';
import { EmcrService } from './emcr/emcr.service';
import { AppLogger } from './logger/logger.service';
import { PersonnelService } from './personnel/personnel.service';
import { RecommitmentService } from './recommitment/recommitment.service';
import { RegionsAndLocationsService } from './region-location/region-location.service';

@ApiTags('Application API')
@Controller()
export class AppController {
  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    @Inject(BcwsService) private bcwsService: BcwsService,
    @Inject(EmcrService) private emcrService: EmcrService,
    @Inject(PersonnelService) private personnelService: PersonnelService,
    @Inject(RecommitmentService)
    private recommitmentService: RecommitmentService,
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
  @Public()
  async checkApp() {
    return {
      api: await this.health.check([]),
      db: await this.health.check([() => this.db.pingCheck('database')]),
    };
  }

  @Get('/keycloak')
  @Public()
  async getKeycloak() {
    return {
      authUrl: process.env.KEYCLOAK_AUTH_URL,
      client: process.env.KEYCLOAK_CLIENT,
      realm: process.env.KEYCLOAK_REALM,
    };
  }

  /**
   * Return lists of values used by frontend and CHEFS form
   * @param req
   * @returns
   */
  @Public()
  @Get('/field/data')
  async getBcwsFilters(@Request() req: RequestWithRoles) {
    this.logger.log(`${req.url} ${req.roles}`);

    const sections = await this.bcwsService.getRoles();
    const certificates = await this.personnelService.getCertificates(true);
    const tools = await this.personnelService.getTools();
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
  @ApiOperation({
    summary: 'Recommitment Cycle Dates',
    description: 'Endpoint to return the recommitment cycle dates',
  })
  @ApiResponse({
    status: 200,
    description: 'Recommitment Cycle Dates',
  })
  @Get('/recommitment')
  async checkRecommitmentPeriod() {
    return await this.recommitmentService.checkRecommitmentPeriod();
  }

  @Public()
  @Get('/chips')
  @ApiQuery({
    name: 'email',
    type: String,
    description: 'Email',
    required: false,
  })
  async chips(@Query('email') email?: string) {
    if (process.env.ENV !== 'dev') {
      return {};
    }
    this.logger.log('CHIPS');
    try {
      const response = await axios.get(
        `${process.env.CHIPS_API}/Datamart_COREProg_dbo_vw_report_CoreProg_EmployeeData(Work_Email='${email}')`,
        {
          headers: {
            'x-cdata-authtoken': process.env.CHIPS_API_KEY,
          },
        },
      );
      this.logger.log('SUCCESS');
      this.logger.log(response);
      return response.data;
    } catch (e) {
      this.logger.error('ERROR');
      this.logger.error(e);
      return { error: 'error' };
    }
  }

  @Public()
  @Get('/chipstraining')
  @ApiQuery({
    name: 'govid',
    type: String,
    description: 'Email',
    required: false,
  })
  async training(@Query('govid') govid?: string) {
    if (process.env.ENV !== 'dev') {
      return {};
    }
    this.logger.log('TRAINING');
    try {
      const response = await axios.get(
        `${process.env.CHIPS_API}/Datamart_COREProg_dbo_vw_report_CoreProg_LearningData(EMPLID='${govid}')`,
        {
          headers: {
            'x-cdata-authtoken': process.env.CHIPS_API_KEY,
          },
        },
      );
      this.logger.log('SUCCESS');
      this.logger.log(response);
      this.logger.log(typeof response.data);
      this.logger.log(response.data);
      this.logger.log(response.data.length);
      response.data.forEach((d) => console.log(d));
      return response.data;
    } catch (e) {
      this.logger.error('ERROR');
      this.logger.error(e);
      return 'error';
    }
  }
}
