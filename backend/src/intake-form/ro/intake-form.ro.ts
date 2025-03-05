import { IsDate, IsEnum, IsJSON, IsOptional, IsString } from "class-validator";
import { CreatePersonnelDTO } from "../../personnel";
import { FormStatusEnum } from "src/common/enums/form-status.enum";
import { Program } from "src/auth/interface";

export class IntakeFormRO{
  @IsString()
  id: string;

  @IsJSON()
  @IsOptional()
  personnel: Partial<CreatePersonnelDTO>

  @IsDate()
  @IsOptional()
  createdAt: Date;
  
  @IsDate()
  @IsOptional()
  updatedAt?: Date;

  @IsEnum(FormStatusEnum)
  @IsOptional()
  status: FormStatusEnum;

  @IsEnum(FormStatusEnum)
  @IsOptional()
  program: Program;

  @IsString()
  @IsOptional()
  createdByEmail: string;
    
}