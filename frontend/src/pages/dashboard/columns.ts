import { DashboardColumns } from '@/pages/dashboard';
import { Route } from '@/providers';

export const cols = {
  active: {
    [Route.BCWS]: [
      DashboardColumns.NAME,
      DashboardColumns.DATE_APPROVED,
      DashboardColumns.FIRE_CENTRE,
      DashboardColumns.LOCATION,
      DashboardColumns.ROLE,
      DashboardColumns.AVAILABILITY,
      DashboardColumns.TRAVEL,
      DashboardColumns.UNION_MEMBERSHIP,
      
    ],
    [Route.EMCR]: [
      DashboardColumns.NAME,
      DashboardColumns.DATE_APPROVED,
      DashboardColumns.REGION,
      DashboardColumns.LOCATION,
      DashboardColumns.FUNCTION,
      DashboardColumns.AVAILABILITY,
      DashboardColumns.TRAVEL,
      DashboardColumns.REMOTE,
      DashboardColumns.UNION_MEMBERSHIP,
      DashboardColumns.MINISTRY,
    ],
  },
  pending: {
    [Route.BCWS]: [
      DashboardColumns.NAME,
      DashboardColumns.FIRE_CENTRE,
      DashboardColumns.LOCATION,
      DashboardColumns.ROLE,
      DashboardColumns.WILLINGNESS,
      DashboardColumns.RESPECTFUL,
      DashboardColumns.PARQ,
      DashboardColumns.ORIENTATION,
      DashboardColumns.MINISTRY,
    ],
    [Route.EMCR]: [
      DashboardColumns.NAME,
      DashboardColumns.DATE_APPLIED,
      DashboardColumns.REGION,
      DashboardColumns.LOCATION,
      DashboardColumns.ICS,
      DashboardColumns.SUPERVISOR_APPROVAL,
      DashboardColumns.FUNCTION,
      DashboardColumns.UNION_MEMBERSHIP,
      DashboardColumns.MINISTRY,
    ],
  },
};
