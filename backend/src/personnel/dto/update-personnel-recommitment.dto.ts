import { ApiProperty } from '@nestjs/swagger';
import { Program } from '../../auth/interface';
import { RecommitmentStatus } from '../../common/enums/recommitment-status.enum';
import { IsEmail, IsString } from 'class-validator';

export class SupervisorInformationDTO {
  @ApiProperty()
  @IsEmail()
  email?: string;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  phone?: string;
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
  supervisorInformation?: SupervisorInformationDTO;

  @ApiProperty({
    type: UpdatePersonnelRecommitmentDTO,
    required: false,
  })
  bcws?: UpdatePersonnelRecommitmentDTO;

  @ApiProperty({
    type: UpdatePersonnelRecommitmentDTO,
    required: false,
  })
  emcr?: UpdatePersonnelRecommitmentDTO;
}
