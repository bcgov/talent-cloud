import { BannerType } from '@/common/enums/banner-enum';
import type { Member } from '@/common';
import { Program } from '@/common';
import { RecommitmentBanner } from '../RecommitmentBanner';
import { RecommitmentStatus } from '@/common/enums/recommitment-status';

export const RecommitmentProfileBanner = ({
  year,
  endDate,
  member,
  handleClick,
  handleCloseBanner,
  showBanner,
  showEmcrBanner,
  showBcwsBanner,
}: {
  year: number;
  endDate: string;
  member: Member;
  handleClick: () => void;
  handleCloseBanner: (program?: Program) => void;
  showBanner: boolean;
  showEmcrBanner: boolean;
  showBcwsBanner: boolean;
}) => {
  const PendingContent = {
    content: (
      <p className="text-sm">
        <span className="font-bold text-sm">
          Confirm or decline your recommitment status for the upcoming year.
        </span>{' '}
        Please ensure that your profile details are up-to-date, before confirming
        your recommitment to CORE for {year} by{' '}
        <span className="font-bold text-sm">{endDate}</span>
      </p>
    ),
    buttonText: 'Make Recommitment Decision',
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

  const emcrStatus = member?.recommitment?.find(
    (itm) => itm.program === Program.EMCR,
  )?.status;
  const bcwsStatus = member?.recommitment?.find(
    (itm) => itm.program === Program.BCWS,
  )?.status;

  const renderProgramBanner = (
    status: RecommitmentStatus,
    showBanner: boolean,
    program?: Program,
  ) => {
    switch (status) {
      case RecommitmentStatus.PENDING:
        return (
          <RecommitmentBanner
            program={program}
            showBanner={showBanner}
            {...PendingContent}
          />
        );
      case RecommitmentStatus.MEMBER_COMMITTED:
        return (
          <RecommitmentBanner
            program={program}
            showBanner={showBanner}
            {...AcceptedContent}
          />
        );
      case RecommitmentStatus.MEMBER_DENIED:
        return (
          <RecommitmentBanner
            program={program}
            showBanner={showBanner}
            {...DeclinedContent}
          />
        );
      case RecommitmentStatus.SUPERVISOR_APPROVED:
        return (
          <RecommitmentBanner
            program={program}
            showBanner={showBanner}
            {...ApprovedContent}
          />
        );
      case RecommitmentStatus.SUPERVISOR_DENIED:
        return (
          <RecommitmentBanner
            program={program}
            showBanner={showBanner}
            {...RejectedContent}
          />
        );
    }
  };

  if (emcrStatus && bcwsStatus && emcrStatus === bcwsStatus) {
    return renderProgramBanner(emcrStatus, showBanner, Program.ALL);
  }
  if (!emcrStatus && bcwsStatus) {
    return renderProgramBanner(bcwsStatus, showBcwsBanner, Program.BCWS);
  }
  if (!bcwsStatus && emcrStatus) {
    return renderProgramBanner(emcrStatus, showEmcrBanner, Program.EMCR);
  }

  if (emcrStatus && bcwsStatus && emcrStatus !== bcwsStatus) {
    return (
      <div className="flex flex-col space-y-4">
        {renderProgramBanner(emcrStatus, showEmcrBanner, Program.EMCR)}
        {renderProgramBanner(bcwsStatus, showBcwsBanner, Program.BCWS)}
      </div>
    );
  }
};
