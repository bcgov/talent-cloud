import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsEnum,
  IsOptional,
  IsString,
  Length,
  ValidateIf,
} from 'class-validator';
import { EmcrPersonnelExperienceDTO } from './experiences.dto';
import { Status } from '../../common/enums/status.enum';
import { TravelPreference } from '../../common/enums/travel-preference.enum';
import { EmcrTrainingEntity } from '../../database/entities/emcr/emcr-training.entity';

export class CreatePersonnelEmcrDTO {
  @ApiProperty({})
  @IsOptional()
  personnelId?: string;

  @ApiProperty()
  @IsOptional()
  @Transform(({ value }) => Boolean(value))
  approvedBySupervisor?: boolean;

  @IsOptional()
  @ApiProperty({
    description: 'First Choice Section',
    required: false,
  })
  firstChoiceSection?: string;

  @IsOptional()
  @ApiProperty({
    description: 'Second Choice Section',
    required: false,
  })
  @IsOptional()
  secondChoiceSection?: string;

  @IsOptional()
  @ApiProperty({
    description: 'Third Choice Section',
    required: false,
  })
  @IsOptional()
  thirdChoiceSection?: string;

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
    description: 'If this personnel is remote only',
    example: false,
  })
  @IsEnum(TravelPreference)
  travelPreference: TravelPreference;

  @ApiProperty({
    description: 'What trainings this personnel has had',
    example: ['ICS Training', 'THE_CORE', 'WEBEOC'],
  })
  @IsOptional()
  trainings: Partial<EmcrTrainingEntity>[];

  @ApiProperty({
    description: 'Experiences this personnel has had in specific functions',
    example: [
      {
        function: 'OPS',
        experience: 'CHIEF',
      },
      {
        function: 'LOGS',
        experience: 'CHIEF',
      },
      {
        function: 'PLANS',
        experience: 'INTERESTED',
      },
    ],
  })
  @IsOptional()
  @Type(() => EmcrPersonnelExperienceDTO)
  experiences?: EmcrPersonnelExperienceDTO[];

  @ApiProperty({
    description: 'First Nation Experience Living',
  })
  @IsOptional()
  firstNationExperienceLiving?: boolean;

  @ApiProperty({
    description: 'First Nation Experience Working',
  })
  @IsOptional()
  firstNationExperienceWorking?: boolean;

  @ApiProperty({
    description: 'PECC Experience',
  })
  @IsOptional()
  peccExperience?: boolean;

  @ApiProperty({
    description: 'PREOC Experience',
  })
  @IsOptional()
  preocExperience?: boolean;

  @ApiProperty({
    description: 'Emergency Experience',
  })
  @IsOptional()
  emergencyExperience?: boolean;

  @ApiProperty()
  @IsOptional()
  dateApproved?: Date;

  @ApiProperty()
  @IsOptional()
  dateApplied?: Date;

  @ApiProperty()
  @IsOptional()
  status?: Status;

  @ApiProperty()
  @IsOptional()
  icsTraining?: boolean | string;

  @ApiProperty({
    description: 'First Aid Level',
  })
  @IsOptional()
  firstAidLevel?: string;

  @ApiProperty({
    description: 'First Aid Expiry',
  })
  @IsOptional()
  firstAidExpiry?: Date;

  @ApiProperty({
    description: 'Psychological First Aid',
  })
  @IsOptional()
  psychologicalFirstAid?: boolean;
}
