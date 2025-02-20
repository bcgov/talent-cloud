import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, ValidateIf } from 'class-validator';
import { UpdateBcwsRolesDTO } from '../bcws/dto/update-bcws-personnel-roles.dto';
import { Section } from '../common/enums';
import { UpdateEmcrExperiencesDTO } from '../emcr/dto/update-emcr-experiences.dto';

class UpdateEmcrPreferences {
  firstChoiceSection?: string;
  secondChoiceSection?: string;
  thirdChoiceSection?: string;
  experiences?: UpdateEmcrExperiencesDTO[];
}
class UpdateBcwsPreferences {
  firstChoiceSection?: Section;
  secondChoiceSection?: Section;
  thirdChoiceSection?: Section;
  roles?: UpdateBcwsRolesDTO[];
}
export class UpdatePreferencesDTO {
  @ApiProperty({
    description: 'BCWS information for member',
    required: false,
    type: UpdateBcwsPreferences,
  })
  @IsOptional()
  @ValidateIf((o) => o.bcws)
  @Type(() => UpdateBcwsPreferences)
  bcws?: UpdateBcwsPreferences;

  @ApiProperty({
    description: 'EMCR preferences for member',
    required: false,
    type: UpdateEmcrPreferences,
  })
  @IsOptional()
  @ValidateIf((o) => o.emcr)
  @Type(() => UpdateEmcrPreferences)
  emcr?: UpdateEmcrPreferences;
}
