import { AvailabilityTypeName, ClassificationName } from '@/common';
import { tableClasses, tdClass } from './classes';
import { DashboardColumns } from './interface';

export const booleanToString = (value: boolean): string => (value ? 'Yes' : 'No');

export const tableClass = (key: string, value?: string) => {
  switch (key) {
    case DashboardColumns.MINISTRY:
      return tableClasses.ministry;
    case DashboardColumns.AVAILABILITY:
      return value === AvailabilityTypeName.AVAILABLE
        ? tableClasses.available
        : tableClasses.unavailable;
    case DashboardColumns.TRAVEL:
      return tableClasses.travel;
    case DashboardColumns.CLASSIFICATION:
      return value === ClassificationName.EXCLUDED
        ? tableClasses.excluded
        : tableClasses.bcgeu;
    default:
      return tdClass;
  }
};

export const iconClass = (value: boolean) => {
  return value ? tableClasses.checkIconClass : tableClasses.xIconClass;
};
