import { AvailabilityType, AvailabilityTypeName, ExperienceName } from '@/common';
import { tableClass } from '@/components/table/classes';
import type {
  AvailabilityInterface,
  Personnel,
  DashboardFilters,
} from '@/pages/dashboard';
import { DashboardColumns } from '@/pages/dashboard';
import { differenceInDays } from 'date-fns';
import type { DateRange } from 'react-day-picker';
import { v4 as uuidv4 } from 'uuid';

export const calculatePages = (totalPages: number): number[] => {
  const range = [];

  // create the pages array for the footer
  for (let i = 1; i <= totalPages; i++) {
    range.push(i);
  }
  return range;
};
/**
 * If availability  status is set, then calculate the partial or full availability
 * @param availability
 * @returns
 */
export const getAvailabilityValue = (
  availabilityType: AvailabilityType,
  availabilityDates: DateRange,
  availability: AvailabilityInterface[],
) => {
  const totalAvailableDays = availability.filter(
    (itm) => itm.availabilityType === availabilityType,
  ).length;

  const totalDaysSearched =
    differenceInDays(
      availabilityDates.to ?? new Date(),
      availabilityDates.from ?? new Date(),
    ) + 1;

  if (totalDaysSearched === 1 || totalDaysSearched === totalAvailableDays) {
    return AvailabilityTypeName[availabilityType as keyof typeof AvailabilityType];
  }

  if (totalDaysSearched > 1 && totalAvailableDays >= 1) {
    return AvailabilityTypeName.PARTIAL;
  }

  return AvailabilityTypeName[availabilityType as keyof typeof AvailabilityType];
};

export const renderCells = (
  personnel: Partial<Personnel>,
  filterValues: DashboardFilters,
) => {
  const {
    lastName,
    firstName,
    region,
    workLocation,
    experiences,
    willingToTravel,
    remoteOnly,
    availability,
    classification,
    ministry,
  } = personnel;
  return [
    {
      key: uuidv4(),
      columnName: DashboardColumns.NAME,
      value: `${lastName?.toUpperCase()},  ${firstName}`,
      className: tableClass(DashboardColumns.NAME, ''),
    },

    {
      key: uuidv4(),
      columnName: DashboardColumns.REGION,
      value: region,
      className: tableClass(DashboardColumns.REGION, region?.toLowerCase()),
    },
    {
      key: uuidv4(),
      columnName: DashboardColumns.LOCATION,
      value: workLocation,
      className: tableClass(DashboardColumns.LOCATION, workLocation?.toLowerCase()),
    },
    {
      key: uuidv4(),
      columnName: DashboardColumns.FUNCTION,
      value: `${experiences?.find((itm: any) => itm.functionName === filterValues.function)?.functionName}:${ExperienceName[experiences?.find((itm: any) => itm.functionName === filterValues.function)?.experienceType as keyof typeof ExperienceName]}`,
      className: experiences?.find(
        (itm: any) => itm.functionName === filterValues.function,
      )
        ? tableClass(DashboardColumns.FUNCTION, '')
        : 'hidden',
    },
    {
      key: uuidv4(),
      columnName: DashboardColumns.AVAILABILITY,
      value: filterValues.availabilityType
        ? getAvailabilityValue(
            AvailabilityType[
              filterValues.availabilityType as unknown as keyof typeof AvailabilityType
            ],
            filterValues.availabilityDates,
            availability ?? [],
          )
        : AvailabilityTypeName.NOT_INDICATED,
      className: tableClass(
        DashboardColumns.AVAILABILITY,
        filterValues.availabilityType ?? AvailabilityType.NOT_INDICATED,
      ),
    },
    {
      key: uuidv4(),
      columnName: DashboardColumns.TRAVEL,
      value: willingToTravel,
      className: tableClass(DashboardColumns.TRAVEL, willingToTravel ? 'yes' : 'no'),
    },
    {
      key: uuidv4(),
      columnName: DashboardColumns.REMOTE,
      value: remoteOnly,
      className: tableClass(DashboardColumns.REMOTE, remoteOnly ? 'yes' : 'no'),
    },
    {
      key: uuidv4(),
      columnName: DashboardColumns.UNION_MEMBERSHIP,
      value: classification,
      className: tableClass(DashboardColumns.UNION_MEMBERSHIP, classification),
    },
    {
      key: uuidv4(),
      columnName: DashboardColumns.MINISTRY,
      value: ministry,
      className: tableClass(DashboardColumns.MINISTRY, ministry?.toLowerCase()),
    },
  ];
};
