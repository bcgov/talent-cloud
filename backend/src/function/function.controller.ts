import {
  Body,
  Post,
  Controller,
  HttpStatus,
  Get,
  Query,
  UsePipes,
  ClassSerializerInterceptor,
  UseInterceptors,
  Inject,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { QueryTransformPipe } from '../query-validation.pipe';
import { FunctionService } from './function.service';
import { FunctionRO } from './ro/function.ro';
import { Public } from 'src/auth/public.decorator';

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
  @UsePipes(new QueryTransformPipe())
  async getFunctions(): Promise<FunctionRO[]> {
    const functions = await this.functionService.getFunctions();
    return functions.map((fn) => fn.toResponseObject());
  }
}
