import type { Program } from '@/common';
import { Status } from '@/common';

export const PersonnelStatus = ({
  status,
  program,
}: {
  status: Status | string;
  program?: Program;
}) => {
  if (status === Status.PENDING) {
    return (
      <span className="bg-infoBannerLight text-sm px-3 rounded-full mr-2">
        Pending {program && `(${program.toUpperCase()})`}{' '}
      </span>
    );
  }
  if (status === Status.ACTIVE) {
    return (
      <span className="bg-successBannerLight px-3 text-sm rounded-full mr-2">
        Active {program && `(${program.toUpperCase()})`}{' '}
      </span>
    );
  } else {
    return (
      <span className="bg-warningBannerLight px-3 text-sm rounded-full mr-2">
        Inactive {program && `(${program.toUpperCase()})`}{' '}
      </span>
    );
  }
};
