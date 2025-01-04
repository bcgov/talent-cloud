import {
  Body,
  Controller,
  HttpStatus,
  ClassSerializerInterceptor,
  UseInterceptors,
  Inject,
  Post,
  Param,
  Patch,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CronTestService } from './cron-test.service';
import { RecommitmentService } from './recommitment.service';
import { RequestWithRoles } from '../auth/interface';
import { Public } from '../auth/public.decorator';
import { AppLogger } from '../logger/logger.service';
import { GetPersonnelRO, PersonnelRO } from '../personnel';
import { PersonnelRecommitmentDTO } from '../personnel/dto/update-personnel-recommitment.dto';

@Controller('recommitment')
@ApiTags('Recommitment API')
@UseInterceptors(ClassSerializerInterceptor)
export class RecommitmentController {
  constructor(
    @Inject(RecommitmentService)
    private readonly recommitmentService: RecommitmentService,
    @Inject(CronTestService)
    private readonly cronTestService: CronTestService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(RecommitmentController.name);
  }
  @Post('/test')
  @Public()
  @ApiOperation({
    summary: 'Manual trigger for recommitment',
    description: 'Returns the personnel data to the supervisor view',
  })
  @ApiBody({
    type: Object,
    required: true,
    schema: {
      example: {
        email: '',
      },
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  async testRecommitment(@Body() body: { email: string }): Promise<unknown> {
    if (process.env.MODE !== 'production') {
      return await this.cronTestService.scheduleTestCron(body.email);
    } else {
      throw new Error('This endpoint is disabled in production');
    }
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update personnel data',
    description: 'Update personnel data',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetPersonnelRO,
  })
  async updatePersonnelRecommitment(
    @Param('id') id: string,
    @Req() req: RequestWithRoles,
    @Body() update: PersonnelRecommitmentDTO,
  ): Promise<Record<'personnel', PersonnelRO>> {
    this.logger.log(`Updating personnel ${id}`);
    const personnel =
      await this.recommitmentService.updateMemberRecommitmentStatus(
        id,
        update,
        req,
      );
    return personnel.toResponseObject(req.roles);
  }
}
