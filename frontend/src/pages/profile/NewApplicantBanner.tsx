import { BannerType } from '@/common/enums/banner-enum';
import { Banner } from '@/components/ui/Banner';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';

type BannerProps = {
  handleOpenReviewApplicant?: () => void;
  reviewItems: any[];
};

export const NewApplicantBanner = ({
  reviewItems,
  handleOpenReviewApplicant,
}: BannerProps) => {
  const reviewComplete = reviewItems.every((itm) => itm.value === true);
  return (
    <div className="px-6 pb-12 bg-white w-full pt-4 lg:pl-48 ">
      <Banner
        content={
          <p className="flex flex-col text-sm text-warningDark">
            <span className="font-bold">Complete Review Alert</span>
            <span className="pt-2">
              {reviewComplete
                ? 'This applicant fulfilled the following requirements for profile review:'
                : 'This applicant is missing the following requirements to complete their profile review:'}
            </span>

            {reviewItems.map((itm) => (
              <span key={itm.key} className="pl-2 flex flex-row">
                {itm.value === true ? (
                  <CheckIcon className="h-5 text-calGreenTwo" />
                ) : (
                  <XMarkIcon className="h-5 text-errorRed" />
                )}
                {itm.key}
              </span>
            ))}

            {reviewComplete ? (
              <span>
                Please Review the following details before clicking &apos;Complete
                Review&apos;.
              </span>
            ) : (
              <span>
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
