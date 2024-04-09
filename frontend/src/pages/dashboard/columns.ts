import { DashboardColumns } from '@/pages/dashboard';

export const activeAndInactive = [
  { key: DashboardColumns.NAME, name: DashboardColumns.NAME },
  { key: DashboardColumns.DATE_APPROVED, name: DashboardColumns.DATE_APPROVED },
  { key: DashboardColumns.REGION, name: DashboardColumns.REGION },
  { key: DashboardColumns.LOCATION, name: DashboardColumns.LOCATION },
  { key: DashboardColumns.FUNCTION, name: DashboardColumns.FUNCTION },
  { key: DashboardColumns.AVAILABILITY, name: DashboardColumns.AVAILABILITY },
  { key: DashboardColumns.TRAVEL, name: DashboardColumns.TRAVEL },
  { key: DashboardColumns.REMOTE, name: DashboardColumns.REMOTE },
  {
    key: DashboardColumns.UNION_MEMBERSHIP,
    name: DashboardColumns.UNION_MEMBERSHIP,
  },
  { key: DashboardColumns.MINISTRY, name: DashboardColumns.MINISTRY },
];

export const pending = [
  { key: DashboardColumns.NAME, name: DashboardColumns.NAME },
  { key: DashboardColumns.DATE_APPLIED, name: DashboardColumns.DATE_APPLIED },
  { key: DashboardColumns.REGION, name: DashboardColumns.REGION },
  { key: DashboardColumns.LOCATION, name: DashboardColumns.LOCATION },
  { key: DashboardColumns.ICS, name: DashboardColumns.ICS },
  {
    key: DashboardColumns.SUPERVISOR_APPROVAL,
    name: DashboardColumns.SUPERVISOR_APPROVAL,
  },
  { key: DashboardColumns.FUNCTION, name: DashboardColumns.FUNCTION },
  {
    key: DashboardColumns.UNION_MEMBERSHIP,
    name: DashboardColumns.UNION_MEMBERSHIP,
  },
  { key: DashboardColumns.MINISTRY, name: DashboardColumns.MINISTRY },
];
