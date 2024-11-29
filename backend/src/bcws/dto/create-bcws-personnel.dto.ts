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
import { CreateBcwsPersonnelRolesDTO } from './create-bcws-personnel-roles.dto';
import { Section } from '../../common/enums/bcws';
import { Status } from '../../common/enums/status.enum';
import { TravelPreference } from '../../common/enums/travel-preference.enum';

export class CreatePersonnelBcwsDTO {
  @ApiProperty({})
  @IsOptional()
  personnelId?: string;

  @ApiProperty()
  @Length(6, 6)
  employeeId: string;

  @ApiProperty()
  paylistId: string;

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
  coordinatorNotes?: string;

  @ApiProperty({
    description: 'Any other notes for this personnel',
    example: 'A Paragraph of notes',
  })
  @IsString()
  @Length(2, 1000)
  @IsOptional()
  @ValidateIf((o) => o.logisticsNotes !== '')
  logisticsNotes?: string;

  @ApiProperty({
    description: 'Date approved by coordinator',
    required: false,
  })
  @IsOptional()
  dateApproved?: Date;

  @ApiProperty({
    description: 'Date applied by personnel',
    required: false,
  })
  @IsOptional()
  dateApplied?: Date;

  @ApiProperty({
    description: 'Status of the personnel',
    enum: Status,
    example: Status.ACTIVE,
  })
  status: Status;

  @ApiProperty({ default: false })
  purchaseCardHolder: boolean;

  @ApiProperty({
    description: 'Liaison First Name',
  })
  @IsOptional()
  liaisonFirstName?: string;

  @ApiProperty({
    description: 'Liaison Last Name',
  })
  @IsOptional()
  liaisonLastName?: string;

  @ApiProperty({
    description: 'Liaison Phone Number',
  })
  @IsOptional()
  liaisonPhoneNumber?: string;

  @ApiProperty({
    description: 'Liaison Email',
  })
  @IsEmail()
  @IsOptional()
  liaisonEmail?: string;

  @ApiProperty({
    default: false,
  })
  willingnessStatement?: boolean;

  @ApiProperty({
    default: false,
  })
  parQ?: boolean;

  @ApiProperty({
    default: false,
  })
  respectfulWorkplacePolicy?: boolean;

  @ApiProperty({
    default: false,
  })
  orientation?: boolean;

  @ApiProperty({
    description: 'If this personnel is remote only',
    example: false,
  })
  @IsEnum(TravelPreference)
  travelPreference: TravelPreference;

  @ApiProperty({
    description: 'Roles and sections for the personnel',
    required: false,
  })
  @IsArray()
  @IsOptional()
  roles?: CreateBcwsPersonnelRolesDTO[];

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
  @IsOptional()
  secondChoiceSection?: Section;
}
