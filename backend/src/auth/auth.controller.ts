import {
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor,
  Request,
  Get,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestWithRoles, RolesRequest } from './interface';
import { AppLogger } from '../logger/logger.service';

@Controller('auth')
@ApiTags('Auth API')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly logger: AppLogger) {
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
  checkUserPermissions(@Request() req: RequestWithRoles): RolesRequest {
    this.logger.log(
      `${req.method}: ${req.url} - ${req.roles} - ${req.username}`,
    );

    return {
      roles: req?.roles,
      program: req?.program,
      username: `${req?.username}`,
      idir: req?.idir.toLowerCase(),  
    };
  }
}
