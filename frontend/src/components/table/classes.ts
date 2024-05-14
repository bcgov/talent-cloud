import { AvailabilityTypeName, UnionMembership } from '@/common';

export const rowClass = 'w-full border-b border-t border-gray';

export const tdClass = 'text-dark-700 text-sm px-6 py-4 whitespace-nowrap';

export const classificationClass =
  'block  font-bold border border-gray rounded-md mt-4 mx-8 text-center ';

export const tableClasses: { [key: string]: string } = {
  available: 'text-success',
  
  default: tdClass,
  row: 'flex flex-row items-center justify-center text-sm',
  excluded: [
    classificationClass,
    ' text-error bg-errorBannerLight border-error',
  ].join(', '),
  bcgeu: [classificationClass, ' text-info bg-infoBannerLight border-infoDark'].join(
    ', ',
  ),
  pea: [
    classificationClass,
    ' text-successDark bg-successBannerLight border-successDark',
  ].join(', '),
  checkIconClass: 'h-4 w-4 text-success mr-1',
  xIconClass: 'h-4 w-4 text-error mr-1',
};
export const getUnionMembershipClass = (value?: string) => {
  switch (value) {
    case UnionMembership.BCGEU:
      return tableClasses.bcgeu;
    case UnionMembership.EXCLUDED:
      return tableClasses.excluded;
    case UnionMembership.PEA:
      return tableClasses.pea;
    default:
      return tdClass;
  }
};

export const getAvailabilityClass = (value: AvailabilityTypeName) => {
  switch (value) {
    case AvailabilityTypeName.AVAILABLE:
      return 'text-success';
    case AvailabilityTypeName.UNAVAILABLE:
      return 'text-error'
    case AvailabilityTypeName.DEPLOYED:
      return 'text-warning'
    default:
      return ""
  }
};
export const iconClass = (value: boolean) => {
  return value ? tableClasses.checkIconClass : tableClasses.xIconClass;
};
