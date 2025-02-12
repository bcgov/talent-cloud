import { PartialType } from '@nestjs/mapped-types';
import { CreateCertificationsDTO } from './create-certifications.dto';

export class UpdateCertificationsDTO extends PartialType(
  CreateCertificationsDTO,
) {}
