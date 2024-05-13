import { ApiProperty } from '@nestjs/swagger';
import { BcwsRole, ExperienceLevel, Section } from '../../../common/enums/bcws';

export class BcwsPersonnelRoleRO {
  @ApiProperty({
    description: 'Role name',
    required: true,
    example: BcwsRole.ACCOUNTS_PAYABLE,
    type: 'enum',
    enumName: 'bcws-role',
    enum: BcwsRole,
  })
  role: BcwsRole;

  @ApiProperty({
    description: 'Section',
    required: true,
    example: Section.AVIATION,
    type: 'enum',
    enumName: 'bcws-role-section',
    enum: Section,
  })
  section: Section;

  @ApiProperty({
    description: 'Experience level',
    required: true,
    example: ExperienceLevel.PREVIOUSLY_DEPLOYED,
    type: 'enum',
    enumName: 'bcws-experience-level',
    enum: ExperienceLevel,
  })
  expLevel: ExperienceLevel;

  @ApiProperty({
    description: 'Rank of choice for role (first, second, etc.)',
    required: true,
    example: 1,
    type: 'number'
  })
  rank: number;
}
