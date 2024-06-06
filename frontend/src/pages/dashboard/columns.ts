import { DashboardColumns } from '@/pages/dashboard';
import { Route } from '@/providers';

export const activeCols = {
  [Route.BCWS]: [
    DashboardColumns.NAME,
    DashboardColumns.DATE_APPROVED,
    DashboardColumns.FIRE_CENTRE,
    DashboardColumns.LOCATION,
    DashboardColumns.AVAILABILITY,
    DashboardColumns.TRAVEL,
    DashboardColumns.UNION_MEMBERSHIP,
  ],
  [Route.EMCR]: [
    DashboardColumns.NAME,
    DashboardColumns.DATE_APPROVED,
    DashboardColumns.REGION,
    DashboardColumns.LOCATION,
    DashboardColumns.AVAILABILITY,
    DashboardColumns.TRAVEL,
    DashboardColumns.REMOTE,
    DashboardColumns.UNION_MEMBERSHIP,
    DashboardColumns.MINISTRY,
  ],
};
export const pendingColumns = {
  [Route.BCWS]: [
    DashboardColumns.NAME,
    DashboardColumns.DATE_APPLIED,
    DashboardColumns.FIRE_CENTRE,
    DashboardColumns.LOCATION,
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
    DashboardColumns.UNION_MEMBERSHIP,
    DashboardColumns.MINISTRY,
  ],
};
