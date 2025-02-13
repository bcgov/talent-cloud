import { UpdateEmcrPersonnelDTO } from './update-emcr-personnel.dto';
import { UpdatePersonnelDTO } from '../../personnel';
import { PersonnelAdapter } from '../../personnel/helpers';

export class EmcrUpdateAdapter {
  details: PersonnelAdapter;
  emcr: UpdateEmcrPersonnelDTO;

  constructor(data: UpdateEmcrPersonnelDTO & UpdatePersonnelDTO) {
    this.details = new PersonnelAdapter(data);
    this.emcr = {
      personnelId: data?.personnelId,
      approvedBySupervisor: data?.approvedBySupervisor,
      firstChoiceSection: data?.firstChoiceSection,
      secondChoiceSection: data?.secondChoiceSection,
      thirdChoiceSection: data?.thirdChoiceSection,
      coordinatorNotes: data?.coordinatorNotes,
      logisticsNotes: data?.logisticsNotes,
      travelPreference: data?.travelPreference,
      firstNationExperienceLiving: data?.firstNationExperienceLiving,
      firstNationExperienceWorking: data?.firstNationExperienceWorking,
      peccExperience: data?.peccExperience,
      preocExperience: data?.preocExperience,
      emergencyExperience: data?.emergencyExperience,
      dateApproved: data?.dateApproved,
      dateApplied: data?.dateApplied,
      status: data?.status,
      icsTraining: data?.icsTraining,
      firstAidLevel: data?.firstAidLevel,
      firstAidExpiry: data?.firstAidExpiry,
      psychologicalFirstAid: data?.psychologicalFirstAid,
    };
  }
}
