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
import type {
  BcwsTravelPreference,
  TravelPreference,
} from './enums/travel-preference.enum';
import type { RecommitmentStatus } from './enums/recommitment-status';

export enum Filters {
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
  AVAILABILITY_FROM_DATE = 'availabilityFromDate',
  AVAILABILITY_TO_DATE = 'availabilityToDate',
  STATUS = 'status',
  INCLUDE_TRAVEL = 'includeTravel',
  PAGE = 'page',
  ROWS = 'rows',
  AVAILABLE_STATUS = 'availableStatus',
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
  name: Filters.SHOW_INACTIVE,
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
  functionName?: string;
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

export interface UpdateBcwsRoles {
  roleId: number;
  expLevel: ExperienceLevel;
}

export interface BcwsRoleInterface {
  id: number;
  name: BcwsRole;
  section: Section;
}

export interface PersonnelTool {
  key?: string | number;
  id: number | string;
  tool: Tools;
  proficiencyLevel: ToolsProficiency;
}

export interface Certification {
  key?: string | number;
  id?: number | string;
  name: string;
  expiry?: string;
}

export interface Languages {
  key?: string | number;
  id: number;
  language: string;
  type: LanguageLevelType;
  level: LanguageProficiency;
}

export interface RecommitmentCycle {
  year: number;
  startDate: string;
  endDate: string;
  reinitiationEndDate?: string;
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
  personnel: PersonnelInfo;
  year: number;
}

export interface PersonnelInfo {
  id: string;
  firstName: string;
  lastName: string;
  workLocation?: Location;
  homeLocation: Location;
  availabilityConfirmedUntil?: Date;
  availabilityConfirmedOn?: Date;
  availability?: Availability[];
  unionMembership: string;
  ministry?: Ministry;
  primaryPhone: string;
  secondaryPhone?: string;
  workPhone?: string;
  email: string;
  supervisorFirstName: string;
  supervisorLastName: string;
  supervisorEmail: string;
  supervisorPhone?: string;
  approvedBySupervisor: boolean;

  division?: string;
  employeeId?: string;
  paylistId?: string;
  purchaseCardHolder?: boolean;
  driverLicense?: string[];
  emergencyContactFirstName?: string;
  emergencyContactLastName?: string;
  emergencyContactPhoneNumber?: string;
  emergencyContactRelationship?: string;
  tools?: PersonnelTool[];
  languages?: Languages[];
  certifications?: Certification[];
  recommitment?: Recommitment[];
  lastDeployed?: string;

  chipsProfileMissing: boolean;
  chipsIssues: { [key: string]: string };
  chipsTrainingData: Array<{ id: string; name: string; completed: string }>;
  chipsLastPing?: string;
}

export interface EmcrMember {
  experiences?: ExperienceInterface[];
  dateApplied?: Date | string;
  dateApproved?: Date | string;
  firstChoiceFunction?: string;
  secondChoiceFunction?: string;
  thirdChoiceFunction?: string;
  travelPreference?: TravelPreference;
  icsTraining?: boolean;
  reviewed: boolean;
  status: Status;
  newMember?: boolean;
  logisticsNotes?: string;
  coordinatorNotes?: string;
  tools?: PersonnelTool[];
  languages?: Languages[];
  roles?: BcwsPersonnelRoleInterface[];
  certifications?: Certification[];
  bcws?: Partial<Personnel>;
  emcr?: Partial<Personnel>;
  skills: PersonnelTool[] | Certification[] | Languages[];
  recommitment?: Recommitment[];
}

export interface BcwsMember {
  status: Status;
  dateApplied?: Date | string;
  dateApproved?: Date | string;
  reviewed: boolean;
  firstChoiceSection?: Section;
  secondChoiceSection?: Section;
  thirdChoiceSection?: Section;
  orientation?: boolean;
  willingnessStatement?: boolean;
  parQ?: boolean;
  respectfulWorkplacePolicy?: boolean;
  roles?: BcwsPersonnelRoleInterface[];
  liaisonFirstName?: string;
  liaisonLastName?: string;
  liaisonPhoneNumber?: string;
  liaisonEmail?: string;
  travelPreference?: BcwsTravelPreference;
  newMember?: boolean;
  logisticsNotes?: string;
  coordinatorNotes?: string;
}

// member view of personnel
export interface Member extends PersonnelInfo {
  bcws?: BcwsMember;
  emcr?: EmcrMember;
}

// coordinator view of personnel
export interface BcwsPersonnel extends PersonnelInfo, BcwsMember {}
export interface EmcrPersonnel extends PersonnelInfo, EmcrMember {}

export type Personnel = BcwsPersonnel & EmcrPersonnel;

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
