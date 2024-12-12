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
        return 'text-yellow-900Dark bg-yellow-200';
      case RecommitmentStatus.MEMBER_COMMITTED:
        return 'text-blue-800 bg-blue-200';
      case RecommitmentStatus.SUPERVISOR_APPROVED:
        return 'text-leaf-700 bg-sprout-200';
      case RecommitmentStatus.MEMBER_DENIED:
      case RecommitmentStatus.MEMBER_NO_RESPONSE:
      case RecommitmentStatus.SUPERVISOR_DENIED:
      case RecommitmentStatus.SUPERVISOR_NO_RESPONSE:
        return 'text-red-600 bg-red-200';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div
      className={
        'px-4 py-1.5 rounded-full text-sm flex flex-row justify-center text-center ' +
        getClassName(status)
      }
    >
      {RecommitmentStatusLabel[status]}
    </div>
  );
};
