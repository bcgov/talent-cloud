import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
  ValidateIf,
} from 'class-validator';
import { AvailabilityType } from '../../common/enums';
import { Classification } from '../../common/enums/classification.enum';
import { Ministry } from '../../common/enums/ministry.enum';
import { Region } from '../../common/enums/region.enum';
import { AvailabilityEntity } from '../../database/entities/availability.entity';
import { ExperienceEntity } from '../../database/entities/personnel-function-experience.entity';
import { TrainingEntity } from '../../database/entities/training.entity';

class PersonnelLocationDTO {
  @IsString()
  locationName: string;

  @ApiProperty({
    description: 'Ministry personnel works in',
    enum: Region,
    example: Region.SWE,
  })
  @IsEnum(Region)
  region: Region;
}

export class CreatePersonnelDTO {
  @ApiProperty({
    description: 'First Name of Personnel - Possibly taken from IDIR',
    example: 'Jane',
  })
  @IsString()
  @Length(2, 50)
  firstName: string;

  @ApiProperty({
    description: 'Last Name of Personnel - Possibly taken from IDIR',
    example: 'Doe',
  })
  @IsString()
  @Length(2, 50)
  lastName: string;

  @ApiProperty({
    description: "Personnel's work location",
    example: {
      locationName: 'Victoria',
      region: Region.SWE,
    },
  })
  workLocation: PersonnelLocationDTO;

  @ApiProperty({
    description: "Personnel's home location",
    example: {
      locationName: 'Victoria',
      region: Region.SWE,
    },
  })
  @IsOptional()
  homeLocation: PersonnelLocationDTO;

  @ApiProperty({
    description: 'Ministry personnel works in',
    enum: Ministry,
    example: Ministry.EMCR,
  })
  @IsEnum(Ministry)
  ministry: Ministry;

  @ApiProperty({
    description: 'Primary phone number to contact personnel',
    example: '2501112222',
  })
  @IsAlphanumeric()
  @Length(10, 10)
  primaryPhone: string;

  @ApiProperty({
    description: 'Secondary phone number to contact personnel',
    example: '2503334444',
  })
  @IsAlphanumeric()
  @Length(10, 10)
  @IsOptional()
  @ValidateIf((o) => o.secondaryPhone !== '')
  secondaryPhone?: string;

  @ApiProperty({
    description: 'Any other phone number to contact personnel',
    example: '2505556666',
  })
  @IsAlphanumeric()
  @IsOptional()
  @Length(10, 10)
  @ValidateIf((o) => o.otherPhone !== '')
  workPhone?: string;

  @ApiProperty({
    description:
      'Email address with which to contact participant - possibly the one attached to their IDIR',
    example: 'janedoe123@gov.bc.ca',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "Name of personnel's supervisor",
    example: 'River Cartwright',
  })
  @IsString()
  @Length(2, 50)
  supervisor: string;

  @ApiProperty({
    description: 'Any notable skills and abilities this personnel might have',
    example: 'Indigenous Relations trained, Swift Water Training',
  })
  @IsString()
  @Length(2, 50)
  @IsOptional()
  skillsAbilities: string;

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
    description: 'Classification of personnel',
    enum: Classification,
    example: Classification.BCGEU,
  })
  @IsEnum(Classification)
  @IsOptional()
  classification: Classification;

  @ApiProperty({
    description: 'If this personnel is remote only',
    example: false,
  })
  @IsBoolean()
  remoteOnly: boolean;

  @ApiProperty({
    description: 'If this personnel is willing to travel',
    example: false,
  })
  @IsBoolean()
  willingToTravel: boolean;

  @ApiProperty({
    description: 'What trainings this personnel has had',
    example: ['ICS100', 'THE_CORE', 'WEBEOC'],
  })
  @IsOptional()
  trainings: TrainingEntity[];

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
  experiences?: ExperienceEntity[];

  @ApiProperty({
    description: 'An array of availability for this personnel',
    example: [
      {
        date: '2021-03-01',
        availabilityType: AvailabilityType.AVAILABLE,
      },
      {
        date: '2021-03-02',
        availabilityType: AvailabilityType.DEPLOYED,
        deploymentCode: '123456',
      },
    ],
  })
  @IsOptional()
  availability?: AvailabilityEntity[];
}
