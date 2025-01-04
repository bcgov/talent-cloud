import { ApiProperty } from '@nestjs/swagger';
import { Program } from '../../auth/interface';
import { RecommitmentStatus } from '../../common/enums/recommitment-status.enum';

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
    description: 'supervisor reason for updating emcr',
    required: false,
  })
  reason?: string;
}

export class PersonnelRecommitmentDTO {
  bcws?: UpdatePersonnelRecommitmentDTO;
  emcr?: UpdatePersonnelRecommitmentDTO;
}
