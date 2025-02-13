import { UpdateBcwsPersonnelDTO } from './update-bcws-personnel.dto';
import { UpdatePersonnelDTO } from '../../personnel';
import { PersonnelAdapter } from '../../personnel/helpers';

export class BcwsUpdateAdapter {
  details: PersonnelAdapter;
  bcws: UpdateBcwsPersonnelDTO;

  constructor(data: UpdateBcwsPersonnelDTO & UpdatePersonnelDTO) {
    this.details = new PersonnelAdapter(data);
    this.bcws = {
      personnelId: data?.personnelId,
      approvedBySupervisor: data?.approvedBySupervisor,
      firstChoiceSection: data?.firstChoiceSection,
      secondChoiceSection: data?.secondChoiceSection,
      thirdChoiceSection: data?.thirdChoiceSection,
      coordinatorNotes: data?.coordinatorNotes,
      logisticsNotes: data?.logisticsNotes,
      travelPreference: data?.travelPreference,
      status: data?.status,
      purchaseCardHolder: data?.purchaseCardHolder,
      liaisonFirstName: data?.liaisonFirstName,
      liaisonLastName: data?.liaisonLastName,
      liaisonPhoneNumber: data?.liaisonPhoneNumber,
      liaisonEmail: data?.liaisonEmail,
      willingnessStatement: data?.willingnessStatement,
      parQ: data?.parQ,
      respectfulWorkplacePolicy: data?.respectfulWorkplacePolicy,
      orientation: data?.orientation,
    };
  }
}
