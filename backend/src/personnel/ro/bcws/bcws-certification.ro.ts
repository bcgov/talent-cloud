import { ApiProperty } from "@nestjs/swagger";


export class CertificationRO {
  @ApiProperty({
    description: 'Certification id',
    required: true,
  })
  id: number;

  @ApiProperty({
    description: 'Certification name',
    required: true,
  })
  name: string;

}