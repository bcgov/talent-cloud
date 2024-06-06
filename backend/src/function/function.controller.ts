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
import { Public } from '../auth/public.decorator';
import { BcwsToolsRO } from '../personnel/ro/bcws/tools.ro';
import { RolesDataRO } from '../personnel/ro/bcws/roles-data.ro';
import { CertificationRO } from '../personnel/ro/bcws/bcws-certification.ro';

@Controller('function')
@ApiTags('Functions API')
@UseInterceptors(ClassSerializerInterceptor)
export class FunctionController {
  constructor(
    @Inject(FunctionService)
    private readonly functionService: FunctionService,
  ) { }

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
    return  functions.map((fn) => fn.toResponseObject()) ;
  }

  @ApiOperation({
    summary: 'Get bcws data',
    description: 'Returns all available roles, certificates and tools to be used in CHEFS form',
  })
  @Get('/bcws')
  @Public()
  async getBcwsFieldData(): Promise< { roles: RolesDataRO, certs: CertificationRO[], tools: BcwsToolsRO[] } > {
    const roles = await this.functionService.getRoles();
    const certificates = await this.functionService.getCertificates()
    const tools = await this.functionService.getTools();

    return {
      
        roles: roles,
        certs: certificates.map((c) => c.toResponseObject()),
        tools: tools.map((t) => t.toResponseObject())
      }

  }
}
