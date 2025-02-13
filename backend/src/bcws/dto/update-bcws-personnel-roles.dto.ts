import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, ValidateIf } from 'class-validator';
import { Section } from '../../common/enums';
import { CreateBcwsPersonnelRolesDTO } from './create-bcws-personnel-roles.dto';

export class UpdateBcwsRolesDTO extends PartialType(
  CreateBcwsPersonnelRolesDTO,
) {}

export class UpdateBcwsRolesAndPreferencesDTO {
  @ApiProperty({
    description: 'First Choice Section',
    required: false,
    enum: Section,
    example: Section.AVIATION,
  })
  firstChoiceSection?: Section;

  @ApiProperty({
    description: 'Second Choice Section',
    required: false,
    enum: Section,
    example: Section.FINANCE_ADMIN,
  })
  secondChoiceSection?: Section;

  @ApiProperty({
    description: 'Third Choice Section',
    required: false,
    enum: Section,
    example: Section.COMMAND,
  })
  thirdChoiceSection?: Section;

  @ApiProperty({
    description: 'Roles for this personnel',
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateIf((o) => o.roles)
  @Type(() => UpdateBcwsRolesDTO)
  roles?: UpdateBcwsRolesDTO[];
}
