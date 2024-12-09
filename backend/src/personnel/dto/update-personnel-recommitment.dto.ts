import { ApiProperty } from "@nestjs/swagger";
import { RecommitmentStatus } from "../../common/enums/recommitment-status.enum";

export class UpdatePersonnelRecommitmentDTO{
  @ApiProperty({
    description: 'personnel id',
    required: true,
  })
  memberId: string;

  @ApiProperty({
    description: 'Supervisor idir',
    required: true,
  })
  supervisorIdir: string;

  @ApiProperty({ name: 'year', type: 'integer' })
  recommitmentCycleId: number;

  @ApiProperty({
    name: 'emcr',
    type: 'enum',
    enum: RecommitmentStatus,
    nullable: true,
  })
  emcr?: RecommitmentStatus | null;

  @ApiProperty({
    name: 'bcws',
    type: 'enum',
    enum: RecommitmentStatus,
    nullable: true,
  })
  bcws?: RecommitmentStatus | null;

  @ApiProperty({
    description: 'supervisor reason for updating emcr',
    required: false,  
  })
  supervisorReasonEmcr?: string | null;

  @ApiProperty({
    description: 'supervisor reason for updating bcws',
    required: false,  
  })
  supervisorReasonBcws?: string | null;
}