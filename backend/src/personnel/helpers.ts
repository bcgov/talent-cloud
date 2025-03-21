import { IntersectionType } from "@nestjs/swagger";
import { PersonnelDetailsDTO } from "./dto/details/personnel-details.dto";
import { EmergencyContactInfo } from "./dto/emergency-contact/emergency-contact.dto";
import { EmploymentInfo } from "./dto/employment-info/employment-info.dto";
import { SkillsDTO } from "./dto/skills/create-personnel-skills-dto";
import { SupervisorInformationDTO } from "./dto/supervisor/create-supervisor-info.dto";



export class PersonnelAdapter extends IntersectionType(
  PersonnelDetailsDTO,
  EmploymentInfo,
  EmergencyContactInfo,
  SupervisorInformationDTO,
  SkillsDTO,
) {
  constructor(data: Partial<PersonnelAdapter>) {
    super();
    (this.workLocation = data?.workLocation),
    (this.homeLocation = data?.homeLocation),
    (this.primaryPhone = data?.primaryPhone),
    (this.secondaryPhone = data?.secondaryPhone),
    (this.workPhone = data?.workPhone),
    (this.email = data?.email),
    (this.driverLicense = data?.driverLicense),
    (this.firstName = data?.firstName),
    (this.lastName = data?.lastName),
    (this.jobTitle = data?.jobTitle),
    (this.unionMembership = data?.unionMembership),
    (this.supervisorFirstName = data?.supervisorFirstName),
    (this.supervisorLastName = data?.supervisorLastName),
    (this.supervisorEmail = data?.supervisorEmail),
    (this.supervisorPhone = data?.supervisorPhone),
    (this.ministry = data?.ministry),
    (this.division = data?.division),
    (this.employeeId = data?.employeeId),
    (this.paylistId = data?.paylistId),
    (this.emergencyContactFirstName = data?.emergencyContactFirstName),
    (this.emergencyContactLastName = data?.emergencyContactLastName),
    (this.emergencyContactPhoneNumber = data?.emergencyContactPhoneNumber),
    (this.emergencyContactRelationship = data?.emergencyContactRelationship);
    (this.chipsProfileMissing = data?.chipsProfileMissing);
  }
}
