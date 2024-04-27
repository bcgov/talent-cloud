import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BcwsService } from './bcws.service';
import { Program, TokenType } from '../auth/interface';
import { Programs } from '../auth/program.decorator';
import { Token } from '../auth/token.decorator';

import { AppLogger } from '../logger/logger.service';

@ApiTags('BcwsController API')
@UseInterceptors(ClassSerializerInterceptor)
@Programs([Program.BCWS])
@Controller('bcws')
export class BcwsController {
  constructor(
    @Inject(BcwsService) private readonly bcwsService: BcwsService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(BcwsController.name);
  }

  @Get('approved')
  @Token(TokenType.BCWS)
  async getApprovedApplicants() {
    return await this.bcwsService.getApprovedApplicants();
  }
}
