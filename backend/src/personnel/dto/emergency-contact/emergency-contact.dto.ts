import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

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
  @IsOptional()
  emergencyContactPhoneNumber?: string;

  @ApiProperty({
    description: 'Emergency Contact Relationship',
  })
  @IsOptional()
  emergencyContactRelationship?: string;
}
