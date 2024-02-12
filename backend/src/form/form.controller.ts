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
import { FormService } from './form.service';
import { Public } from '../auth/public.decorator';
import { TokenGuard } from '../auth/token_guard';

@Controller('form')
@ApiTags('Form Submission API')
@UseInterceptors(ClassSerializerInterceptor)
export class FormSubmissionController {
  constructor(private readonly formService: FormService) {}

  @Post()
  @Public()
  @UseGuards(TokenGuard)
  async handleIncomingEvents(@Req() req: RawBodyRequest<Request>) {
    const rawBody = JSON.parse(req.rawBody.toString());
    await this.formService.processEventPayload(rawBody);
  }
}
