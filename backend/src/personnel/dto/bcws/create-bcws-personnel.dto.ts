import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
  ValidateIf,
} from 'class-validator';
import { CreateBcwsCertificationsDTO } from './create-bcws-personnel-certifications.dto';
import { CreateBcwsPersonnelLanguagesDTO } from './create-bcws-personnel-languages.dto';
import { CreateBcwsPersonnelRolesDTO } from './create-bcws-personnel-roles.dto';
import { CreateBcwsPersonnelToolsDTO } from './create-bcws-personnel-tools.dto';
import { FireCentre, Section } from '../../../common/enums/bcws';
import { Status } from '../../../common/enums/status.enum';

class BcwsLocationDTO {
  @IsOptional()
  id?: number;

  @IsString()
  locationName?: string;

  @ApiProperty({
    description: 'Ministry personnel works in',
    enum: FireCentre,
    example: FireCentre.CARIBOO,
  })
  @IsEnum(FireCentre)
  fireCentre?: FireCentre;
}

export class CreatePersonnelBcwsDTO {
  @ApiProperty({})
  @IsOptional()
  personnelId?: string;

  @ApiProperty()
  @Length(6, 6)
  employeeId: string;

  @ApiProperty()
  paylistId: string;

  @ApiProperty({
    description: "Personnel's work fire centre",
    example: {
      locationName: 'Victoria',
      fireCentre: FireCentre.CARIBOO,
    },
  })
  @IsOptional()
  @ValidateIf((o) => o.workFireCentre && o.workFireCentre?.locationName !== '')
  workFireCentre?: BcwsLocationDTO;

  @ApiProperty({
    description: "Personnel's work fire centre",
    example: {
      locationName: 'Victoria',
      fireCentre: FireCentre.CARIBOO,
    },
  })
  homeFireCentre?: BcwsLocationDTO;

  @ApiProperty()
  @IsOptional()
  approvedBySupervisor?: boolean;

  @ApiProperty({
    description: 'Any coordinator notes for this personnel',
    example: 'A Paragraph of notes',
  })
  @IsString()
  @Length(2, 1000)
  @IsOptional()
  @ValidateIf((o) => o.coordinatorNotes !== '')
  coordinatorNotes: string;

  @ApiProperty({
    description: 'Any other notes for this personnel',
    example: 'A Paragraph of notes',
  })
  @IsString()
  @Length(2, 1000)
  @IsOptional()
  @ValidateIf((o) => o.logisticsNotes !== '')
  logisticsNotes: string;

  @ApiProperty()
  @IsOptional()
  dateApproved?: Date;

  @ApiProperty()
  @IsOptional()
  dateApplied?: Date;

  @ApiProperty()
  status: Status;

  @ApiProperty({ default: false })
  purchaseCardHolder: boolean;

  @ApiProperty()
  @IsOptional()
  liaisonFirstName?: string;

  @ApiProperty()
  @IsOptional()
  liaisonLastName?: string;

  @ApiProperty()
  @IsOptional()
  liaisonPhoneNumber?: string;

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  liaisonEmail?: string;

  @ApiProperty({
    default: false,
  })
  willingnessStatement: boolean;

  @ApiProperty({
    default: false,
  })
  parQ: boolean;

  @ApiProperty({
    default: false,
  })
  respectfulWorkplacePolicy: boolean;

  @ApiProperty({
    default: false,
  })
  orientation: boolean;

  @ApiProperty({
    description: 'Tools used by the personnel',
    required: false,
  })
  @IsArray()
  tools: CreateBcwsPersonnelToolsDTO[];

  @ApiProperty({
    description: 'Languages spoken by the personnel',
    required: false,
  })
  @IsArray()
  languages: CreateBcwsPersonnelLanguagesDTO[];

  @ApiProperty({
    description: 'Roles and sections for the personnel',
    required: false,
  })
  @IsArray()
  roles: CreateBcwsPersonnelRolesDTO[];

  @ApiProperty({
    description: 'Certifications for the personnel',
    required: false,
  })
  @IsArray()
  certifications: CreateBcwsCertificationsDTO[];

  @ApiProperty({
    description: 'Division and Ministry',
    required: false,
  })
  division: number;

  @ApiProperty({
    description: 'First Choice Section',
    required: false,
    enum: Section,
    example: Section.AVIATION,
  })
  firstChoiceSection: Section;

  @ApiProperty({
    description: 'Second Choice Section',
    required: false,
    enum: Section,
    example: Section.LOGISTICS,
  })
  secondChoiceSection: Section;
}
