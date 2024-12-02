import {
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor,
  Inject,
  Request,
  Get,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RequestWithRoles, RolesRequest } from './interface';
import { AppLogger } from '../logger/logger.service';

@Controller('auth')
@ApiTags('Auth API')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(
    @Inject(AuthService) private readonly authService: AuthService,
    private readonly logger: AppLogger,
  ) {
    this.logger.setContext(AuthController.name);
  }

  @ApiOperation({
    summary: 'Verify the role and sent user data',
    description: 'Returns the user data with the request',
  })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @Get()
  async checkUserPermissions(
    @Request() req: RequestWithRoles,
  ): Promise<RolesRequest> {
    this.logger.log(
      `${req.method}: ${req.url} - ${req.roles} - ${req.username}`,
    );

    const { isMember, isSupervisor, recommitment } =
      await this.authService.verifyMemberOrSupervisor(req.idir);

    return {
      roles: req?.roles,
      program: req?.program,
      username: `${req?.username}`,
      idir: req?.idir,
      member: isMember,
      supervisor: isSupervisor,
      recommitment,
    };
  }
}
