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
import { Programs } from 'src/auth/program.decorator';
import { FunctionService } from './function.service';
import { FunctionRO } from './ro/function.ro';
import { Program } from '../auth/interface';
import { QueryTransformPipe } from '../query-validation.pipe';

@Controller('function')
@ApiTags('Functions API')
@UseInterceptors(ClassSerializerInterceptor)
@Programs([Program.BCWS, Program.EMCR])
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
  @UsePipes(new QueryTransformPipe())
  async getFunctions(): Promise<FunctionRO[]> {
    const functions = await this.functionService.getFunctions();
    return functions.map((fn) => fn.toResponseObject());
  }
}
