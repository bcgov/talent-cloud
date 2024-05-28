import {
  Controller,
  HttpStatus,
  Get,
  UsePipes,
  ClassSerializerInterceptor,
  UseInterceptors,
  Inject,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FunctionService } from './function.service';
import { FunctionRO } from './ro/function.ro';
import { Program } from '../auth/interface';
import { Programs } from '../auth/program.decorator';
import { QueryTransformPipe } from '../query-validation.pipe';
import { RolesRO } from './ro/role.ro';

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
  @Programs([Program.EMCR, Program.ADMIN])
  @UsePipes(new QueryTransformPipe())
  async getFunctions(): Promise<FunctionRO[]> {
    const functions = await this.functionService.getFunctions();
    return functions.map((fn) => fn.toResponseObject());
  }

  @ApiOperation({
    summary: 'Get bcws roles',
    description: 'Returns all available roles',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [RolesRO],
  })
  @Get('bcws/roles')
  @Programs([Program.BCWS, Program.ADMIN])
  @UsePipes(new QueryTransformPipe())
  async getRoles(): Promise<RolesRO[]> {
    const allRoles = await this.functionService.getAllRoles();
    return allRoles.map((r) => r.toResponseObject());
  }
}
