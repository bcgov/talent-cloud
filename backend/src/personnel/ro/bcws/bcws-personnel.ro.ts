import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { BcwsPersonnelCertificationRO } from './bcws-personnel-certitifications.ro';
import { BcwsPersonnelLanguagesRO } from './bcws-personnel-languages.ro';
import { BcwsLocationRO } from './bcws-personnel-location.ro';
import { BcwsPersonnelRoleRO } from './bcws-personnel-roles.ro';
import { BcwsPersonnelToolsRO } from './bcws-personnel-tools.ro';
import { PersonnelRO } from '../personnel.ro';
import { BcwsRole, OFA } from '../../../common/enums/bcws';
import { Status } from '../../../common/enums/status.enum';

export class BcwsRO extends PersonnelRO {
  @ApiProperty({
    description: 'Personnel ID',
    example: '123456',
  })
  personnelId: string;

  @ApiProperty({
    description: "Personnel's work firecentre and location",
    required: true,
    example: {
      id: 1,
      locationName: 'Victoria',
      fireCentre: 'COASTAL',
    },
  })
  homeFireCentre: BcwsLocationRO;

  @ApiProperty({
    description: "Personnel's work firecentre and location",

    example: {
      id: 1,
      locationName: 'Victoria',
      fireCentre: 'COASTAL',
    },
  })
  @IsOptional()
  workFireCentre?: BcwsLocationRO;

  @ApiProperty({
    description: 'Date applied',
    example: '2021-10-10',
    type: Date,
  })
  @IsOptional()
  dateApplied?: Date;

  @ApiProperty({
    description: 'Date approved',
    example: '2021-10-10',
    type: Date,
  })
  @IsOptional()
  dateApproved?: Date;

  @ApiProperty({
    type: 'enum',
    enum: Status,
    description: 'Status of personnel',
    example: Status.ACTIVE,
    enumName: 'status',
  })
  status: Status;

  @ApiProperty({
    description: 'New member',
    example: true,
  })
  newMember: boolean;

  @ApiProperty({
    description: 'Purchase card holder',
    example: true,
  })
  purchaseCardHolder: boolean;

  @ApiProperty({
    description: "Liaison's first name",
    example: 'John',
    required: false,
  })
  @IsOptional()
  liaisonFirstName?: string;

  @ApiProperty({
    description: "Liaison's last name",
    example: 'Doe',
    required: false,
  })
  @IsOptional()
  liaisonLastName?: string;

  @ApiProperty({
    description: "Liaison's phone number",
    example: '250-123-4567',
    required: false,
  })
  @IsOptional()
  liaisonPhoneNumber?: string;

  @ApiProperty({
    description: "Liaison's email",
    example: 'liasion@gov.bc.cq',
    required: false,
  })
  @IsOptional()
  liaisonEmail?: string;

  @ApiProperty({
    description: 'Willingness statement',
    example: true,
  })
  willingnessStatement: boolean;

  @ApiProperty({
    description: 'ParQ',
    example: true,
  })
  parQ: boolean;

  @ApiProperty({
    description: 'Respectful workplace policy',
    example: true,
  })
  respectfulWorkplacePolicy: boolean;

  @ApiProperty({
    description: 'Orientation',
    example: true,
  })
  orientation: boolean;

  @ApiProperty({
    description: 'OFA Level',
    example: OFA.OFA_I,
    required: false,
  })
  @IsOptional()
  highestOFA?: OFA;

  @ApiProperty({
    description: 'OFA Expiry',
    example: '2021-10-10',
    required: false,
  })
  @IsOptional()
  ofaExpiryDate: Date;

  @ApiProperty({
    description: 'Food safety level I',
    example: true,
  })
  foodSafetyLevelI: boolean;

  @ApiProperty({
    description: 'Food safety level I expiry',
    example: '2021-10-10',
    required: false,
  })
  @IsOptional()
  foodSafetyCertificationLevelIExpiry?: Date;

  @ApiProperty({
    description: 'Food safety level II',
    example: true,
  })
  foodSafetyLevelII: boolean;

  @ApiProperty({
    description: 'Food safety level II expiry',
    example: '2021-10-10',
    required: false,
  })
  @IsOptional()
  foodSafetyCertificationLevelIIExpiry?: Date;

  @ApiProperty({
    description: 'Second choice role',
    type: 'enum',
    enum: BcwsRole,
    example: BcwsRole.ACCOUNTS_PAYABLE,
  })
  secondChoiceRole: BcwsRole;

  @ApiProperty({
    description: 'First choice role',
    type: 'enum',
    enum: BcwsRole,
    example: BcwsRole.ACCOUNTS_PAYABLE,
  })
  firstChoiceRole: BcwsRole;

  //TODO: Add the following properties
  @ApiProperty()
  tools?: BcwsPersonnelToolsRO;

  @ApiProperty()
  certifications?: BcwsPersonnelCertificationRO;

  @ApiProperty()
  languages?: BcwsPersonnelLanguagesRO;

  @ApiProperty()
  roles?: BcwsPersonnelRoleRO;
}
