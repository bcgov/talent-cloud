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

import {  CreatePersonnelBcwsDTO } from './bcws';
import { CreatePersonnelEmcrDTO } from './emcr';
import { FireCentre, Ministry, Region } from '../../common/enums';
import { AvailabilityType } from '../../common/enums/availability-type.enum';
import { UnionMembership } from '../../common/enums/union-membership.enum';
import { AvailabilityEntity } from '../../database/entities/availability.entity';
import { Form } from '../../database/entities/form.entity';

export class LocationDTO {
  @ApiProperty()
  id?: number;
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
    description: "Personnel's work fire centre",
    example: {
      locationName: 'Victoria',
      fireCentre: FireCentre.CARIBOO,
    },
  })
  @IsOptional()
  @ValidateIf((o) => o.workFireCentre && o.workFireCentre?.locationName !== '')
  workLocation?: LocationDTO;

  @ApiProperty({
    description: "Personnel's work fire centre",
    example: {
      locationName: 'Victoria',
      fireCentre: FireCentre.CARIBOO,
      region: Region.SWE,
    },
  })
  homeLocation?: LocationDTO;
  
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
    description: 'Supervisor phone number',
    example: '2503334444',
  })
  @IsAlphanumeric()
  @Length(10, 10)
  @IsOptional()
  @ValidateIf((o) => o.supervisorPhone !== '')
  supervisorPhone?: string;

  @ApiProperty({
    description: "Name of personnel's supervisor",
    example: 'River Cartwright',
  })
  @IsEmail()
  @ValidateIf((o) => o.supervisorEmail !== '')
  @Length(2, 50)
  @IsOptional()
  supervisorEmail?: string;

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
    description: 'Job Title',
  })
  @IsOptional()
  jobTitle?: string;

  @ApiProperty({
    description: 'Driver License',
  })
  @IsOptional()
  driverLicense?: string[];

  @ApiProperty()
  @IsOptional()
  intakeForm?: number;

  @ApiProperty({
    enum: Ministry,
    example: Ministry.AGRI,
  })
  ministry: Ministry;


  @ApiProperty({
    description: 'Division',
    required: false,
  })
  division?: string;

  @IsOptional()
  emcr?: CreatePersonnelEmcrDTO;

  @IsOptional()
  bcws?: CreatePersonnelBcwsDTO
}
