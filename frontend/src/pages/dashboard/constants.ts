import type {
  AvailabilityTypeName,
  ClassificationName,
  Ministry,
  Region,
  Status,
  WorkLocationName,
} from '@/common';
import { ExperienceName, FunctionName } from '@/common';

import type { FieldInterface } from '@/components/form';
import { FieldTypes } from '@/components/form';

export enum DashboardFilterNames {
  REGION = 'region',
  LOCATION = 'location',
  SEARCH = 'search',
  SHOW_INACTIVE = 'showInactive',
  FUNCTION = 'function',
  EXPERIENCE = 'experience',
}

export enum DashboardColumns {
  AVAILABILITY = 'availability',
  REMOTE = 'remote',
  CLASSIFICATION = 'classification',
  REGION = 'region',
  LOCATION = 'location',
  TRAVEL = 'travel',
  MINISTRY = 'ministry',
  NAME = 'name',
  STATUS = 'status',
  FUNCTION = 'function',
}

export const dashboardFilterFields: FieldInterface[] = [
  {
    name: DashboardFilterNames.SEARCH,
    label: 'Search By Name',
    type: FieldTypes.SEARCH,
  },
  {
    name: DashboardFilterNames.FUNCTION,
    label: 'Function',
    type: FieldTypes.SELECT,
    options: [
      { label: FunctionName.OPERATIONS, value: FunctionName.OPERATIONS },
      {
        label: FunctionName.EMERGENCY_SUPPORT_SERVICES,
        value: FunctionName.EMERGENCY_SUPPORT_SERVICES,
      },
      { label: FunctionName.FIRST_NATIONS, value: FunctionName.FIRST_NATIONS },
      { label: FunctionName.FINANCE, value: FunctionName.FINANCE },
      { label: FunctionName.LIAISON, value: FunctionName.LIAISON },
      { label: FunctionName.LOGISTICS, value: FunctionName.LOGISTICS },
      { label: FunctionName.PLANS, value: FunctionName.PLANS },
      {
        label: FunctionName.ADVANCED_PLANNING_UNIT,
        value: FunctionName.ADVANCED_PLANNING_UNIT,
      },
      { label: FunctionName.RECOVERY, value: FunctionName.RECOVERY },
      { label: FunctionName.DIRECTOR, value: FunctionName.DIRECTOR },
      { label: FunctionName.GIS, value: FunctionName.GIS },
    ],
  },
  {
    name: DashboardFilterNames.EXPERIENCE,
    label: 'Experience',
    type: FieldTypes.SELECT,
    options: [
      { label: ExperienceName.INTERESTED, value: ExperienceName.INTERESTED },
      { label: ExperienceName.EXPERIENCED, value: ExperienceName.EXPERIENCED },
      {
        label: ExperienceName.CHIEF_EXPERIENCED,
        value: ExperienceName.CHIEF_EXPERIENCED,
      },
      {
        label: ExperienceName.OUTSIDE_EXPERIENCED,
        value: ExperienceName.OUTSIDE_EXPERIENCED,
      },
    ],
  },

  {
    name: DashboardFilterNames.REGION,
    label: 'Region',
    multi: true,
    type: FieldTypes.SELECT,
    options: [
      { value: '*', label: 'Select All' },
      { value: 'VIC', label: 'VIC' },
      { value: 'SWE', label: 'SWE' },
      { value: 'SEA', label: 'SEA' },
      { value: 'NWE', label: 'NWE' },
      { value: 'NEA', label: 'NEA' },
      { value: 'HQ', label: 'HQ' },
      { value: 'CTL', label: 'CTL' },
    ],
  },
  {
    name: DashboardFilterNames.LOCATION,
    label: 'Work Location',
    type: FieldTypes.MULTI,
    groupedOptions: [
      {
        label: 'CTL',

        options: [
          { value: 'Enderby', label: 'Enderby' },
          { value: 'Kamloops', label: 'Kamloops' },
          { value: 'Kelowna', label: 'Kelowna' },
          { value: 'Merritt', label: 'Merritt' },
          { value: 'Salmon Arm', label: 'Salmon Arm' },
          { value: 'Sorrento', label: 'Sorrento' },
          { value: 'Vernon', label: 'Vernon' },
        ],
      },

      {
        label: 'HQ',
        options: [
          { value: 'Brentwood', label: 'Brentwood' },
          { value: 'Langford', label: 'Langford' },
          { value: 'Esquimalt', label: 'Esquimalt' },
          { value: 'Saanich', label: 'Saanich' },
          { value: 'Saanichton', label: 'Saanichton' },
          { value: 'Sidney', label: 'Sidney' },
          { value: 'Victoria', label: 'Victoria' },
        ],
      },

      {
        label: 'NEA',
        options: [
          { value: '100 Mile House', label: '100 Mile House' },
          { value: '150 Mile House', label: '150 Mile House' },
          { value: 'Dawson Creek', label: 'Dawson Creek' },
          { value: 'Fort Nelson', label: 'Fort Nelson' },
          { value: 'Fort St. John', label: 'Fort St. John' },
          { value: 'Mackenzie', label: 'Mackenzie' },
          { value: 'Prince George', label: 'Prince George' },
          { value: 'Quesnel', label: 'Quesnel' },
          { value: 'Williams Lake', label: 'Williams Lake' },
        ],
      },

      {
        label: 'NWE',
        options: [
          { value: 'Burns Lake', label: 'Burns Lake' },
          { value: 'Smithers', label: 'Smithers' },
          { value: 'Terrace', label: 'Terrace' },
        ],
      },

      {
        label: 'SEA',
        options: [
          { value: 'Castlegar', label: 'Castlegar' },
          { value: 'Cranbrook', label: 'Cranbrook' },
          { value: 'Elkford', label: 'Elkford' },
          { value: 'Kimberley', label: 'Kimberley' },
          { value: 'Nelson', label: 'Nelson' },
          { value: 'Revelstoke', label: 'Revelstoke' },
        ],
      },

      {
        label: 'SWE',
        options: [
          { value: 'Abbotsford', label: 'Abbotsford' },
          { value: 'Bonnington Falls', label: 'Bonnington Falls' },
          { value: 'Burnaby', label: 'Burnaby' },
          { value: 'Coquitlam', label: 'Coquitlam' },
          { value: 'Langley', label: 'Langley' },
          { value: 'Lillooet', label: 'Lillooet' },
          { value: 'Maple Ridge', label: 'Maple Ridge' },
          { value: 'New Westminster', label: 'New Westminster' },
          { value: 'North Vancouver', label: 'North Vancouver' },
          { value: 'Richmond', label: 'Richmond' },
          { value: 'Surrey', label: 'Surrey' },
          { value: 'Vancouver', label: 'Vancouver' },
          { value: 'Whistler', label: 'Whistler' },
        ],
      },

      {
        label: 'VIC',
        options: [
          { value: 'Campbell River', label: 'Campbell River' },
          { value: 'Courtenay', label: 'Courtenay' },
          { value: 'Cumberland', label: 'Cumberland' },
          { value: 'Nanaimo', label: 'Nanaimo' },
          { value: 'Port Alberni', label: 'Port Alberni' },
          { value: 'Qualicum Beach', label: 'Qualicum Beach' },
          { value: 'Ucluelet', label: 'Ucluelet' },
        ],
      },
    ],
  },
];

export const dashboardToggle = {
  name: DashboardFilterNames.SHOW_INACTIVE,
  label: 'Show Inactive',
  type: FieldTypes.TOGGLE,
};

export const dashboardColumns = [
  'Name',
  'Region',
  'Work Location',
  'Function',
  'Availability',
  'Willingness To Travel',
  'Remote?',
  'Classification',
  'Ministry',
];

export interface DashboardRow {
  [DashboardColumns.NAME]: string;
  [DashboardColumns.REGION]: Region;
  [DashboardColumns.LOCATION]: WorkLocationName;
  [DashboardColumns.FUNCTION]: FunctionName;
  [DashboardColumns.AVAILABILITY]: AvailabilityTypeName;
  [DashboardColumns.TRAVEL]: boolean;
  [DashboardColumns.REMOTE]: boolean;
  [DashboardColumns.CLASSIFICATION]: ClassificationName;
  [DashboardColumns.MINISTRY]: Ministry;
  [DashboardColumns.STATUS]: Status;
}

export interface DashboardFilters {
  name?: string | null;
  region?: string[] | null;
  location?: string[] | null;
  function?: string | null;
  experience?: string | null;
}
