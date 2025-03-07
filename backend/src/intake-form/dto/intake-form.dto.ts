import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, ValidateIf } from "class-validator";
import { Program } from "../../auth/interface";
import { CreatePersonnelBcwsDTO } from "../../bcws/dto";
import { CreatePersonnelDTO } from "../../personnel";
import { IntakeFormPersonnelData } from "../types";

export class IntakeFormDTO {
  @ApiProperty({
    description: 'Form ID',
    required: false,
    
  })
  @IsOptional()
  id?: string;

  @ApiProperty({
    description: 'Personnel Data on form',
    required: false,
    
  })
  @IsOptional()
  personnel: IntakeFormPersonnelData; 

}