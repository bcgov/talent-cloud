import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { BcwsPersonnelRoleRO } from './bcws-personnel-roles.ro';

import { Section } from '../../common/enums/bcws';
import { Status } from '../../common/enums/status.enum';

export class BcwsRO {
  @ApiProperty({
    description: 'Personnel ID',
    example: '123456',
  })
  personnelId: string;

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

  @ApiProperty()
  roles?: BcwsPersonnelRoleRO;

  @ApiProperty()
  firstChoiceSection?: Section;

  @ApiProperty()
  secondChoiceSection?: Section;

  @ApiProperty()
  thirdChoiceSection?: Section;

  @ApiProperty({
    description: 'Notes about Personnel - Only vieweable by coordinators',
    required: false,
    example: 'MOTI Area Roads Mgr R24',
  })
  @Expose({ groups: ['coordinator'] })
  coordinatorNotes: string;

  @ApiProperty({
    description: 'Notes about Personnel',
    required: false,
    example: 'MOTI Area Roads Mgr R24',
  })
  logisticsNotes: string;
}
