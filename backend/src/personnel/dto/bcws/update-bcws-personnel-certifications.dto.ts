import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CertificationName } from '../../../common/enums';

export class UpdateBcwsCertificationsDTO {
  @ApiProperty({
    description: 'Certification name',
    required: true,
    enum: CertificationName,
  })
  name: CertificationName;

  @ApiProperty({
    description: 'Certification expiry date',
    required: false,
    example: '2022-12-31',
  })
  @IsOptional()
  expiry?: Date;
}
