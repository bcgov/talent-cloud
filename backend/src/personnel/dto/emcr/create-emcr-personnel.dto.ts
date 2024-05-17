import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsOptional,
  IsString,
  Length,
  ValidateIf,
} from 'class-validator';

import { EmcrPersonnelExperienceDTO } from './experiences.dto';

import { Region } from '../../../common/enums/emcr';
import { Status } from '../../../common/enums/status.enum';
import { EmcrTrainingEntity } from '../../../database/entities/emcr/emcr-training.entity';
import { LocationEntity } from '../../../database/entities/location.entity';

export class EmcrLocationDTO {
  @IsOptional()
  @ApiProperty()
  id?: number;

  @IsString()
  @ApiProperty()
  locationName?: string;

  @ApiProperty({
    description: 'Ministry personnel works in',
    enum: Region,
    example: Region.SWE,
  })
  @IsEnum(Region)
  region: Region
}

export class CreatePersonnelEmcrDTO {
  @ApiProperty({})
  @IsOptional()
  personnelId?: string;

  @ApiProperty({
    description: "Personnel's work location",
    example: {
      locationName: 'Victoria',
      region: Region.SWE,
    },
  })
  @IsOptional()
  @ValidateIf((o) => o.workLocation && o.workLocation?.locationName !== '')
  workLocation?: EmcrLocationDTO;

  @ApiProperty({
    description: "Personnel's home location",
    example: {
      locationName: 'Victoria',
      region: Region.SWE,
    },
  })
  homeLocation: EmcrLocationDTO;

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

  @ApiProperty({
    description: 'What trainings this personnel has had',
    example: ['ICS Training', 'THE_CORE', 'WEBEOC'],
  })
  @IsOptional()
  trainings: EmcrTrainingEntity[];

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
  icsTraining?: boolean;

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
