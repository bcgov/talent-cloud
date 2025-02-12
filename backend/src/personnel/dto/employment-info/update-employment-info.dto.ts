import { PartialType } from '@nestjs/mapped-types';
import { EmploymentInfo } from './employment-info.dto';

export class UpdateEmploymentInfo extends PartialType(EmploymentInfo) {}
