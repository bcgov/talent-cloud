import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { Program } from '../../auth/interface';
import { RecommitmentStatus } from '../../common/enums/recommitment-status.enum';

export class SupervisorInformationDTO {
  @ApiProperty({
    description: "Name of personnel's supervisor",
    example: 'River Cartwright',
  })
  @IsString()
  @Length(2, 50)
  firstName: string;

  @ApiProperty({
    description: "Name of personnel's supervisor",
    example: 'River Cartwright',
  })
  @IsString()
  @Length(2, 50)
  lastName: string;

  @ApiProperty({
    description: 'Supervisor phone number',
    example: '2503334444',
  })
  @Length(10, 10)
  @IsOptional()
  @ValidateIf((o) => o.phone !== '')
  phone?: string;

  @ApiProperty({
    description: "Name of personnel's supervisor",
    example: 'River Cartwright',
  })
  @IsEmail()
  @ValidateIf((o) => o.email !== '')
  @Length(2, 50)
  @IsOptional()
  email?: string;
}

export class UpdatePersonnelRecommitmentDTO {
  @ApiProperty({ name: 'year', type: 'integer' })
  year: number;

  @ApiProperty({
    name: 'program',
    type: 'enum',
    enum: Program,
    nullable: false,
  })
  program: Program;

  @ApiProperty({
    name: 'status',
    type: 'enum',
    enum: RecommitmentStatus,
    nullable: false,
  })
  status: RecommitmentStatus;

  @ApiProperty({
    description: 'member reason for declining',
    required: false,
  })
  memberReason?: string;

  @ApiProperty({
    description: 'supervisor reason for declining',
    required: false,
  })
  supervisorReason?: string;

  @ApiProperty({
    description: 'supervisor email',
    required: false,
  })
  supervisorIdir?: string;

  @ApiProperty({
    description: 'member decision date',
    required: false,
  })
  memberDecisionDate?: Date;

  @ApiProperty({
    description: 'supervisor decision date',
    required: false,
  })
  supervisorDecisionDate?: Date;
}

export class PersonnelRecommitmentDTO {
  @ApiProperty({
    type: SupervisorInformationDTO,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SupervisorInformationDTO)
  supervisorInformation?: SupervisorInformationDTO;

  @ApiProperty({
    type: UpdatePersonnelRecommitmentDTO,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdatePersonnelRecommitmentDTO)
  bcws?: UpdatePersonnelRecommitmentDTO;

  @ApiProperty({
    type: UpdatePersonnelRecommitmentDTO,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdatePersonnelRecommitmentDTO)
  emcr?: UpdatePersonnelRecommitmentDTO;
}
