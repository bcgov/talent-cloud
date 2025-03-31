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
  StreamableFile,
  UsePipes,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiProduces,
} from '@nestjs/swagger';
import { json2csv } from 'json-2-csv';
import { UpdateResult } from 'typeorm';
import { Readable } from 'stream';
import { GetEmcrPersonnelDTO, UpdateEmcrPersonnelDTO } from './dto';
import { EmcrService } from './emcr.service';
import { EmcrRO } from './ro';
import { Program, RequestWithRoles, Role } from '../auth/interface';
import { Programs } from '../auth/program.decorator';
import { Public } from '../auth/public.decorator';
import { EmcrCsvHeaders } from '../common/enums';
import { PersonnelEntity } from '../database/entities/personnel/personnel.entity';
import { AppLogger } from '../logger/logger.service';
import { GetPersonnelRO, UpdatePersonnelDTO } from '../personnel';
import { UpdateSkillsDTO } from '../personnel/dto/skills/update-personnel-skills.dto';
import { PersonnelService } from '../personnel/personnel.service';
import { QueryTransformPipe } from '../query-validation.pipe';
import { EmcrUpdateAdapter } from './dto/helpers';
import { UpdateEmcrExperiencesDTO } from './dto/update-emcr-experiences.dto';
import { Roles } from '../auth/roles.decorator';
import { EmcrPersonnelEntity } from '../database/entities/emcr';

@Controller('emcr')
@ApiTags('EMCR Personnel API')
export class EmcrController {
  constructor(
    @Inject(EmcrService)
    private readonly emcrService: EmcrService,
    @Inject(PersonnelService)
    private readonly personnelService: PersonnelService,
    private readonly logger: AppLogger,
  ) {}

  @ApiOperation({
    summary: 'Coordinator/Logistics Get EMCR Personnel Endpoint',
    description: 'Returns the personnel data to the dashboard view',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetPersonnelRO,
  })
  @Programs(Program.EMCR)
  @Roles(Role.COORDINATOR, Role.LOGISTICS)
  @Get()
  @UsePipes(new QueryTransformPipe())
  async getEmcrPersonnel(
    @Request() req: RequestWithRoles,
    @Query() query?: GetEmcrPersonnelDTO,
  ): Promise<GetPersonnelRO> {
    this.logger.log(`${req.method}: ${req.url} - ${req.username}`);

    const { personnel, count } = await this.emcrService.getEmcrPersonnel(query);

    return {
      personnel: personnel.map((itm) => itm.toResponseObject(req.roles)),
      count,
      rows: query.rows,
      page: query.page,
    };
  }

  @ApiOperation({
    summary: 'Download EMCR Personnel CSV Endpoint',
    description: 'Returns a CSV file with all listed EMCR personnel',
  })
  @ApiResponse({
    type: StreamableFile,
    status: HttpStatus.OK,
  })
  @ApiProduces('text/csv')
  //@Programs(Program.EMCR)
  //@Roles(Role.COORDINATOR)
  @Public()
  @Get('/export-test')
  async exportEmcrPersonnelToCSV(): Promise<StreamableFile> {
    this.logger.log('Getting personnel');
    const csvRawData = await this.emcrService.getEmcrPersonnelforCSV();
    this.logger.log('Exporting');
    //convert input data to CSV format and prettify headers
    const csvConverted = json2csv(csvRawData, {
      keys: EmcrCsvHeaders,
      useLocaleFormat: true,
    });

    const csvStream = Readable.from(csvConverted);

    return new StreamableFile(csvStream, {
      type: 'text/csv',
      disposition: 'attachment; filename="EMCR_Personnel_Details.csv"',
    });
  }

  @ApiOperation({
    summary: 'Download endpoint take 200',
    description: 'Download endpoint take 200',
  })
  @ApiResponse({
    type: StreamableFile,
    status: HttpStatus.OK,
  })
  @Public()
  @Get('/export-test-take')
  async exportSomePersonnel(): Promise<EmcrPersonnelEntity[]> {
    return this.emcrService.getEmcrPersonnelTake();
  }

  @ApiOperation({
    summary: 'Download endpoint raw query',
    description: 'Download endpoint raw query',
  })
  @ApiResponse({
    type: StreamableFile,
    status: HttpStatus.OK,
  })
  @Public()
  @Get('/export-test-raw')
  async exportRawQueryPersonnel(): Promise<EmcrPersonnelEntity[]> {
    return this.emcrService.getEmcrPersonnelRaw();
  }

  @ApiOperation({
    summary: 'Download endpoint split relations',
    description: 'Download endpoint split relations',
  })
  @ApiResponse({
    type: StreamableFile,
    status: HttpStatus.OK,
  })
  @Public()
  @Get('/export-test-raw')
  async exportPersonnelSplitRelations(): Promise<EmcrPersonnelEntity[]> {
    return this.emcrService.getEmcrPersonnelMinimalRelations();
  }

  @ApiOperation({
    summary: 'Coordinator/Logistics Get EMCR Personnel By ID Endpoint',
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
      await this.emcrService.getEmcrPersonnelById(req.roles, id);

    return personnelRO;
  }

  @ApiOperation({
    summary: 'Coordinator Update Emcr Personnel Endpoint',
    description: 'Coordinator endpoint to update EMCR personnel data',
  })
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
  })
  @Programs(Program.EMCR)
  @Roles(Role.COORDINATOR, Role.LOGISTICS)
  @Patch(':id')
  async updatePersonnel(
    @Body() personnel: UpdateEmcrPersonnelDTO & UpdatePersonnelDTO,
    @Request() req: RequestWithRoles,
    @Param('id') id: string,
  ): Promise<UpdateResult> {
    this.logger.log(`${req.method}: ${req.url} - ${req.username}`);

    const person = new EmcrUpdateAdapter(personnel);

    if (personnel.trainings) {
      await this.emcrService.updateTraining(personnel.trainings, id);
    }

    await this.emcrService.updateEmcrPersonnel(person.emcr, id);

    return await this.personnelService.updatePersonnelDetails(
      person.details,
      id,
    );
  }

  @ApiOperation({
    summary: 'Coordinator/Logistics Update Emcr Personnel Experiences',
    description: 'Coordinator/logistics endpoint to update emcr experiences',
  })
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
  })
  @Roles(Role.COORDINATOR, Role.LOGISTICS)
  @Programs(Program.EMCR)
  @Patch(':id/experiences')
  async updatePersonnelExperiences(
    @Body() experiences: UpdateEmcrExperiencesDTO[],
    @Request() req: RequestWithRoles,
    @Param('id') id: string,
  ) {
    this.logger.log(`${req.method}: ${req.url} - ${req.username}`);

    return await this.emcrService.updatePersonnelExperiences(id, experiences);
  }

  @ApiOperation({
    summary: 'Coordinator/Logistics Update  Skills',
    description: 'Coordinator/logistics endpoint to update personnel skills',
  })
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
  })
  @Programs(Program.EMCR)
  @Roles(Role.COORDINATOR, Role.LOGISTICS)
  @Patch(':id/skills')
  async updatePersonnelSkills(
    @Body() personnel: UpdateSkillsDTO,
    @Request() req: RequestWithRoles,
    @Param('id') id: string,
  ): Promise<PersonnelEntity> {
    this.logger.log(`${req.method}: ${req.url} - ${req.username}`);

    return await this.personnelService.updatePersonnelSkills(personnel, id);
  }
}
