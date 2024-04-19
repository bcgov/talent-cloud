import {
  AvailabilityType,
  AvailabilityTypeName,
  ExperienceName,
  Status,
} from '@/common';
import { tableClass } from '@/components/table/classes';
import type { Availability, Personnel, DashboardFilters } from '@/pages/dashboard';
import { DashboardColumns } from '@/pages/dashboard';
import { datePST } from '@/utils';
import { differenceInDays } from 'date-fns';
import type { DateRange } from 'react-day-picker';

/**
 * If availability  status is set, then calculate the partial or full availability
 * @param availability
 * @returns
 */
export const getAvailabilityValue = (
  availabilityType: AvailabilityType,
  availabilityDates: DateRange,
  availability: Availability[],
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
    return {
      availability:
        AvailabilityTypeName[availabilityType as keyof typeof AvailabilityType],
    };
  }

  if (totalDaysSearched > 1 && totalAvailableDays >= 1) {
    return {
      availability: AvailabilityTypeName[availabilityType],
      days: `${totalAvailableDays} of ${totalDaysSearched} days`,
    };
  }

  return {
    availability:
      AvailabilityTypeName[availabilityType as keyof typeof AvailabilityType],
  };
};

export const renderCells = (
  personnel: Personnel,
  filterValues: DashboardFilters,
) => {
  const columns = {
    name: {
      key: DashboardColumns.NAME,
      columnName: DashboardColumns.NAME,
      value: `${personnel.lastName?.toUpperCase()},  ${personnel.firstName}`,
      className: tableClass(DashboardColumns.NAME, ''),
    },

    region: {
      key: DashboardColumns.REGION,
      columnName: DashboardColumns.REGION,
      value: personnel.homeLocation.region,
      className: tableClass(
        DashboardColumns.REGION,
        personnel.homeLocation?.region?.toLowerCase() ?? '',
      ),
    },
    location: {
      key: DashboardColumns.LOCATION,
      columnName: DashboardColumns.LOCATION,
      value: personnel.homeLocation.locationName,
      className: tableClass(
        DashboardColumns.LOCATION,
        personnel.homeLocation?.locationName.toLowerCase() ?? '',
      ),
    },
    ics: {
      key: DashboardColumns.ICS,
      columnName: DashboardColumns.ICS,
      value: personnel.icsTraining,
      className: tableClass(
        DashboardColumns.TRAVEL,
        personnel.icsTraining ? 'yes' : 'no',
      ),
    },
    supervisorApproval: {
      key: DashboardColumns.SUPERVISOR_APPROVAL,
      columnName: DashboardColumns.SUPERVISOR_APPROVAL,
      value: personnel.approvedBySupervisor ? 'Yes' : 'No',
      className: tableClass(
        DashboardColumns.SUPERVISOR_APPROVAL,
        personnel.homeLocation?.locationName.toLowerCase() ?? '',
      ),
    },
    function: {
      key: DashboardColumns.FUNCTION,
      columnName: DashboardColumns.FUNCTION,
      value: `${personnel.experiences?.find((itm: any) => itm.functionName === filterValues.function)?.functionName}:${ExperienceName[personnel.experiences?.find((itm: any) => itm.functionName === filterValues.function)?.experienceType as keyof typeof ExperienceName]}`,
      className: personnel.experiences?.find(
        (itm: any) => itm.functionName === filterValues.function,
      )
        ? tableClass(DashboardColumns.FUNCTION, '')
        : 'hidden',
    },
    unionMembership: {
      key: DashboardColumns.UNION_MEMBERSHIP,
      columnName: DashboardColumns.UNION_MEMBERSHIP,
      value: personnel.unionMembership,
      className: tableClass(
        DashboardColumns.UNION_MEMBERSHIP,
        personnel.unionMembership,
      ),
    },
    ministry: {
      key: DashboardColumns.MINISTRY,
      columnName: DashboardColumns.MINISTRY,
      value: personnel.ministry,
      className: tableClass(
        DashboardColumns.MINISTRY,
        personnel.ministry?.toLowerCase(),
      ),
    },
    availability: {
      key: DashboardColumns.AVAILABILITY,
      columnName: DashboardColumns.AVAILABILITY,
      // value will be the status type and/or the number of days available
      value: filterValues.availabilityType
        ? getAvailabilityValue(
            AvailabilityType[
              filterValues.availabilityType as unknown as keyof typeof AvailabilityType
            ],
            filterValues.availabilityDates,
            personnel.availability ?? [],
          )
        : {
            availability:
              AvailabilityTypeName[
                personnel.availability?.[0]
                  ?.availabilityType as keyof typeof AvailabilityType
              ],
          },
      className: tableClass(
        DashboardColumns.AVAILABILITY,
        filterValues.availabilityType
          ? getAvailabilityValue(
              AvailabilityType[
                filterValues.availabilityType as unknown as keyof typeof AvailabilityType
              ],
              filterValues.availabilityDates,
              personnel.availability ?? [],
            ).availability
          : AvailabilityTypeName[
              personnel.availability?.[0]
                ?.availabilityType as keyof typeof AvailabilityType
            ],
      ),
    },
    willingToTravel: {
      key: DashboardColumns.TRAVEL,
      columnName: DashboardColumns.TRAVEL,
      value: personnel.willingToTravel,
      className: tableClass(
        DashboardColumns.TRAVEL,
        personnel.willingToTravel ? 'yes' : 'no',
      ),
    },
    remoteOnly: {
      key: DashboardColumns.REMOTE,
      columnName: DashboardColumns.REMOTE,
      value: personnel.remoteOnly ? 'Yes' : 'No',
      className: tableClass(
        DashboardColumns.REMOTE,
        personnel.remoteOnly ? 'yes' : 'no',
      ),
    },
    dateApplied: {
      key: DashboardColumns.DATE_APPLIED,
      columnName: DashboardColumns.DATE_APPLIED,
      value: personnel.applicationDate && datePST(personnel.applicationDate, true),
      className: tableClass(DashboardColumns.DATE_APPLIED, ''),
    },
    dateApproved: {
      key: DashboardColumns.DATE_APPROVED,
      columnName: DashboardColumns.DATE_APPROVED,
      value: personnel.dateJoined && datePST(personnel.dateJoined, true),
      className: tableClass(DashboardColumns.DATE_APPROVED, ''),
    },
  };

  const pendingColumns = [
    columns.name,
    columns.dateApplied,
    columns.region,
    columns.location,
    columns.ics,
    columns.supervisorApproval,
    columns.function,
    columns.unionMembership,
    columns.ministry,
  ];

  const activeAndInactiveColumns = [
    columns.name,
    columns.dateApproved,
    columns.region,
    columns.location,
    columns.function,
    columns.availability,
    columns.willingToTravel,
    columns.remoteOnly,
    columns.unionMembership,
    columns.ministry,
  ];

  if (filterValues.status === Status.PENDING && !filterValues.function) {
    return pendingColumns.filter(
      (column) => column.key !== DashboardColumns.FUNCTION,
    );
  }
  if (filterValues.status === Status.PENDING && filterValues.function) {
    return pendingColumns;
  }
  if (filterValues.status !== Status.PENDING && !filterValues.function) {
    return activeAndInactiveColumns.filter(
      (column) => column.key !== DashboardColumns.FUNCTION,
    );
  }
  if (filterValues.status !== Status.PENDING && filterValues.function) {
    return activeAndInactiveColumns;
  }
};
