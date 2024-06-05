import {
  Post,
  Controller,
  ClassSerializerInterceptor,
  UseInterceptors,
  Req,
  RawBodyRequest,
  Get,
  Body
} from '@nestjs/common';
import { ApiOperation,  ApiTags } from '@nestjs/swagger';
import { CreateFormDTO } from './form.dto';
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
    this.logger.log(req.rawBody.toString())
    const rawBody: FormSubmissionEventPayload= JSON.parse(req.rawBody.toString());
    return await this.formService.processEventPayload(rawBody);
  }

  /**
   * Returns the formId for the chefs form based on the current env
   * @returns
   */
  @Get()
  @Public()
  getFormId(): { formId: string; disabled: boolean } {
    return {
      formId: `${process.env.CHEFS_FORM_ID}`,
      disabled: process.env.CHEFS_FORM_DISABLED === 'true',
    };
  }
}
