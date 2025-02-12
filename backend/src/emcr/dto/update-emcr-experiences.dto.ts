import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, ValidateIf } from 'class-validator';
import { EmcrPersonnelExperienceDTO } from './experiences.dto';
import { Function } from '../../common/enums/function.enum';

export class UpdateEmcrExperiencesDTO extends PartialType(
  EmcrPersonnelExperienceDTO,
) {}

export class UpdateEmcrRolesAndPreferencesDTO {
  @ApiProperty({
    description: 'First Choice Function',
    required: false,
    enum: Function,
    example: Function.ADVANCED_PLANNING_UNIT,
  })
  firstChoiceFunction?: Function;

  @ApiProperty({
    description: 'Second Choice Function',
    required: false,
    enum: Function,
    example: Function.DEPUTY_DIRECTOR,
  })
  secondChoiceFunction?: Function;

  @ApiProperty({
    description: 'Third Choice Function',
    required: false,
    enum: Function,
    example: Function.FINANCE,
  })
  thirdChoiceFunction?: Function;

  @ApiProperty({
    description: 'Roles for this personnel',
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateIf((o) => o.roles)
  @Type(() => UpdateEmcrExperiencesDTO)
  experiences?: UpdateEmcrExperiencesDTO[];
}
