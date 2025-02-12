import { PartialType } from '@nestjs/mapped-types';
import { SkillsDTO } from './create-personnel-skills-dto';

export class UpdateSkillsDTO extends PartialType(SkillsDTO) {}
