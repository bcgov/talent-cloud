import type { AvailabilityType } from '@/common';
import { AvailabilityTypeName } from '@/common';
import { FireCentreName } from '@/common/enums/firecentre.enum';
import type { Availability, Personnel } from '@/pages/dashboard';
import { DashboardColumns } from '@/pages/dashboard';
import { Route } from '@/providers';
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

const renderAvailability = (personnel: Personnel, filterValues: URLSearchParams) => {
  if (
    filterValues?.get('availabilityType') &&
    personnel?.availability &&
    personnel?.availability?.length > 0
  ) {
    return getAvailabilityValue(
      filterValues.get('availabilityType') as AvailabilityType,
      {
        from: new Date(filterValues.get('availabilityFromDate') ?? ''),
        to: new Date(filterValues.get('availabilityToDate') ?? ''),
      },
      personnel.availability,
    );
  } else if (!personnel.availability) {
    return { availability: '' };
  } else if (personnel.availability.length > 0) {
    return {
      availability:
        AvailabilityTypeName[
          personnel.availability[0].availabilityType as keyof typeof AvailabilityType
        ],
    };
  }
};

export const renderCells = (
  personnel: Personnel,
  searchParms: URLSearchParams,
  isPending: boolean,
  route: Route,
) => {
  const cells = {
    name: {
      key: DashboardColumns.NAME,
      columnName: DashboardColumns.NAME,
      value: `${personnel.lastName?.toUpperCase()},  ${personnel.firstName}`,
    },

    region: {
      key: DashboardColumns.REGION,
      columnName: DashboardColumns.REGION,
      value: personnel.homeLocation?.region,
    },

    fireCentre: {
      key: DashboardColumns.FIRE_CENTRE,
      columnName: DashboardColumns.FIRE_CENTRE,
      value: FireCentreName[personnel?.homeLocation?.fireCentre],
    },
    location: {
      key: DashboardColumns.LOCATION,
      columnName: DashboardColumns.LOCATION,
      value: personnel?.homeLocation?.locationName,
    },
    ics: {
      key: DashboardColumns.ICS,
      columnName: DashboardColumns.ICS,
      value: personnel?.icsTraining ? 'Yes' : 'No',
    },
    supervisorApproval: {
      key: DashboardColumns.SUPERVISOR_APPROVAL,
      columnName: DashboardColumns.SUPERVISOR_APPROVAL,
      value: personnel?.approvedBySupervisor ? 'Yes' : 'No',
    },
    unionMembership: {
      key: DashboardColumns.UNION_MEMBERSHIP,
      columnName: DashboardColumns.UNION_MEMBERSHIP,
      value: personnel?.unionMembership,
    },
    ministry: {
      key: DashboardColumns.MINISTRY,
      columnName: DashboardColumns.MINISTRY,
      value: personnel.ministry,
    },
    availability: {
      key: DashboardColumns.AVAILABILITY,
      columnName: DashboardColumns.AVAILABILITY,
      // value will be the status type and/or the number of days available
      value: renderAvailability(personnel, searchParms),
    },
    willingToTravel: {
      key: DashboardColumns.TRAVEL,
      columnName: DashboardColumns.TRAVEL,
      value: personnel.willingToTravel,
    },
    remoteOnly: {
      key: DashboardColumns.REMOTE,
      columnName: DashboardColumns.REMOTE,
      value: personnel.remoteOnly,
    },
    dateApplied: {
      key: DashboardColumns.DATE_APPLIED,
      columnName: DashboardColumns.DATE_APPLIED,
      value: personnel.dateApplied && datePST(personnel.dateApplied as Date, true),
    },
    dateApproved: {
      key: DashboardColumns.DATE_APPROVED,
      columnName: DashboardColumns.DATE_APPROVED,
      value: personnel.dateApproved && datePST(personnel.dateApproved as Date, true),
    },

    willingnessStatement: {
      key: DashboardColumns.WILLINGNESS,
      columnName: DashboardColumns.WILLINGNESS,
      value: personnel.willingnessStatement,
    },
    respectfulWorkplacePolicy: {
      key: DashboardColumns.RESPECTFUL,
      columnName: DashboardColumns.RESPECTFUL,
      value: personnel.respectfulWorkplacePolicy,
    },
    parQ: {
      key: DashboardColumns.PARQ,
      columnName: DashboardColumns.PARQ,
      value: personnel.parQ,
    },
    orientation: {
      key: DashboardColumns.ORIENTATION,
      columnName: DashboardColumns.ORIENTATION,
      value: personnel.orientation,
    },
  };

  const activeCells = {
    [Route.EMCR]: [
      cells.name,
      cells.dateApproved,
      cells.region,
      cells.location,
      cells.availability,
      cells.willingToTravel,
      cells.remoteOnly,
      cells.unionMembership,
      cells.ministry,
    ],
    [Route.BCWS]: [
      cells.name,
      cells.dateApproved,
      cells.fireCentre,
      cells.location,
      cells.availability,
      cells.willingToTravel,
      cells.unionMembership,
    ],
  };

  const pendingCells = {
    [Route.EMCR]: [
      cells.name,
      cells.dateApplied,
      cells.region,
      cells.location,
      cells.ics,
      cells.supervisorApproval,
      cells.unionMembership,
      cells.ministry,
    ],
    [Route.BCWS]: [
      cells.name,
      cells.fireCentre,
      cells.location,
      cells.willingnessStatement,
      cells.respectfulWorkplacePolicy,
      cells.parQ,
      cells.orientation,
      cells.ministry,
    ],
  };
  if (isPending) {
    return pendingCells[route];
  } else {
    return activeCells[route];
  }
};
