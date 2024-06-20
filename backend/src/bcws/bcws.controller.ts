import {
  Request,
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Query,
  Req,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BcwsService } from './bcws.service';
import { GetBcwsPersonnelDTO } from './dto/get-bcws-personnel.dto';
import { UpdateBcwsPersonnelDTO } from './dto/update-bcws-personnel.dto';
import { Program, RequestWithRoles } from '../auth/interface';
import { Programs } from '../auth/program.decorator';
import { AppLogger } from '../logger/logger.service';
import { UpdatePersonnelDTO, GetPersonnelRO, PersonnelRO } from '../personnel';
import { QueryTransformPipe } from '../query-validation.pipe';

@Controller('bcws')
@ApiTags('BCWS Personnel API')
export class BcwsController {
  constructor(
    @Inject(BcwsService)
    private readonly bcwsService: BcwsService,
    private readonly logger: AppLogger,
  ) {}

  @ApiOperation({
    summary: 'Update personnel',
    description: 'Update existing personnel data.',
  })
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
  })
  @Programs([Program.BCWS])
  @Patch('/:id')
  async updateBcwsPersonnel(
    @Body() personnel: UpdateBcwsPersonnelDTO & UpdatePersonnelDTO,
    @Request() req: RequestWithRoles,
    @Param('id') id: string,
  ) {
    this.logger.log(`${req.method}: ${req.url} - ${req.username}`);
    return this.bcwsService.updateBcwsPersonnel(id, personnel, req.role);
  }

  @ApiOperation({
    summary: 'Get bcws personnel',
    description: 'Returns the personnel data to the dashboard view',
  })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @Programs([Program.BCWS])
  @Get()
  @UsePipes(new QueryTransformPipe())
  async getBcwsPersonnel(
    @Request() req: RequestWithRoles,
    @Query() query?: GetBcwsPersonnelDTO,
  ): Promise<GetPersonnelRO> {
    this.logger.log(`${req.method}: ${req.url} - ${req.username}`);

    const { personnel, count } = await this.bcwsService.getBcwsPersonnel(query);

    return {
      personnel: personnel.map((itm) => itm.toResponseObject(req.role)),
      count,
      rows: query.rows,
      page: query.page,
    };
  }

  @ApiOperation({
    summary: 'Get personnel By Id',
    description: 'Returns the personnel data to the profile view',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetPersonnelRO,
  })
  @Programs([Program.BCWS])
  @Get('/:id')
  async getBcwsPersonnelById(
    @Param('id') id: string,
    @Req() req: RequestWithRoles,
  ): Promise<Record<'Personnel', PersonnelRO>> {
    this.logger.log(`${req.method}: ${req.url} - ${req.username}`);

    const personnelRO: Record<'Personnel', PersonnelRO> =
      await this.bcwsService.getBcwsPersonnelById(req.role, id);

    return personnelRO;
  }
}
