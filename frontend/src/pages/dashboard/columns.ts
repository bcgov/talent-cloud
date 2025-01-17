import { Program } from '@/common';
import { DashboardColumns } from '@/common';

export const activeCols = {
  [Program.BCWS]: [
    DashboardColumns.NAME,
    DashboardColumns.FIRE_CENTRE,
    DashboardColumns.LOCATION,
    DashboardColumns.AVAILABILITY,
    DashboardColumns.TRAVEL_PREFERENCE,
    DashboardColumns.UNION_MEMBERSHIP,
    DashboardColumns.MINISTRY,
  ],
  [Program.EMCR]: [
    DashboardColumns.NAME,
    DashboardColumns.DATE_APPROVED,
    DashboardColumns.REGION,
    DashboardColumns.LOCATION,
    DashboardColumns.AVAILABILITY,
    DashboardColumns.TRAVEL_PREFERENCE,
    DashboardColumns.UNION_MEMBERSHIP,
    DashboardColumns.MINISTRY,
  ],
};
export const pendingColumns = {
  [Program.BCWS]: [
    DashboardColumns.NAME,
    DashboardColumns.DATE_APPLIED,
    DashboardColumns.FIRE_CENTRE,
    DashboardColumns.LOCATION,
    DashboardColumns.PARQ,
    DashboardColumns.ORIENTATION,
    DashboardColumns.MINISTRY,
  ],
  [Program.EMCR]: [
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
