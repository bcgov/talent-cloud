import {
  Post,
  Controller,
  ClassSerializerInterceptor,
  UseInterceptors,
  Req,
  RawBodyRequest,
  Get,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FormService } from './form.service';
import { FormSubmissionEventPayload } from './interface';
import { TokenType } from '../auth/interface';
import { Public } from '../auth/public.decorator';
import { Token } from '../auth/token.decorator';
import { AppLogger } from '../logger/logger.service';

@Controller('form')
@ApiTags('Form Submission API')
@UseInterceptors(ClassSerializerInterceptor)
export class FormSubmissionController {
  constructor(
    private readonly formService: FormService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(FormSubmissionController.name);
  }

  @Post()
  @Token([TokenType.CHEFS])
  async handleIncomingEvents(@Req() req: RawBodyRequest<Request>) {
    this.logger.log('Received form submission event');
    this.logger.log(req.rawBody.toString());
    const rawBody: FormSubmissionEventPayload = JSON.parse(
      req.rawBody.toString(),
    );
    return await this.formService.processEventPayload(rawBody);
  }

  /**
   * Public endpoint with form ID and form enabled status
   * @returns {Object} Form info
   */
  @Public()
  @Get()
  async getFormInfo() {
    return {
      formId: process.env.CHEFS_FORM_ID,
      formEnabled: process.env.CHEFS_FORM_ENABLED === 'true',
      env: process.env.ENV,
    };
  }
}
