import { ApiProperty } from '@nestjs/swagger';
import { BcwsRole, ExperienceLevel, Section } from '../../../common/enums/bcws';

export class BcwsRoleRO {
  @ApiProperty()
  personnel_id: number;

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
  roleName: BcwsRole;

  @ApiProperty({
    description: 'Experience level',
    required: true,
    example: ExperienceLevel.PREVIOUSLY_DEPLOYED,
  })
  expLevel: ExperienceLevel;
}
