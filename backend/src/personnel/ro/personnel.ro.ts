import { ApiProperty } from "@nestjs/swagger";
import { ExperienceRO } from "./experience.ro";
import { Classification, Ministry, Region, WorkLocation } from "../../common/enums";

export class PersonnelRO {
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
    description: 'Other phone number of personnel',
    required: false,
    example: '(250)882-5656',
  })
  otherPhone: string;

  @ApiProperty({
    description: 'Personnel\'s region',
    required: true,
    example: Region.SWE,
  })
  region: Region;

  @ApiProperty({
    description: 'Personnel\'s work location',
    required: true,
    example: WorkLocation.ABBOTSFORD,
  })
  workLocation: WorkLocation;

  @ApiProperty({
    description: 'Personnel\'s ministry',
    required: true,
    example: Ministry.CITZ,
  })
  ministry: Ministry;

  @ApiProperty({
    description: 'Personnel\'s classification',
    required: true,
    example: Classification.BCGEU,
  })
  classification: Classification;

  @ApiProperty({
    description: 'Date personnel applied',
    required: true,
    example: new Date(),
  })
  applicationDate: Date;

  @ApiProperty({
    description: 'Personnel\'s noted skills and abilities',
    required: false,
    example: 'IT experience',
  })
  skillsAbilities: string;

  @ApiProperty({
    description: 'Notes about Personnel',
    required: false,
    example: 'MOTI Area Roads Mgr R24',
  })
  notes: string;

  @ApiProperty({
    description: 'Supervisor of Personnel',
    required: true,
    example: 'Fred Andrews',
  })
  supervisor: string;

  @ApiProperty({
    description: 'Is Personnel active in the roster',
    required: true,
    example: true,
  })
  active: boolean;

  @ApiProperty({
    description: 'Is Personnel remote only',
    required: true,
    example: false,
  })
  remoteOnly: boolean;

  @ApiProperty({
    description: 'Is Personnel willing to travel',
    required: true,
    example: true,
  })
  willingToTravel: boolean;

  @ApiProperty({
    description: 'Experience with functions',
    required: true,
    isArray: true,
    type: () => ExperienceRO,
  })
  experiences: ExperienceRO[];
}