import { AvailabilityTypeName, UnionMembership } from '@/common';

export const tableClass = {
  rowClass: 'flex flex-row items-center justify-start text-sm',
  tdClass: 'text-dark-710 text-sm px-6 py-4 whitespace-nowrap',
  classificationClass:
    'block font-bold border border-gray rounded-md  mr-8 text-center ',
};

export const getUnionMembershipClass = (value?: string) => {
  switch (value) {
    case UnionMembership.BCGEU:
      return `${tableClass.classificationClass} text-info bg-infoBannerLight border-infoDark`;
    case UnionMembership.EXCLUDED:
      return `${tableClass.classificationClass} text-error bg-errorBannerLight border-error`;
    case UnionMembership.PEA:
      return `${tableClass.classificationClass} text-successDark bg-successBannerLight border-successDark`;
    default:
      return;
  }
};

export const getAvailabilityClass = (value: AvailabilityTypeName) => {
  switch (value) {
    case AvailabilityTypeName.AVAILABLE:
      return 'text-success';
    case AvailabilityTypeName.UNAVAILABLE:
      return 'text-error';
    case AvailabilityTypeName.DEPLOYED:
      return 'text-info';
    default:
      return 'text-warning';
  }
};
export const iconClass = (value: boolean) => {
  return value ? 'h-4 w-4 text-success mr-1' : 'h-4 w-4 text-error mr-1';
};

export const pendingIconClass = (value: boolean) => {
  return value ? 'h-4 w-4 text-success mr-1' : 'h-4 w-4 text-warning mr-1';
};
