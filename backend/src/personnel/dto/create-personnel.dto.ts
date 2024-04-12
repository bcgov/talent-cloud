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
import { PersonnelExperienceDTO } from './personnel-experiences.dto';
import { AvailabilityType, Status } from '../../common/enums';
import { Ministry } from '../../common/enums/ministry.enum';
import { Region } from '../../common/enums/region.enum';
import { UnionMembership } from '../../common/enums/union-membership.enum';
import { AvailabilityEntity } from '../../database/entities/availability.entity';
import { Form } from '../../database/entities/form.entity';
import { TrainingEntity } from '../../database/entities/training.entity';

class PersonnelLocationDTO {
  @IsOptional()
  id?: number;

  @IsString()
  locationName?: string;

  @ApiProperty({
    description: 'Ministry personnel works in',
    enum: Region,
    example: Region.SWE,
  })
  @IsEnum(Region)
  region?: Region;
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
  @IsOptional()
  @ValidateIf((o) => o.workLocation && o.workLocation?.locationName !== '')
  workLocation?: PersonnelLocationDTO;

  @ApiProperty({
    description: "Personnel's home location",
    example: {
      locationName: 'Victoria',
      region: Region.SWE,
    },
  })
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
  @ValidateIf((o) => o.workPhone !== '')
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
  supervisorFirstName: string;

  @ApiProperty({
    description: "Name of personnel's supervisor",
    example: 'River Cartwright',
  })
  @IsString()
  @Length(2, 50)
  supervisorLastName: string;

  @ApiProperty({
    description: "Name of personnel's supervisor",
    example: 'River Cartwright',
  })
  @IsEmail()
  @ValidateIf((o) => o.supervisorEmail !== '')
  @Length(2, 50)
  @IsOptional()
  supervisorEmail?: string;

  @ApiProperty()
  @IsOptional()
  approvedBySupervisor?: boolean;

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
    description: 'UnionMembership of personnel',
    enum: UnionMembership,
    example: UnionMembership.BCGEU,
  })
  @IsEnum(UnionMembership)
  @IsOptional()
  unionMembership: UnionMembership;

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
    example: ['ICS Training', 'THE_CORE', 'WEBEOC'],
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
  experiences?: PersonnelExperienceDTO[];

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

  @ApiProperty({
    description: 'Job Title',
  })
  @IsOptional()
  jobTitle?: string;

  @ApiProperty({
    description: 'Driver License',
  })
  @IsOptional()
  driverLicense?: string;

  @ApiProperty({
    description: 'First Aid Level',
  })
  @IsOptional()
  firstAidLevel?: string;

  @ApiProperty({
    description: 'First Aid Expiry',
  })
  @IsOptional()
  firstAidExpiry?: string;

  @ApiProperty({
    description: 'Psychological First Aid',
  })
  @IsOptional()
  psychologicalFirstAid?: boolean;

  @ApiProperty()
  @IsOptional()
  intakeForm?: Form;

  @ApiProperty()
  @IsOptional()
  dateJoined?: string;

  @ApiProperty()
  @IsOptional()
  applicationDate?: string;

  @ApiProperty()
  @IsOptional()
  status?: Status;

  @ApiProperty()
  @IsOptional()
  icsTraining?: boolean = false;
}
