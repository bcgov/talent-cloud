import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  Length,
  IsAlphanumeric,
  IsOptional,
  ValidateIf,
  IsEmail,
} from 'class-validator';

export class SupervisorInformationDTO {
  @ApiProperty({
    description: "Name of personnel's supervisor",
    example: 'River Cartwright',
  })
  @IsString()
  @Length(2, 50)
  supervisorFirstName: string;

  @ApiProperty({
    description: "Name of personnel's supervisor",
    example: 'River Cartwright',
  })
  @IsString()
  @Length(2, 50)
  supervisorLastName: string;

  @ApiProperty({
    description: 'Supervisor phone number',
    example: '2503334444',
  })
  @IsAlphanumeric()
  @Length(10, 10)
  @IsOptional()
  @ValidateIf((o) => o.supervisorPhone)
  supervisorPhone?: string;

  @ApiProperty({
    description: "Name of personnel's supervisor",
    example: 'River Cartwright',
  })
  @IsEmail()
  @ValidateIf((o) => o.supervisorEmail !== '')
  @Length(2, 50)
  @IsOptional()
  supervisorEmail?: string;
}
