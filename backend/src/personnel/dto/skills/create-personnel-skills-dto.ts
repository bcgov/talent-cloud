import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsOptional } from 'class-validator';
import { CreateCertificationsDTO } from './create-certifications.dto';
import { CreatePersonnelLanguagesDTO } from './create-personnel-languages.dto';
import { CreatePersonnelToolsDTO } from './create-personnel-tools.dto';
import { UpdateCertificationsDTO } from './update-personnel-certifications.dto';
import { UpdatePersonnelToolsDTO } from './update-personnel-tools.dto';

export class SkillsDTO {
  @ApiProperty({
    description: 'Tools used by the personnel',
    required: false,
  })
  @IsArray()
  @IsOptional()
  @Type(() => CreatePersonnelToolsDTO)
  tools?: CreatePersonnelToolsDTO[] | UpdatePersonnelToolsDTO[];

  @ApiProperty({
    description: 'Languages spoken by the personnel',
    required: false,
  })
  @IsArray()
  @IsOptional()
  @Type(() => CreatePersonnelLanguagesDTO)
  languages?: CreatePersonnelLanguagesDTO[];

  @ApiProperty({
    description: 'Certifications for the personnel',
    required: false,
  })
  @IsArray()
  @IsOptional()
  @Type(() => CreateCertificationsDTO)
  certifications?: CreateCertificationsDTO[] | UpdateCertificationsDTO[];
}
