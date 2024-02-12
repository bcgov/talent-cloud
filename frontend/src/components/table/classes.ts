import { AvailabilityType, Classification } from '@/common';
import { DashboardColumns } from '@/pages/dashboard/constants';

export const rowClass = 'w-full border-b border-t border-gray';

export const tdClass = 'text-dark px-6 py-4 whitespace-nowrap';

export const classificationClass =
  'block  font-bold border border-gray rounded-md mt-4 mx-8 text-center ';

export const tableClasses = {
  ministry: [tdClass, 'text-info'].join(', '),
  available: [tdClass, 'text-success'].join(', '),
  unavailable: [tdClass, 'text-error'].join(', '),
  remote: [tdClass].join(', '),
  travelYes: [
    tdClass,
    'flex flex-row items-center justify-start text-sm text-success',
  ].join(', '),
  travelNo: [
    tdClass,
    'flex flex-row items-center justify-start text-sm text-error',
  ].join(', '),
  excluded: [
    classificationClass,
    ' text-error bg-errorBannerLight border-error',
  ].join(', '),
  bcgeu: [classificationClass, ' text-info bg-infoBannerLight border-infoDark'].join(
    ', ',
  ),
  bcnu: [
    classificationClass,
    ' text-warning bg-warningBannerLight border-warningDark',
  ].join(', '),
  pea: [
    classificationClass,
    ' text-successDark bg-successBannerLight border-successDark',
  ].join(', '),
  checkIconClass: 'h-6 w-6 text-success mr-2',
  xIconClass: 'h-6 w-6 text-error mr-2',
};
const getUnionMembershipClass = (value: string) => {
  switch (value) {
    case Classification.BCGEU:
      return tableClasses.bcgeu;
    case Classification.EXCLUDED:
      return tableClasses.excluded;
    case Classification.PEA:
      return tableClasses.pea;
    case Classification.BCNU:
      return tableClasses.bcnu;
    default:
      return tdClass;
  }
};
export const tableClass = (key: string, value?: string) => {
  switch (key) {
    case DashboardColumns.MINISTRY:
      return tableClasses.ministry;
    case DashboardColumns.REMOTE:
      return tableClasses.remote;
    case DashboardColumns.AVAILABILITY:
      return value === AvailabilityType.AVAILABLE
        ? tableClasses.available
        : tableClasses.unavailable;
    case DashboardColumns.TRAVEL:
      return value === 'yes' ? tableClasses.travelYes : tableClasses.travelNo;
    case DashboardColumns.UNION_MEMBERSHIP:
      return getUnionMembershipClass(value);
    default:
      return tdClass;
  }
};

export const iconClass = (value: boolean) => {
  return value ? tableClasses.checkIconClass : tableClasses.xIconClass;
};
