import { Status } from '@/common';

export const PersonnelStatus = ({ status }: { status: Status | string }) => {
  if (status === Status.PENDING) {
    return (
      <span className="bg-infoBannerLight px-1 rounded-full mr-2">Pending</span>
    );
  }
  if (status === Status.ACTIVE) {
    return (
      <span className="bg-successBannerLight px-2 rounded-full mr-2">Active</span>
    );
  } else {
    return (
      <span className="bg-warningBannerLight px-2 rounded-full mr-2">Inactive</span>
    );
  }
};
