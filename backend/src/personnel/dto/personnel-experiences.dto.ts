import { ApiProperty } from '@nestjs/swagger';
import { Experience } from '../../common/enums';

export class PersonnelExperienceDTO {
  @ApiProperty({
    description: 'Id of Function',
    required: true,
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Experience Type',
    required: true,
    example: Experience.CHIEF_EXPERIENCED
  })
  experienceType: Experience;

}