import { BannerType } from '@/common/enums/banner-enum';
import { Banner } from '@/components/ui/Banner';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { Route } from '../../providers';

type BannerProps = {
  reviewItems: { key: string; value: boolean }[];
  route?: Route;
  handleOpenReviewApplicant?: () => void;
};

export const NewApplicantBanner = ({
  reviewItems,
  route,
  handleOpenReviewApplicant,
}: BannerProps) => {
  const reviewComplete = reviewItems.every((itm) => itm.value === true);
  const emcrText =
    'This applicant is missing the following requirements to complete their profile review:';
  const bcwsText = `We are still missing the following information required for this applicant's approval. To approve this applicant as a member of BCWS, please first check if the following documents have been received by the regional fire centre email inbox, and update their status under Applicant Details.`;
  return (
    <div className="px-6 pb-12 bg-white w-full pt-4 lg:pl-48 ">
      <Banner
        content={
          <p className="flex flex-col text-sm text-warningDark">
            <span className="font-bold">Pending Applicant Information Alert</span>
            <span className="pt-2">
              {reviewComplete
                ? 'This applicant fulfilled the following requirements for profile review:'
                : route === Route.EMCR
                  ? emcrText
                  : bcwsText}
            </span>

            {reviewItems.map((itm) => (
              <span key={itm.key} className="pl-2 pt-1 flex flex-row">
                {itm.value === true ? (
                  <CheckIcon className="h-5 text-calGreenTwo" />
                ) : (
                  <XMarkIcon className="h-5 text-errorRed" />
                )}
                {itm.key}
              </span>
            ))}

            {reviewComplete ? (
              <span className="pt-2">
                Please Review the following details before clicking &apos;Complete
                Review&apos;.
              </span>
            ) : (
              <span className="pt-2">
                Please make sure to update the information above in{' '}
                <span className="font-bold">Applicant Details</span> before changing
                the applicant&apos;s status to &apos;Active&apos;.
              </span>
            )}
          </p>
        }
        onClick={reviewComplete ? handleOpenReviewApplicant : undefined}
        buttonText={'Complete Review'}
        type={BannerType.WARNING}
      />
    </div>
  );
};
