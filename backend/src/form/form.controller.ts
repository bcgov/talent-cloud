import {
  Post,
  Controller,
  ClassSerializerInterceptor,
  UseInterceptors,
  Req,
  UseGuards,
  RawBodyRequest,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppLogger } from 'src/logger/logger.service';
import { FormService } from './form.service';
import { Public } from '../auth/public.decorator';
import { TokenGuard } from '../auth/token_guard';

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
  @Public()
  @UseGuards(TokenGuard)
  async handleIncomingEvents(@Req() req: RawBodyRequest<Request>) {
    this.logger.log('Received form submission event');
    const rawBody = JSON.parse(req.rawBody.toString());
    await this.formService.processEventPayload(rawBody);
  }
}
