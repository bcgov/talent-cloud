import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import {
  LanguageLevelType,
  LanguageProficiency,
} from '../../common/enums/bcws';

export class CreateBcwsPersonnelLanguagesDTO {
  @ApiProperty({
    description: 'Personnel ID',
    required: false,
    example: '123e4567-e',
  })
  @IsOptional()
  personnelId?: string;

  @ApiProperty({
    description: 'Language',
    required: true,
    example: 'English',
  })
  language: string;

  @ApiProperty({
    description: 'Proficiency level',
    required: true,
    example: 'Native',
  })
  @IsEnum(LanguageProficiency, {
    message: `Invalid language proficiency. Options are: ${Object.values(
      LanguageProficiency,
    )}`,
  })
  level: LanguageProficiency;

  @ApiProperty({
    description: 'Language level type',
    required: true,
    example: LanguageLevelType.WRITTEN,
  })
  @IsEnum(LanguageLevelType, {
    message: `Invalid language level type. Options are: ${Object.values(
      LanguageLevelType,
    )}`,
  })
  type: LanguageLevelType;
}
