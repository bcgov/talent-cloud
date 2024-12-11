import {
  RecommitmentStatus,
  RecommitmentStatusLabel,
} from '@/common/enums/recommitment-status';

export const RecommitmentStatusChip = ({
  status,
}: {
  status: RecommitmentStatus;
}) => {
  const getClassName = (status: RecommitmentStatus) => {
    switch (status) {
      case RecommitmentStatus.PENDING:
        return 'text-warningDark bg-warningBannerLight';
      case RecommitmentStatus.MEMBER_COMMITTED:
        return 'text-info bg-infoBannerLight';
      case RecommitmentStatus.SUPERVISOR_APPROVED:
        return 'text-success bg-successBannerLight';
      case RecommitmentStatus.MEMBER_DENIED:
      case RecommitmentStatus.MEMBER_NO_RESPONSE:
      case RecommitmentStatus.SUPERVISOR_DENIED:
      case RecommitmentStatus.SUPERVISOR_NO_RESPONSE:
        return 'text-error bg-errorBannerLight';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div
      className={
        'px-6 py-1.5 rounded-full text-sm flex flex-row justify-center text-center ' +
        getClassName(status)
      }
    >
      {RecommitmentStatusLabel[status]}
    </div>
  );
};
