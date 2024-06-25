import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import {
  BcwsRole,
  BcwsRoleName,
  ExperienceLevel,
  Section,
} from '../../common/enums/bcws';

export class BcwsPersonnelRoleRO {
  @ApiProperty()
  @IsOptional()
  personnel_id?: string;

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
    description: 'Role name',
    required: true,
    example: BcwsRoleName.ACCOUNTS_PAYABLE,
    type: 'enum',
    enumName: 'bcws-role',
    enum: BcwsRole,
  })
  roleName: BcwsRoleName;

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
}
