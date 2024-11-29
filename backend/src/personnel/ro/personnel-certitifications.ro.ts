import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class PersonnelCertificationRO {
  @ApiProperty({
    description: 'Certification name',
    required: true,
  })
  name: string;

  @ApiProperty({
    description: 'Certification expiry date',
    required: false,
    example: '2022-12-31',
  })
  @IsOptional()
  expiry?: Date;
}
