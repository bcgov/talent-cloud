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
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RecommitmentStatus } from 'src/common/enums/recommitment-status.enum';
import { RecommitmentService } from './recommitment.service';
import { RequestWithRoles, Role } from '../auth/interface';
import { Roles } from '../auth/roles.decorator';
import { AppLogger } from '../logger/logger.service';
import { GetPersonnelRO, PersonnelRO } from '../personnel';
import { PersonnelRecommitmentDTO } from '../personnel/dto/recommitment/create-personnel-recommitment.dto';

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

  @Patch('member/:id')
  @ApiOperation({
    summary: 'Update personnel data',
    description: 'Update personnel data',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetPersonnelRO,
  })
  @Roles(Role.MEMBER)
  async updatePersonnelRecommitment(
    @Param('id') id: string,
    @Req() req: RequestWithRoles,
    @Body() update: PersonnelRecommitmentDTO,
  ): Promise<Record<'personnel', PersonnelRO>> {
    this.logger.log(`Updating personnel ${id}`);

    if (
      (update.bcws &&
        ![
          RecommitmentStatus.MEMBER_COMMITTED,
          RecommitmentStatus.MEMBER_DENIED,
        ].includes(update.bcws.status)) ||
      (update.emcr &&
        ![
          RecommitmentStatus.MEMBER_COMMITTED,
          RecommitmentStatus.MEMBER_DENIED,
        ].includes(update.emcr.status))
    ) {
      throw new UnauthorizedException(
        'Member can only set themselves as committed or denied',
      );
    }
    const personnel =
      await this.recommitmentService.updateMemberRecommitmentStatus(
        id,
        update,
        req,
      );

    return personnel.toResponseObject(req.roles);
  }

  @Patch('coordinator/:id')
  @ApiOperation({
    summary: 'Update personnel data',
    description: 'Update personnel data',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetPersonnelRO,
  })
  @Roles(Role.COORDINATOR)
  async coordinatorUpdatePersonnelRecommitment(
    @Param('id') id: string,
    @Req() req: RequestWithRoles,
    @Body() update: PersonnelRecommitmentDTO,
  ): Promise<Record<'personnel', PersonnelRO>> {
    this.logger.log(`Updating personnel ${id}`);
    if (
      (update.bcws && update.bcws.status !== RecommitmentStatus.PENDING) ||
      (update.emcr && update.emcr.status !== RecommitmentStatus.PENDING)
    ) {
      throw new UnauthorizedException(
        'Coordinators may only set members to pending',
      );
    }

    const personnel =
      await this.recommitmentService.coordinatorUpdatePersonnelRecommitment(
        id,
        update,
      );
    return personnel.toResponseObject(req.roles);
  }

  @Patch('supervisor/:id')
  @ApiOperation({
    summary: 'Update personnel data',
    description: 'Update personnel data',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetPersonnelRO,
  })
  @Roles(Role.SUPERVISOR)
  async supervisorUpdatePersonnelRecommitment(
    @Param('id') id: string,
    @Req() req: RequestWithRoles,
    @Body() update: PersonnelRecommitmentDTO,
  ): Promise<Record<'personnel', PersonnelRO>> {
    this.logger.log(`Updating personnel ${id}`);
    if (
      (update.bcws &&
        ![
          RecommitmentStatus.MEMBER_COMMITTED,
          RecommitmentStatus.MEMBER_DENIED,
        ].includes(update.bcws.status)) ||
      (update.emcr &&
        ![
          RecommitmentStatus.MEMBER_COMMITTED,
          RecommitmentStatus.MEMBER_DENIED,
        ].includes(update.emcr.status))
    ) {
      throw new UnauthorizedException(
        'Supervisors may only set members to approved or denied',
      );
    }
    const personnel =
      await this.recommitmentService.supervisorUpdateMemberRecommitmentStatus(
        id,
        update,
        req,
      );
    return personnel.toResponseObject(req.roles);
  }
}
