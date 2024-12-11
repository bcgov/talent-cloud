import { ApiProperty } from "@nestjs/swagger";
import { RecommitmentStatus } from "../../common/enums/recommitment-status.enum";
import { Program } from "../../auth/interface";

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
    nullable: true,
  })
  status: RecommitmentStatus;

  @ApiProperty({
    description: 'supervisor reason for updating emcr',
    required: false,
  })
  reason?: string;
}
