import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';
import { Ministry } from '../../../common/enums';

export class EmploymentInfo {
  @ApiProperty()
  @IsOptional()
  intakeFormId?: number;

  @ApiProperty({
    enum: Ministry,
    example: Ministry.AF,
  })
  ministry: Ministry;

  @ApiProperty({
    description: 'Division',
    required: false,
  })
  division?: string;

  @ApiProperty({
    description: 'Employee ID',
    example: '123456',
  })
  @Length(6, 6)
  employeeId?: string;
  @ApiProperty({
    description: 'Paylist ID',
    example: '123-345',
  })
  @IsString()
  paylistId?: string;
}
