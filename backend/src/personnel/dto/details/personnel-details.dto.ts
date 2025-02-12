import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsAlphanumeric,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Length,
  ValidateIf,
} from 'class-validator';
import {
  DriverLicense,
  FireCentre,
  Region,
  UnionMembership,
} from '../../../common/enums';
import { AvailabilityType } from '../../../common/enums/availability-type.enum';
import { AvailabilityEntity } from '../../../database/entities/personnel/availability.entity';

export class LocationDTO {
  @ApiProperty()
  id?: number;
  fireCentre?: FireCentre;
  locationName?: string;
  region?: Region;
}

export class PersonnelDetailsDTO {
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
    description: 'Driver License',
  })
  @IsOptional()
  driverLicense?: DriverLicense[];
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
    description: 'Job Title',
  })
  @IsOptional()
  jobTitle?: string;

  @ApiProperty({
    description: 'UnionMembership of personnel',
    enum: UnionMembership,
    example: UnionMembership.BCGEU,
  })
  @IsEnum(UnionMembership)
  @IsOptional()
  unionMembership: UnionMembership;

  @ApiProperty({
    description: 'An array of availability for this personnel',
    example: [
      {
        date: '2021-03-01',
        availabilityType: AvailabilityType.UNAVAILABLE,
      },
      {
        date: '2021-03-02',
        availabilityType: AvailabilityType.DEPLOYED,
        deploymentCode: '123456',
      },
    ],
  })
  @IsOptional()
  @Type(() => AvailabilityEntity)
  availability?: AvailabilityEntity[];
}
