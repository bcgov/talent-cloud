import { ApiProperty } from '@nestjs/swagger';
import {
  LanguageLevelType,
  LanguageProficiency,
} from '../../../common/enums/bcws';

export class BcwsPersonnelLanguagesRO {
  @ApiProperty({
    description: 'Language ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Language name',
    example: 'English',
  })
  name: string;

  @ApiProperty({
    description: 'Language proficiency',
    example: LanguageProficiency.BASIC,
    type: 'enum',
    enumName: 'bcws-languages-proficiency',
    enum: LanguageProficiency,
  })
  proficiency: LanguageProficiency;

  @ApiProperty({
    description: 'Language fluency type',
    example: LanguageLevelType.WRITTEN,
    type: 'enum',
    enumName: 'bcws-languages-fluency-type',
    enum: LanguageLevelType,
  })
  type: LanguageLevelType;
}
