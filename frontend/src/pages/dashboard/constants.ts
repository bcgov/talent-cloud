import type {
  AvailabilityType,
  UnionMembership,
  Experience,
  Ministry,
  Region,
  Status,
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
import type { Tools, ToolsName, ToolsProficiency } from '@/common/enums/tools.enum';
import type { DateRange } from 'react-day-picker';

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
  REMOTE = 'Remote Only',
  UNION_MEMBERSHIP = 'Union Membership',
  REGION = 'Region',
  LOCATION = 'Home Location',
  TRAVEL = 'Willing To Travel',
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
export interface DivisionType {
  id: number;
  ministry: Ministry;
  divisionName: string;
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
  functionName: string;
  id: number;
}
export interface Availability {
  actualEndDate?: string;
  actualStartDate?: string;
  availabilityType: AvailabilityType;
  date: string;
  deploymentCode?: string;
}

export interface BcwsRoleInterface {
  role: BcwsRole;
  section: Section;
  expLevel?: ExperienceLevel;
}

export interface BcwsPersonnelTool {
  toolName: Tools;
  proficiencyLevel: ToolsProficiency;
}

export interface BcwsCertification {
  name: string;
  expiry?: string;
}

export interface BcwsLanguages {
  language: string;
  type: LanguageLevelType;
  level: LanguageProficiency;
}

export interface BcwsPersonnelTool {
  tool: ToolsName;
  proficiencyLevel: ToolsProficiency;
}

export interface BcwsCertification {
  name: string;
  expiry?: string;
}

export interface BcwsLanguages {
  language: string;
  type: LanguageLevelType;
  level: LanguageProficiency;
}

export interface Personnel {
  id: string;
  firstName: string;
  lastName: string;
  workLocation?: Location;
  homeLocation: Location;
  experiences?: ExperienceInterface[];
  availability?: Availability[];
  status: Status;
  newMember?: boolean;
  willingToTravel: boolean;
  remoteOnly: boolean;
  unionMembership: string;
  ministry: Ministry;
  dateApplied?: Date | string;
  dateApproved?: Date | string;
  primaryPhone: string;
  secondaryPhone?: string;
  workPhone?: string;
  email: string;
  supervisorFirstName: string;
  supervisorLastName: string;
  supervisorEmail?: string;
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
  division?: DivisionType;
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
  tools?: BcwsPersonnelTool[];
  languages?: BcwsLanguages[];
  roles?: BcwsRoleInterface[];
  certifications?: BcwsCertification[];
}

export interface AvailabilityRange {
  from: string;
  to: string;
  type: AvailabilityType;
  deploymentCode?: string;
  removeFrom?: string;
  removeTo?: string;
}

export interface SchedulerRowItem {
  date: string;
  status: AvailabilityType;
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
  [DashboardColumns.TRAVEL]: boolean;
  [DashboardColumns.REMOTE]: boolean;
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
