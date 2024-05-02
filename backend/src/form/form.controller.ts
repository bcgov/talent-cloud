import {
  Controller,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('form')
@ApiTags('Form Submission API')
@UseInterceptors(ClassSerializerInterceptor)
export class FormSubmissionController {
  // constructor(
  //   private readonly formService: FormService,
  //   private readonly logger: AppLogger,
  // ) {
  //   this.logger.setContext(FormSubmissionController.name);
  // }
  // @Post()
  // @Token(TokenType.CHEFS)
  // async handleIncomingEvents(@Req() req: RawBodyRequest<Request>) {
  //   this.logger.log('Received form submission event');
  //   const rawBody = JSON.parse(req.rawBody.toString());
  //   await this.formService.processEventPayload(rawBody);
  // }
  // /**
  //  * Returns the formId for the chefs form based on the current env
  //  * @returns
  //  */
  // @Get()
  // @Public()
  // getFormId(): { formId: string; disabled: boolean } {
  //   return {
  //     formId: `${process.env.CHEFS_FORM_ID}`,
  //     disabled: process.env.CHEFS_FORM_DISABLED === 'true',
  //   };
  // }
}
