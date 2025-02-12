import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateCertificationsDTO {
  @ApiProperty({
    description: 'Certification id',
    required: true,
  })
  certificationId: number;

  @ApiProperty({
    description: 'Certification expiry date',
    required: false,
    example: '2022-12-31',
  })
  @IsOptional()
  expiry?: Date;
}
