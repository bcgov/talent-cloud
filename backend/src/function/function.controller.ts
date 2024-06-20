import {
  Controller,
  HttpStatus,
  Get,
  ClassSerializerInterceptor,
  UseInterceptors,
  Inject,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FunctionService } from './function.service';
import { FunctionRO } from './ro/function.ro';
import { RolesRO } from './ro/role.ro';
import { Public } from '../auth/public.decorator';
import { CertificationRO } from '../bcws/ro/bcws-certification.ro';
import { RolesDataRO } from '../bcws/ro/roles-data.ro';
import { BcwsToolsRO } from '../bcws/ro/tools.ro';

@Controller('function')
@ApiTags('Functions API')
@UseInterceptors(ClassSerializerInterceptor)
export class FunctionController {
  constructor(
    @Inject(FunctionService)
    private readonly functionService: FunctionService,
  ) {}

  @ApiOperation({
    summary: 'Get functions',
    description: 'Returns all available functions',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [FunctionRO],
  })
  @Get()
  @Public()
  async getFunctions(): Promise<FunctionRO[]> {
    const functions = await this.functionService.getFunctions();
    console.log(functions);
    return functions.map((fn) => fn.toResponseObject());
  }

  @ApiOperation({
    summary: 'Get bcws data',
    description:
      'Returns all available roles, certificates and tools to be used in CHEFS form',
  })
  @Get('/bcws')
  @Public()
  async getBcwsFieldData(): Promise<{
    roles: RolesDataRO;
    certs: CertificationRO[];
    tools: BcwsToolsRO[];
  }> {
    const roles = await this.functionService.getRoles();
    const certificates = await this.functionService.getCertificates();
    const tools = await this.functionService.getTools();

    return {
      roles: roles,
      certs: certificates.map((c) => c.toResponseObject()),
      tools: tools.map((t) => t.toResponseObject()),
    };
  }

  @ApiOperation({
    summary: 'Get bcws roles',
    description: 'Returns all available roles',
  })
  @Get('/roles')
  @Public()
  async getBCWSRole(): Promise<RolesRO[]> {
    const roles = await this.functionService.getAllRoles();
    return roles.map((itm) => itm.toResponseObject());
  }
}
