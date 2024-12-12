import { Status } from '@/common';

export const PersonnelStatus = ({ status }: { status: Status | string }) => {
  if (status === Status.PENDING) {
    return <span className="bg-blue-200 px-1 rounded-full mr-2">Pending</span>;
  }
  if (status === Status.ACTIVE) {
    return <span className="bg-sprout-200 px-2 rounded-full mr-2">Active</span>;
  } else {
    return <span className="bg-yellow-200 px-2 rounded-full mr-2">Inactive</span>;
  }
};
