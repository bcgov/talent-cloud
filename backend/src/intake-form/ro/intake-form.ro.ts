import { IsDate, IsEnum, IsJSON, IsOptional, IsString, ValidateIf } from "class-validator";
import { FormStatusEnum } from "../../common/enums/form-status.enum";
import { Program } from "../../auth/interface";
import { IntakeFormPersonnelData } from "../types";



export class IntakeFormRO{
  @IsString()
  id: string;

  @IsJSON()
  @IsOptional()
  personnel: Partial<IntakeFormPersonnelData>

  @IsDate()
  @IsOptional()
  createdAt: Date;
  
  @IsDate()
  @IsOptional()
  updatedAt?: Date;

  @IsEnum(FormStatusEnum)
  @IsOptional()
  status: FormStatusEnum;

  @IsEnum(Program)
  @IsOptional()
  @ValidateIf((o) => o.program)
  program?: Program;

  @IsEnum(Program)
  @IsOptional()
  @ValidateIf((o) => o.currentProgram)
  currentProgram?: Program;

  @IsString()
  @IsOptional()
  createdByEmail: string;
    
}