import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, ValidateIf } from "class-validator";
import { Program } from "../../auth/interface";
import { CreatePersonnelBcwsDTO } from "../../bcws/dto";
import { CreatePersonnelDTO } from "../../personnel";

export class IntakeFormDTO {
  @ApiProperty({
    description: 'BCWS information for the personnel',
    required: false,
    type: CreatePersonnelDTO,
  })
  @IsOptional()
  @ValidateIf((o) => o.bcws)
  @Type(() => CreatePersonnelDTO) 
  personnel: CreatePersonnelDTO; 

  @ApiProperty({
    description: 'BCWS information for the personnel',
    required: false,
    type: CreatePersonnelBcwsDTO,
  })
  @IsOptional()
  program: Program
}