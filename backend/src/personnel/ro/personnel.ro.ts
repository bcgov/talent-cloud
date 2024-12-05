import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { AvailabilityRO } from './availability.ro';
import { PersonnelCertificationRO } from './personnel-certitifications.ro';
import { PersonnelLanguagesRO } from './personnel-languages.ro';
import { PersonnelToolsRO } from './personnel-tools.ro';
import { RecommitmentRO } from './recommitment.ro';
import { BcwsRO } from '../../bcws/ro';
import { Ministry } from '../../common/enums/ministry.enum';
import { TravelPreference } from '../../common/enums/travel-preference.enum';
import { UnionMembership } from '../../common/enums/union-membership.enum';
import { EmcrRO } from '../../emcr/ro';
import { LocationRO } from '../../region-location/region-location.ro';

export class PersonnelRO {
  @ApiProperty({
    description: "Personnel's work region and location",
    required: false,
    example: {
      id: 1,
      locationName: 'Victoria',
      region: 'SWE',
      fireCentre: 'CARIBOO',
    },
  })
  workLocation?: LocationRO;

  @ApiProperty({
    description: "Personnel's home region and location",
    required: true,
    example: {
      id: 1,
      locationName: 'Victoria',
      regionName: 'SWE',
      fireCentre: 'CARIBOO',
    },
  })
  homeLocation: LocationRO;
  @ApiProperty({
    description: 'Personnel id',
    required: true,
    example: '0594f370-46ef-449d-b559-a3fd62ba3f3e',
  })
  id: string;

  @ApiProperty({
    description: 'First name of personnel',
    required: true,
    example: 'Archie',
  })
  firstName: string;

  @ApiProperty({
    description: 'Last name of personnel',
    required: true,
    example: 'Andrews',
  })
  lastName: string;

  @ApiProperty({
    description: 'Email of personnel',
    required: true,
    example: 'aandrews@gov.bc.ca',
  })
  email: string;

  @ApiProperty({
    description: 'Primary phone number of personnel',
    required: true,
    example: '(250)888-1212',
  })
  primaryPhone: string;

  @ApiProperty({
    description: 'Secondary phone number of personnel',
    required: false,
    example: '(250)881-3434',
  })
  secondaryPhone: string;

  @ApiProperty({
    description: 'Work phone number of personnel',
    required: false,
    example: '(250)882-5656',
  })
  workPhone: string;

  @ApiProperty({
    description: "Personnel's ministry",
    required: true,
    example: Ministry.CITZ,
  })
  ministry: Ministry;

  @ApiProperty({
    description: "Personnel's unionMembership",
    required: true,
    example: UnionMembership.BCGEU,
  })
  unionMembership: UnionMembership;

  @ApiProperty({
    description: 'Supervisor of Personnel First Name',
    required: true,
    example: 'Fred',
  })
  supervisorFirstName: string;

  @ApiProperty({
    description: 'Supervisor phone',
    required: false,
  })
  supervisorPhone?: string;

  @ApiProperty({
    description: 'Supervisor of Personnel Last Name',
    required: true,
    example: 'Andrews',
  })
  supervisorLastName: string;

  @ApiProperty({
    description: 'Supervisor of Personnel Email',
    required: false,
    example: 'fandrews@gov.bc.ca',
  })
  supervisorEmail: string;

  @ApiProperty({
    description: 'Travel preference',
    required: true,
    example: TravelPreference.WILLING_TO_TRAVEL_REGION,
  })
  travelPreference: TravelPreference;

  @ApiProperty({
    description: 'Availability',
    isArray: true,
    type: () => AvailabilityRO,
    required: false,
  })
  availability?: AvailabilityRO[];

  @ApiProperty({
    description: 'Driver Licenses',
    required: false,
  })
  driverLicense?: string[];

  @ApiProperty({
    description: 'Division',
    required: false,
  })
  division?: string;

  @ApiProperty({
    description: 'Recommitment',
    required: false,
  })
  recommitment: RecommitmentRO;

  //TODO: Add the following properties
  @ApiProperty()
  tools?: PersonnelToolsRO[];

  @ApiProperty()
  certifications?: PersonnelCertificationRO[];

  @ApiProperty()
  languages?: PersonnelLanguagesRO[];

  @ApiProperty({
    description: 'Emergency Contact First Name',
    required: false,
  })
  emergencyContactFirstName: string;

  @ApiProperty({
    description: 'Emergency Contact Last Name',
    required: false,
  })
  emergencyContactLastName: string;

  @ApiProperty({
    description: 'Emergency Contact Phone Number',
    required: false,
  })
  emergencyContactPhoneNumber: string;

  @ApiProperty({
    description: 'Employee ID',
    required: false,
  })
  employeeId?: string;

  @ApiProperty({
    description: 'Paylist ID',
    required: false,
  })
  paylistId?: string;

  @ApiProperty()
  @Expose({ groups: ['emcr', 'member'] })
  emcr?: EmcrRO;

  @ApiProperty()
  @Expose({ groups: ['bcws', 'member'] })
  bcws?: BcwsRO;
}
