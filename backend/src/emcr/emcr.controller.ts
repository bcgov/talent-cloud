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
import { GetEmcrPersonnelDTO, UpdateEmcrPersonnelDTO } from './dto';
import { EmcrService } from './emcr.service';
import { Program, RequestWithRoles } from '../auth/interface';
import { Programs } from '../auth/program.decorator';
import { ICS_TRAINING_NAME } from '../common/const';
import { AppLogger } from '../logger/logger.service';
import { GetPersonnelRO, UpdatePersonnelDTO } from '../personnel';
import { QueryTransformPipe } from '../query-validation.pipe';
import { EmcrRO } from './ro';

@Controller('emcr')
@ApiTags('EMCR Personnel API')
export class EmcrController {
  constructor(
    @Inject(EmcrService)
    private readonly personnelService: EmcrService,
    private readonly logger: AppLogger,
  ) {}

  @ApiOperation({
    summary: 'Get emcr personnel',
    description: 'Returns the personnel data to the dashboard view',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetPersonnelRO,
  })
  @Programs(Program.EMCR)
  @Get()
  @UsePipes(new QueryTransformPipe())
  async getEmcrPersonnel(
    @Request() req: RequestWithRoles,
    @Query() query?: GetEmcrPersonnelDTO,
  ): Promise<GetPersonnelRO> {
    this.logger.log(`${req.method}: ${req.url} - ${req.username}`);

    const { personnel, count } = await this.personnelService.getEmcrPersonnel(
      query,
    );

    return {
      personnel: personnel.map((itm) => itm.toResponseObject(req.roles)),
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
  @Programs(Program.EMCR)
  @Get(':id')
  async getPersonnelById(
    @Param('id') id: string,
    @Req() req: RequestWithRoles,
  ): Promise<Record<'Personnel', EmcrRO>> {
    this.logger.log(`${req.method}: ${req.url} - ${req.username}`);

    const personnelRO: Record<'Personnel', EmcrRO> =
      await this.personnelService.getEmcrPersonnelById(req.roles, id);

    return personnelRO;
  }

  @ApiOperation({
    summary: 'Update personnel',
    description: 'Update existing personnel data.',
  })
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
  })
  @Programs(Program.EMCR)
  @Patch(':id')
  async updatePersonnel(
    @Body() personnel: UpdateEmcrPersonnelDTO & UpdatePersonnelDTO,
    @Request() req: RequestWithRoles,
    @Param('id') id: string,
  ) {
    this.logger.log(`${req.method}: ${req.url} - ${req.username}`);

    if (personnel.icsTraining === 'true' || personnel.icsTraining === true) {
      personnel.trainings = await this.personnelService.getTrainingsByNames([
        ICS_TRAINING_NAME,
      ]);
      delete personnel.icsTraining;
    } else if (
      personnel.icsTraining === 'false' ||
      personnel.icsTraining === false
    ) {
      personnel.trainings = [];
    }

    const { experiences, ...details } = personnel;

    // For now, these are distinct and will not be updated at the same time
    if (experiences) {
      return await this.personnelService.updatePersonnelExperiences(
        id,
        experiences,
        req.roles,
      );
    } else if (Object.keys(details).length > 0) {
      return await this.personnelService.updatePersonnel(
        id,
        details,
        req.roles,
      );
    } else {
      return await this.personnelService.getEmcrPersonnelById(req.roles, id);
    }
  }
}
