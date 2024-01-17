import type {
  AvailabilityTypeName,
  ClassificationName,
  Ministry,
  Region,
  Status,
  WorkLocationName,
} from '@/common';
import { Experience, ExperienceName, FunctionName } from '@/common';

import type { FieldInterface } from '@/components/form';
import { FieldTypes } from '@/components/form';

export enum DashboardFilterNames {
  REGION = 'region',
  LOCATION = 'location',
  NAME = 'name',
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
const regionOptions =[{ value: 'VIC', label: 'VIC' },
{ value: 'SWE', label: 'SWE' },
{ value: 'SEA', label: 'SEA' },
{ value: 'NWE', label: 'NWE' },
{ value: 'NEA', label: 'NEA' },
{ value: 'HQ', label: 'HQ' },
{ value: 'CTL', label: 'CTL' }]
export const dashboardFilterFields: FieldInterface[] = [
  {
    name: DashboardFilterNames.NAME,
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
      { label: ExperienceName.INTERESTED, value: Experience.INTERESTED },
      { label: ExperienceName.EXPERIENCED, value: Experience.EXPERIENCED },
      {
        label: ExperienceName.CHIEF_EXPERIENCED,
        value: Experience.CHIEF_EXPERIENCED,
      },
      {
        label: ExperienceName.OUTSIDE_EXPERIENCED,
        value: Experience.OUTSIDE_EXPERIENCED,
      },
    ],
  },

  {
    name: DashboardFilterNames.REGION,
    label: 'Region',
    multi: true,
    type: FieldTypes.SELECT,
    options: [
    {label: "Select All", value: regionOptions.map(itm => itm.value)}, ...regionOptions,
      
    ],
  },
  {
    name: DashboardFilterNames.LOCATION,
    label: 'Work Location',
    type: FieldTypes.MULTI,
    multi: true,
    groupedOptions: [
      {
        label: 'CTL',
        options: [
          { value: 'ENDERBY', label: 'Enderby' },
          { value: 'KAMLOOPS', label: 'Kamloops' },
          { value: 'KELOWNA', label: 'Kelowna' },
          { value: 'MERRITT', label: 'Merritt' },
          { value: 'SALMON_ARM', label: 'Salmon Arm' },
          { value: 'SORRENTO', label: 'Sorrento' },
          { value: 'VERNON', label: 'Vernon' },
        ],
      },
      {
        label: 'HQ',
        options: [
          { value: 'BRENTWOOD_BAY', label: 'Brentwood' },
          { value: 'LANGFORD', label: 'Langford' },
          { value: 'ESQUIMALT', label: 'Esquimalt' },
          { value: 'SAANICH', label: 'Saanich' },
          { value: 'SAANICHTON', label: 'Saanichton' },
          { value: 'SIDNEY', label: 'Sidney' },
          { value: 'VICTORIA', label: 'Victoria' },
        ],
      },
      {
        label: 'NEA',
        options: [
          { value: 'HUNDRED_MILE_HOUSE', label: '100 Mile House' },
          { value: 'HUNDRED_FIFTY_MILE_HOUSE', label: '150 Mile House' },
          { value: 'DAWSON_CREEK', label: 'Dawson Creek' },
          { value: 'FORT_NELSON', label: 'Fort Nelson' },
          { value: 'FORT_ST_JOHN', label: 'Fort St. John' },
          { value: 'MACKENZIE', label: 'Mackenzie' },
          { value: 'PRINCE_GEORGE', label: 'Prince George' },
          { value: 'QUENSEL', label: 'Quesnel' },
          { value: 'WILLIAMS_LAKE', label: 'Williams Lake' },
        ],
      },
      {
        label: 'NWE',
        options: [
          { value: 'BURNES_LAKE', label: 'Burns Lake' },
          { value: 'SMITHERS', label: 'Smithers' },
          { value: 'TERRACE', label: 'Terrace' },
        ],
      },
      {
        label: 'SEA',
        options: [
          { value: 'CASTLEGAR', label: 'Castlegar' },
          { value: 'CRANBROOK', label: 'Cranbrook' },
          { value: 'ELKFORD', label: 'Elkford' },
          { value: 'KIMBERLEY', label: 'Kimberley' },
          { value: 'NELSON', label: 'Nelson' },
          { value: 'REVELSTOKE', label: 'Revelstoke' },
        ],
      },
      {
        label: 'SWE',
        options: [
          { value: 'ABBOTSFORD', label: 'Abbotsford' },
          { value: 'BONNINGTON_FALLS', label: 'Bonnington Falls' },
          { value: 'BURNABY', label: 'Burnaby' },
          { value: 'COQUITLAM', label: 'Coquitlam' },
          { value: 'LANGLEY', label: 'Langley' },
          { value: 'LILLOOET', label: 'Lillooet' },
          { value: 'MAPLE_RIDGE', label: 'Maple Ridge' },
          { value: 'NEW_WESTMINSTER', label: 'New Westminster' },
          { value: 'NORTH_VANCOUVER', label: 'North Vancouver' },
          { value: 'RICHMOND', label: 'Richmond' },
          { value: 'SURREY', label: 'Surrey' },
          { value: 'VANCOUVER', label: 'Vancouver' },
          { value: 'WHISTLER', label: 'Whistler' },
        ],
      },
      {
        label: 'VIC',
        options: [
          { value: 'CAMPBELL_RIVER', label: 'Campbell River' },
          { value: 'COURTENAY', label: 'Courtenay' },
          { value: 'CUMBERLAND', label: 'Cumberland' },
          { value: 'NANAIMO', label: 'Nanaimo' },
          { value: 'PORT_ALBERNI', label: 'Port Alberni' },
          { value: 'QUALICUM_BEACH', label: 'Qualicum Beach' },
          { value: 'UCLUELET', label: 'Ucluelet' },
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
  'Willingness To Travel',
  'Remote Only',
  'Classification',
  'Ministry',
];

export interface Personnel {
  id: string;
  firstName: string;
  lastName: string;
  region: string;
  workLocation: string;
  availability: string;
  active: string;
  willingToTravel: string;
  remoteOnly: string;
  classification: string;
  ministry: string;
}
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
