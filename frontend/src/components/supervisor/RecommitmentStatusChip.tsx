import {
  RecommitmentStatus,
  RecommitmentStatusLabel,
} from '@/common/enums/recommitment-status';
import { Tooltip } from '@/components/ui/Tooltip';

export const RecommitmentStatusChip = ({
  status,
}: {
  status: RecommitmentStatus | string;
}) => {
  const getClassName = (status: RecommitmentStatus | string) => {
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
const getContent = (status: RecommitmentStatus|string) => {
  switch (status) {
    case RecommitmentStatus.PENDING:
      return 'Pending member recommitment. No action required at this time.';
    case RecommitmentStatus.MEMBER_COMMITTED:
      return 'Member recommitted. Supervisor approval required.';
    case RecommitmentStatus.SUPERVISOR_APPROVED:
      return 'Member recommitted and approved for the upcoming year.';
    case RecommitmentStatus.MEMBER_DENIED:
    case RecommitmentStatus.MEMBER_NO_RESPONSE:
    case RecommitmentStatus.SUPERVISOR_DENIED:
    case RecommitmentStatus.SUPERVISOR_NO_RESPONSE:
      return 'Member not returning in the upcoming year.';
    default:
      return 'text-gray-600';
  }
}
  return (
    <Tooltip  content={getContent(status)} placement={'bottom'}>
    <div
      className={
        'px-4 py-1.5 rounded-full text-sm flex flex-row justify-center text-center lg:min-w-[150px] ' +
        getClassName(status)
      }
    >
      {RecommitmentStatusLabel[status as keyof typeof RecommitmentStatus] ?? 'N/A'}
    </div>
    </Tooltip>
  );
};
