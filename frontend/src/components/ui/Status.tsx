import { Status } from '@/common';

export const PersonnelStatus = ({ status }: { status: Status }) => {
  if (status === Status.PENDING) {
    return (
      <span className="bg-infoBannerLight px-2 rounded-full mr-2">
        Pending Approval
      </span>
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
