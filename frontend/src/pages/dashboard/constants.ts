
import { AvailabilityTypeName, ClassificationName, Ministry, ExperienceName, FunctionName, Region, WorkLocation, Experience } from '@/common';

export enum DashboardFilterNames {
  REGION = 'region',
  LOCATION = 'location',
  NAME = 'name',
  SHOW_INACTIVE = 'showInactive',
  FUNCTION = 'function',
  EXPERIENCE = 'experience',
}

export enum DashboardColumns {
  FUNCTION = 'Function/Experience',
  AVAILABILITY = 'Availability',
  REMOTE = 'Remote Only',
  CLASSIFICATION = 'Classification',
  REGION = 'Region',
  LOCATION = 'Work Location',
  TRAVEL = 'Willing To Travel',
  MINISTRY = 'Ministry',
  NAME = 'Name',
  STATUS = 'Status',
}

export interface DashboardFields {
  function: {
    name: string;
    options: FunctionName[];
  };
  location: {
    name: string;
    groupedOptions: {
      label: string;
      options: WorkLocation[];
    }[];
  };
  name: {
    name: string;
  };
  region: {
    name: string;
    options: Region[];
  };
  experience: {
    name: string;
    options: {label: ExperienceName, value: Experience}[];
  };
}
export const dashboardFilterFields: DashboardFields = {
  name: {
    name: DashboardFilterNames.NAME,
  },
  region: {
    name: DashboardFilterNames.REGION,
    options: [Region.SWE, Region.SEA, Region.NWE, Region.NEA, Region.HQ, Region.CTL],
  },
  location: {
    name: DashboardFilterNames.LOCATION,
    groupedOptions: [
      {
        label: Region.VIC,
        options: [
          WorkLocation.CAMPBELL_RIVER,
          WorkLocation.COURTENAY,
          WorkLocation.CUMBERLAND,
          WorkLocation.NANAIMO,
          WorkLocation.PORT_ALBERNI,
          WorkLocation.QUALICUM_BEACH,
          WorkLocation.UCLUELET,
        ],
      },
      {
        label: Region.CTL,
        options: [
          WorkLocation.ENDERBY,
          WorkLocation.KAMLOOPS,
          WorkLocation.KELOWNA,
          WorkLocation.MERRITT,
          WorkLocation.SALMON_ARM,
          WorkLocation.SORRENTO,
          WorkLocation.VERNON,
        ],
      },
      {
        label: Region.HQ,
        options: [
          WorkLocation.BRENTWOOD_BAY,
          WorkLocation.LANGFORD,
          WorkLocation.ESQUIMALT,
          WorkLocation.SAANICH,
          WorkLocation.SAANICHTON,
          WorkLocation.SIDNEY,
          WorkLocation.VICTORIA,
        ],
      },
      {
        label: Region.NEA,
        options: [
          WorkLocation.HUNDRED_MILE_HOUSE,
          WorkLocation.HUNDRED_FIFTY_MILE_HOUSE,
          WorkLocation.DAWSON_CREEK,
          WorkLocation.FORT_NELSON,
          WorkLocation.FORT_ST_JOHN,
          WorkLocation.MACKENZIE,
          WorkLocation.PRINCE_GEORGE,
          WorkLocation.QUESNEL,
          WorkLocation.WILLIAMS_LAKE,
        ],
      },
      {
        label: Region.SWE,
        options: [
          WorkLocation.ABBOTSFORD,
          WorkLocation.BONNINGTON_FALLS,
          WorkLocation.BURNABY,
          WorkLocation.COQUITLAM,
          WorkLocation.LANGLEY,
          WorkLocation.LILLOOET,
          WorkLocation.MAPLE_RIDGE,
          WorkLocation.NEW_WESTMINSTER,
          WorkLocation.NORTH_VANCOUVER,
          WorkLocation.RICHMOND,
          WorkLocation.SURREY,
          WorkLocation.VANCOUVER,
          WorkLocation.WHISTLER,
        ],
      },
      {
        label: Region.NWE,
        options: [
          WorkLocation.BURNS_LAKE,
          WorkLocation.SMITHERS,
          WorkLocation.TERRACE,
        ],
      },
      {
        label: Region.SEA,
        options: [
          WorkLocation.CASTLEGAR,
          WorkLocation.CRANBROOK,
          WorkLocation.ELKFORD,
          WorkLocation.KIMBERLY,
          WorkLocation.NELSON,
          WorkLocation.REVELSTOKE,
        ],
      },
    ],
  },
  function: {
    name: DashboardFilterNames.FUNCTION,

    options: [
      FunctionName.OPERATIONS,
      FunctionName.EMERGENCY_SUPPORT_SERVICES,
      FunctionName.FIRST_NATIONS,
      FunctionName.FINANCE,
      FunctionName.LIAISON,
      FunctionName.LOGISTICS,
      FunctionName.PLANS,
      FunctionName.ADVANCED_PLANNING_UNIT,
      FunctionName.RECOVERY,
      FunctionName.DIRECTOR,
      FunctionName.GIS,
    ],
  },
  experience: {
    name: DashboardFilterNames.EXPERIENCE,
    options: [{
      label: ExperienceName.INTERESTED, value: Experience.INTERESTED},
      {label: ExperienceName.EXPERIENCED, value: Experience.EXPERIENCED},
      {label: ExperienceName.CHIEF_EXPERIENCED, value: Experience.CHIEF_EXPERIENCED},
      {label: ExperienceName.OUTSIDE_EXPERIENCED, value: Experience.OUTSIDE_EXPERIENCED,
    }],
  },
};

export const dashboardToggle = {
  name: DashboardFilterNames.SHOW_INACTIVE,
  label: 'Show Inactive',
};

interface ExperienceInterface {
  
  experienceType: Experience;
  functionName: FunctionName;
  
}

export interface Personnel {
  id: string;
  firstName: string;
  lastName: string;
  region: string;
  workLocation: string;
  experiences: ExperienceInterface[];
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
  [DashboardColumns.LOCATION]: WorkLocation;
  [DashboardColumns.FUNCTION]: FunctionName;
  [DashboardColumns.AVAILABILITY]: AvailabilityTypeName;
  [DashboardColumns.TRAVEL]: boolean;
  [DashboardColumns.REMOTE]: boolean;
  [DashboardColumns.CLASSIFICATION]: ClassificationName;
  [DashboardColumns.MINISTRY]: Ministry;
}
export interface DashboardFilters {
  rowsPerPage: number;
  currentPage: number;
  showInactive?: boolean;
  name: string;
  region: Region[];
  location: string[];
  function: FunctionName;
  experience: ExperienceName;
}
