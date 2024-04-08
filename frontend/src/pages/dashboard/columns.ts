import { v4 as uuidv4 } from 'uuid';
import { DashboardColumns } from '@/pages/dashboard';

export const activeAndInactive = [
  { key: uuidv4(), name: DashboardColumns.NAME },
  { key: uuidv4(), name: DashboardColumns.REGION },
  { key: uuidv4(), name: DashboardColumns.LOCATION },
  { key: uuidv4(), name: DashboardColumns.AVAILABILITY },
  { key: uuidv4(), name: DashboardColumns.TRAVEL },
  { key: uuidv4(), name: DashboardColumns.REMOTE },
  { key: uuidv4(), name: DashboardColumns.UNION_MEMBERSHIP },
  { key: uuidv4(), name: DashboardColumns.MINISTRY },
];

export const activeAndInactiveWithFunction = [
  { key: uuidv4(), name: DashboardColumns.NAME },
  { key: uuidv4(), name: DashboardColumns.REGION },
  { key: uuidv4(), name: DashboardColumns.LOCATION },
  { key: uuidv4(), name: DashboardColumns.FUNCTION },
  { key: uuidv4(), name: DashboardColumns.AVAILABILITY },
  { key: uuidv4(), name: DashboardColumns.TRAVEL },
  { key: uuidv4(), name: DashboardColumns.REMOTE },
  { key: uuidv4(), name: DashboardColumns.UNION_MEMBERSHIP },
  { key: uuidv4(), name: DashboardColumns.MINISTRY },
];

export const pendingWithFunction = [
  { key: uuidv4(), name: DashboardColumns.NAME },
  { key: uuidv4(), name: DashboardColumns.REGION },
  { key: uuidv4(), name: DashboardColumns.LOCATION },
  { key: uuidv4(), name: DashboardColumns.ICS },
  { key: uuidv4(), name: DashboardColumns.SUPERVISOR_APPROVAL },
  { key: uuidv4(), name: DashboardColumns.FUNCTION },
  { key: uuidv4(), name: DashboardColumns.UNION_MEMBERSHIP },
  { key: uuidv4(), name: DashboardColumns.MINISTRY },
];

export const pending = [
  { key: uuidv4(), name: DashboardColumns.NAME },
  { key: uuidv4(), name: DashboardColumns.REGION },
  { key: uuidv4(), name: DashboardColumns.LOCATION },
  { key: uuidv4(), name: DashboardColumns.ICS },
  { key: uuidv4(), name: DashboardColumns.SUPERVISOR_APPROVAL },
  { key: uuidv4(), name: DashboardColumns.UNION_MEMBERSHIP },
  { key: uuidv4(), name: DashboardColumns.MINISTRY },
];
