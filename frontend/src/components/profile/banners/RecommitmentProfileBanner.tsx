import { BannerType } from '@/common/enums/banner-enum';
import { Program, type Personnel } from '@/common';
import { RecommitmentBanner } from '../RecommitmentBanner';
import { RecommitmentStatus } from '@/common/enums/recommitment-status';

export const RecommitmentProfileBanner = ({
  year,
  endDate,
  personnel,
  handleClick,
  handleCloseBanner,
}: {
  year: number;
  endDate: string;
  personnel: Personnel;
  handleClick: () => void;
  handleCloseBanner: () => void;
}) => {
  const PendingContent = {
    content: (
      <p className="text-sm">
        <span className="font-bold text-sm">
          Confirm your recommitment status for the upcoming year.
        </span>{' '}
        Please ensure that your profile details are up-to-date, before confirming
        your recommitment to CORE for {year} by{' '}
        <span className="font-bold text-sm">{endDate}</span>
      </p>
    ),
    buttonText: 'Start Recommitment',
    statusText: 'Not Started',
    statusBg: 'bg-errorBannerLight',
    statusTextBg: 'error',
    onClick: handleClick,
    type: BannerType.RECOMMITMENT,
  };

  const ApprovedContent = {
    content: (
      <p className="text-sm">
        <span className="font-bold">
          {"We have received your supervisor's approval for this year."}{' '}
        </span>
        You are expected to get called for future deployments, so please update your
        availability in your calendar, if needed. If you can no longer participate,
        please reach out to your coordinator.
      </p>
    ),
    onClose: handleCloseBanner,
    statusText: 'Approved',
    statusBg: 'bg-successBannerDark',
    statusTextBg: 'white',
    type: BannerType.SUCCESS,
  };

  const AcceptedContent = {
    content: (
      <p className="text-sm">
        <span className="font-bold">
          Thank you for confirming your return for this year.
        </span>{' '}
        You will be marked as “Active” once your supervisor approval is received.
        Please update your profile details if needed.
      </p>
    ),
    buttonText: 'Decline Recommitment',
    statusText: 'Pending Supervisor Approval',
    statusBg: 'bg-yellow-200',
    statusTextBg: 'bg-yellow-900',
    onClick: handleClick,
    onClose: handleCloseBanner,
    type: BannerType.RECOMMITMENT,
  };

  const DeclinedContent = {
    content: (
      <p className="text-sm">
        <span className="font-bold">
          You have declined recommitment to CORE for the upcoming year.{' '}
        </span>
        Sorry to see you go! We hope to welcome you back to CORE in the future. You
        can change your decision any time before{' '}
        <span className="font-bold">{endDate}</span>
      </p>
    ),
    onClick: handleClick,
    onClose: handleCloseBanner,
    buttonText: 'Change Decision',
    statusText: 'Declined',
    statusBg: 'bg-errorBannerLight',
    statusTextBg: 'error',
    type: BannerType.RECOMMITMENT,
  };

  const RejectedContent = {
    content: (
      <p>
        <span className="font-bold text-sm">
          Your supervisor has declined your recommitment to CORE for the upcoming
          year.
        </span>{' '}
        You will be marked as “inactive” for {year}. If you still wish to
        participate, please speak with your supervisor.
      </p>
    ),

    statusText: 'Declined by Supervisor',
    statusBg: 'bg-errorBannerLight',
    statusTextBg: 'error',
    type: BannerType.RECOMMITMENT,
    onClose: handleCloseBanner,
  };

  const renderBanner = () => {
    const emcrStatus = personnel?.recommitment?.find(
      (itm) => itm.program === Program.EMCR,
    )?.status;
    const bcwsStatus = personnel?.recommitment?.find(
      (itm) => itm.program === Program.BCWS,
    )?.status;

    if (
      emcrStatus === RecommitmentStatus.PENDING ||
      bcwsStatus === RecommitmentStatus.PENDING
    )
      return <RecommitmentBanner {...PendingContent} />;
    if (
      emcrStatus === RecommitmentStatus.MEMBER_DENIED ||
      bcwsStatus === RecommitmentStatus.MEMBER_DENIED
    )
      return <RecommitmentBanner {...DeclinedContent} />;
    if (
      emcrStatus === RecommitmentStatus.MEMBER_COMMITTED ||
      bcwsStatus === RecommitmentStatus.MEMBER_COMMITTED
    )
      return <RecommitmentBanner {...AcceptedContent} />;
    if (
      emcrStatus === RecommitmentStatus.SUPERVISOR_APPROVED ||
      bcwsStatus === RecommitmentStatus.SUPERVISOR_APPROVED
    )
      return <RecommitmentBanner {...ApprovedContent} />;
    if (
      emcrStatus === RecommitmentStatus.SUPERVISOR_DENIED ||
      bcwsStatus === RecommitmentStatus.SUPERVISOR_DENIED
    )
      return <RecommitmentBanner {...RejectedContent} />;
  };

  return renderBanner();
};
