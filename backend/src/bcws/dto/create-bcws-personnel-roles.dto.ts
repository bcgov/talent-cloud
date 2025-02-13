import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { ExperienceLevel } from '../../common/enums/bcws';

export class CreateBcwsPersonnelRolesDTO {
  @ApiProperty({
    description: 'Personnel Id',
    required: false,
  })
  personnelId?: string;

  @ApiProperty({
    description: 'Role Id',
    required: true,
  })
  roleId: number;

  @ApiProperty({
    description: 'Experience level',
    required: true,
    example: ExperienceLevel.INTERESTED,
  })
  @IsEnum(ExperienceLevel, {
    message: `Invalid exp level. Options are: ${Object.values(
      ExperienceLevel,
    )}`,
  })
  expLevel: ExperienceLevel;
}
