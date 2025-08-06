import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsAlphanumeric, Length, ValidateIf } from 'class-validator';

export class EmergencyContactInfo {
  @ApiProperty({
    description: 'Emergency Contact First Name',
  })
  @IsOptional()
  emergencyContactFirstName?: string;

  @ApiProperty({
    description: 'Emergency Contact Last Name',
  })
  @IsOptional()
  emergencyContactLastName?: string;

  @ApiProperty({
    description: 'Emergency Contact Phone Number',
  })
  @IsAlphanumeric()
  @Length(10, 10)
  @IsOptional()
  @ValidateIf((o) => o.emergencyContactPhoneNumber && o.emergencyContactPhoneNumber !== '')
  emergencyContactPhoneNumber?: string;

  @ApiProperty({
    description: 'Emergency Contact Relationship',
  })
  @IsOptional()
  emergencyContactRelationship?: string;
}
