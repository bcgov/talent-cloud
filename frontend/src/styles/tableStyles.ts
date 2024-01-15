import { AvailabilityTypeName, ClassificationName } from '@/common';
import { DashboardColumns } from '@/pages/dashboard/constants';

export const rowClass = 'border-b border-t border-gray';

export const tdClass = 'text-dark px-6 py-4 whitespace-nowrap';

export const classificationClass =
  'block  font-bold border border-gray rounded-md mt-4 mx-4 text-center whitespace-nowrap space-x-4';

export const tableClasses = {
  generic: [tdClass, 'text-dark px-6 py-4 whitespace-nowrap'].join(', '),
  ministry: [tdClass, 'text-info'].join(', '),
  available: [tdClass, 'text-success'].join(', '),
  unavailable: [tdClass, 'text-error'].join(', '),
  travel: [tdClass, 'flex flex-row items-center justify-center text-sm'].join(', '),
  excluded: [
    classificationClass,
    'text-error bg-errorBannerLight border-error',
  ].join(', '),
  bcgeu: [classificationClass, 'text-info bg-infoBannerLight border-info'].join(
    ', ',
  ),
  checkIconClass: 'h-6 w-6 text-success mr-2',
  xIconClass: 'h-6 w-6 text-error mr-2',
};

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
