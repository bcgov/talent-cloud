import { ClassSerializerInterceptor, Controller, Get, Inject, UseGuards, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AppLogger } from "../logger/logger.service";
import { BcwsService } from "./bcws.service";
import { Public } from "../auth/public.decorator";
import { BcwsTokenGuard } from "../auth/bcws.guard";

@ApiTags('BcwsController API')
@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class BcwsController {
  constructor(
    @Inject(BcwsService) private readonly bcwsService: BcwsService, 
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(BcwsController.name);
  }

  @Get()
  @Public()
  @UseGuards(BcwsTokenGuard)
  async getApprovedApplicants(){
    return await this.bcwsService.getApprovedApplicants()
  }
}