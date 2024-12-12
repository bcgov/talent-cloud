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
      return `${tableClass.classificationClass} text-blue-800 bg-blue-200 border-blue-800`;
    case UnionMembership.EXCLUDED:
      return `${tableClass.classificationClass} text-red-600 bg-red-200 border-error`;
    case UnionMembership.PEA:
      return `${tableClass.classificationClass} text-leaf-700Dark bg-sprout-200 border-forest-900`;
    default:
      return;
  }
};

export const getAvailabilityClass = (value: AvailabilityTypeName) => {
  switch (value) {
    case AvailabilityTypeName.AVAILABLE:
      return 'text-leaf-700';
    case AvailabilityTypeName.UNAVAILABLE:
      return 'text-red-600';
    case AvailabilityTypeName.DEPLOYED:
      return 'text-blue-800';
    default:
      return 'text-yellow-900';
  }
};
export const iconClass = (value: boolean) => {
  return value ? 'h-4 w-4 text-leaf-700 mr-1' : 'h-4 w-4 text-red-600 mr-1';
};

export const pendingIconClass = (value: boolean) => {
  return value ? 'h-4 w-4 text-leaf-700 mr-1' : 'h-4 w-4 text-yellow-900 mr-1';
};
