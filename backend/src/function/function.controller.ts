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
import { QueryTransformPipe } from '../query-validation.pipe';
import { Role } from '../auth/interface';
import { Roles } from '../auth/roles.decorator';

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
  @Roles(Role.COORDINATOR, Role.LOGISTICS)
  @UsePipes(new QueryTransformPipe())
  async getFunctions(): Promise<FunctionRO[]> {
    const functions = await this.functionService.getFunctions();
    return functions.map((fn) => fn.toResponseObject());
  }
}
