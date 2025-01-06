import {
  Body,
  Controller,
  HttpStatus,
  ClassSerializerInterceptor,
  UseInterceptors,
  Inject,
  Param,
  Patch,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from '../auth/roles.decorator';
import { RecommitmentService } from './recommitment.service';
import { RequestWithRoles, Role } from '../auth/interface';
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
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(RecommitmentController.name);
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
  @Roles(Role.MEMBER, Role.COORDINATOR, Role.SUPERVISOR)
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
