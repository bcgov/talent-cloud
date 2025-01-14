export const APP_NAME = 'CORE Team';

export const LINKS = {
  EMCR: 'https://www2.gov.bc.ca/gov/content/governments/organizational-structure/ministries-organizations/ministries/emergency-management-and-climate-readiness?keyword=emcr',
};
import type {
  AvailabilityType,
  UnionMembership,
  Experience,
  Ministry,
  Region,
  Status,
  Program,
} from '@/common';
import type { FireCentre } from '@/common/enums/firecentre.enum';
import type {
  LanguageLevelType,
  LanguageProficiency,
} from '@/common/enums/language.enum';
import type {
  BcwsRole,
  ExperienceLevel,
  Section,
} from '@/common/enums/sections.enum';
import type { Tools, ToolsProficiency } from '@/common/enums/tools.enum';
import type { DateRange } from 'react-day-picker';
import type { TravelPreference } from './enums/travel-preference.enum';
import type { RecommitmentStatus } from './enums/recommitment-status';

export enum DashboardFilterNames {
  REGION = 'region',
  LOCATION = 'location',
  NAME = 'name',
  SHOW_INACTIVE = 'showInactive',
  FUNCTION = 'function',
  EXPERIENCE = 'experience',
  AVAILABILITY_TYPE = 'availabilityType',
  FIRE_CENTRE = 'fireCentre',
  SECTION = 'section',
  ROLE = 'role',
}

export enum DashboardColumns {
  FUNCTION = 'Function / Experience',
  AVAILABILITY = 'Availability',
  UNION_MEMBERSHIP = 'Union Membership',
  REGION = 'Region',
  LOCATION = 'Home Location',
  TRAVEL_PREFERENCE = 'Travel Preference',
  MINISTRY = 'Ministry',
  NAME = 'Name',
  STATUS = 'Status',
  SUPERVISOR_APPROVAL = 'Supervisor Approval',
  ICS = 'ICS',
  DATE_APPLIED = 'Applied',
  DATE_APPROVED = 'Approved',
  FIRE_CENTRE = 'Fire Centre',
  ROLE = 'Role',
  WILLINGNESS = 'Willingness Statement',
  PARQ = 'Par Q',
  ORIENTATION = 'Orientation',
  RESPECTFUL = 'Respectful Workplace Policy',
}

export interface FunctionType {
  name: string;
  id: number;
  abbreviation: string;
}

export interface SectionType {
  [key: string]: BcwsRole[];
}

export const dashboardToggle = {
  name: DashboardFilterNames.SHOW_INACTIVE,
  label: 'Show Inactive',
};
export interface Location {
  id?: number;
  locationName: string;
  region: Region;
  fireCentre: FireCentre;
}

export interface ExperienceInterface {
  experienceType: Experience;
  function: {
    id: number;
    name: string;
    abbreviation: string;
  };
  id: number;
}
export interface Availability {
  actualEndDate?: string;
  actualStartDate?: string;
  availabilityType: AvailabilityType | null;
  date: string;
  deploymentCode?: string;
}

export interface BcwsPersonnelRoleInterface {
  id: number;
  role: BcwsRole;
  section: Section;
  expLevel?: ExperienceLevel;
}

export interface BcwsRoleInterface {
  id: number;
  name: BcwsRole;
  section: Section;
}

export interface BcwsLanguages {
  language: string;
  type: LanguageLevelType;
  level: LanguageProficiency;
}

export interface PersonnelTool {
  tool: Tools;
  proficiencyLevel: ToolsProficiency;
}

export interface Certification {
  name: string;
  expiry?: string;
}

export interface Languages {
  id: number;
  language: string;
  type: LanguageLevelType;
  level: LanguageProficiency;
}

export interface RecommitmentCycle {
  year: number;
  startDate: string;
  endDate: string;
}

export interface Recommitment {
  personnelId: string;
  recommitmentCycle: RecommitmentCycle;
  status: RecommitmentStatus;
  program: Program;
  memberDecisionDate?: Date | null;
  memberReason?: string | null;
  supervisorIdir?: string;
  supervisorDecisionDate?: Date;
  supervisorReason?: string | null;
  personnel: Personnel;
  year: number;
}

export interface Personnel {
  program?: Program;
  id: string;
  firstName: string;
  lastName: string;
  workLocation?: Location;
  homeLocation: Location;
  experiences?: ExperienceInterface[];
  availability?: Availability[];
  status: Status;
  newMember?: boolean;
  travelPreference: TravelPreference;
  unionMembership: string;
  ministry?: Ministry;
  dateApplied?: Date | string;
  dateApproved?: Date | string;
  primaryPhone: string;
  secondaryPhone?: string;
  workPhone?: string;
  email: string;
  supervisorFirstName: string;
  supervisorLastName: string;
  supervisorEmail: string;
  supervisorPhone?: string;
  approvedBySupervisor: boolean;
  icsTraining?: boolean;
  reviewed: boolean;
  date: string;
  availabilityType: AvailabilityType;
  deploymentCode?: string;
  actualStartDate?: string;
  actualEndDate?: string;
  logisticsNotes?: string;
  coordinatorNotes?: string;
  lastDeployed?: string;
  firstChoiceSection?: Section;
  secondChoiceSection?: Section;
  division?: string;
  orientation?: boolean;
  willingnessStatement?: boolean;
  parQ?: boolean;
  respectfulWorkplacePolicy?: boolean;
  employeeId?: string;
  paylistId?: string;
  liaisonFirstName?: string;
  liaisonLastName?: string;
  liaisonPhoneNumber?: string;
  liaisonEmail?: string;
  purchaseCardHolder?: boolean;
  driverLicense?: string[];
  emergencyContactFirstName?: string;
  emergencyContactLastName?: string;
  emergencyContactPhoneNumber?: string;
  emergencyContactRelationship?: string;
  tools?: PersonnelTool[];
  languages?: Languages[];
  roles?: BcwsPersonnelRoleInterface[];
  certifications?: Certification[];
  bcws?: Partial<Personnel>;
  emcr?: Partial<Personnel>;
  skills: PersonnelTool[] | Certification[] | Languages[];
  recommitment?: Recommitment[];
}

export interface AvailabilityRange {
  from: string;
  to: string;
  type: AvailabilityType | null;
  deploymentCode?: string;
  removeFrom?: string;
  removeTo?: string;
}

export interface SchedulerRowItem {
  date: string;
  status: AvailabilityType | null;
  start?: boolean;
  numDays?: number;
  actualStart?: string;
  actualEnd?: string;
}

export interface DashboardRow {
  [DashboardColumns.NAME]: string;
  [DashboardColumns.REGION]: Region;
  [DashboardColumns.LOCATION]: string;
  [DashboardColumns.FUNCTION]: string;
  [DashboardColumns.AVAILABILITY]: AvailabilityType;
  [DashboardColumns.UNION_MEMBERSHIP]: UnionMembership;
  [DashboardColumns.MINISTRY]: Ministry;
}
export interface DashboardFilters {
  rowsPerPage: number;
  currentPage: number;
  status?: Status;
  name?: string;
  region?: string[];
  location?: string[];
  function?: string;
  experience?: Experience;
  availabilityType?: AvailabilityType;
  availabilityDates: DateRange;
  fireCentre?: string[];
  section?: Section;
  role?: BcwsRole;
}

export interface MemberProfile extends Personnel {
  bcws?: Partial<Personnel>;
  emcr?: Partial<Personnel>;
}
