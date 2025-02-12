import { PartialType } from '@nestjs/mapped-types';
import { EmergencyContactInfo } from './emergency-contact.dto';

export class UpdateEmergencyContactInfo extends PartialType(
  EmergencyContactInfo,
) {}
