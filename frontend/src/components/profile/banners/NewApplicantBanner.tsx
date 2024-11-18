import { BannerType } from '@/common/enums/banner-enum';
import { Banner } from '@/components/ui/Banner';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { Program, Status } from '@/common';
import type { Personnel } from '@/common';
import { useState } from 'react';
import { ReviewApplicant } from './ReviewApplicant';
type BannerProps = {
  personnel: Personnel;
  program?: Program;
  updatePersonnel: (props: Partial<Personnel>) => void;
};

export const NewApplicantBanner = ({
  personnel,
  program,
  updatePersonnel,
}: BannerProps) => {
  const [openReviewApplicant, setOpenReviewApplicant] = useState(false);
  const handleOpenReviewApplicant = () => {
    setOpenReviewApplicant(!openReviewApplicant);
  };
  const emcrText =
    'This applicant is missing the following requirements to complete their profile review:';
  const bcwsText = `We are still missing the following information required for this applicant's approval. To approve this applicant as a member of BCWS, please first check if the following documents have been received by the regional fire centre email inbox, and update their status under`;

  const reviewItems =
    program === Program.EMCR
      ? [
          {
            key: 'Supervisor Approval',
            value: personnel?.approvedBySupervisor,
          },
          {
            key: 'Completed ICS Training',
            value: personnel?.icsTraining,
          },
        ]
      : [
          {
            key: 'Willingness Statement',
            value: personnel?.willingnessStatement,
          },
          {
            key: 'Signed ParQ Questionnaire',
            value: personnel?.parQ,
          },
          {
            key: 'Supervisor Approval',
            value: personnel?.approvedBySupervisor,
          },
          {
            key: 'TEAMS Orientation',
            value: personnel?.orientation,
          },
        ];
  const reviewComplete = reviewItems.every((itm) => itm.value === true);
  return (
    <div className="xl:mr-12">
      <div className="px-6 pb-12 bg-white pt-4">
        <Banner
          content={
            <p className="flex flex-col text-sm text-warningDark">
              <span className="font-bold">Pending Applicant Information Alert</span>
              <span className="pt-2">
                {reviewComplete ? (
                  <>
                    {
                      'This applicant fulfilled the following requirements for profile review:'
                    }
                  </>
                ) : program === Program.EMCR ? (
                  <>{emcrText}</>
                ) : (
                  <>
                    {bcwsText} <span className="font-bold">Applicant Details</span>.
                  </>
                )}
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
                  Please review the following details before clicking &apos;Complete
                  Review&apos;.
                </span>
              ) : (
                <span className="pt-2">
                  Please make sure to update the information above in{' '}
                  <span className="font-bold">Applicant Details</span> before
                  changing the applicant&apos;s status to &apos;Active&apos;.
                </span>
              )}
            </p>
          }
          onClick={reviewComplete ? handleOpenReviewApplicant : undefined}
          buttonText={'Complete Review'}
          type={BannerType.WARNING}
        />
      </div>
      <ReviewApplicant
        open={openReviewApplicant}
        onClose={handleOpenReviewApplicant}
        handleOpen={handleOpenReviewApplicant}
        onConfirm={() =>
          updatePersonnel({
            status: Status.ACTIVE,
          })
        }
      />
    </div>
  );
};
