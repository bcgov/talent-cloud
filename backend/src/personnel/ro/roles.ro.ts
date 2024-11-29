import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { BcwsRole, Section } from '../../common/enums/bcws';

export class RolesRO {
  @ApiProperty()
  @IsOptional()
  id: number;

  @ApiProperty({
    description: 'Section',
    required: true,
    example: Section.FINANCE_ADMIN,
  })
  section: Section;

  @ApiProperty({
    description: 'Role name',
    required: true,
    example: BcwsRole.ACCOUNTS_PAYABLE,
  })
  name: BcwsRole;
}
