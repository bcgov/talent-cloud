import { UpdateBcwsRolesDTO } from '../bcws/dto/update-bcws-personnel-roles.dto';
import { Section } from '../common/enums';
import { UpdateEmcrExperiencesDTO } from '../emcr/dto/update-emcr-experiences.dto';

export class UpdatePreferencesDTO {
  bcws: {
    firstChoiceSection: Section;
    secondChoiceSection: Section;
    thirdChoiceSection: Section;
    roles: UpdateBcwsRolesDTO[];
  };
  emcr: {
    firstChoiceSection: string;
    secondChoiceSection: string;
    thirdChoiceSection: string;
    experiences: UpdateEmcrExperiencesDTO[];
  };
}
