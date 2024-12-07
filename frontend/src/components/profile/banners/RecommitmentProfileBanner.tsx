import { BannerType } from '@/common/enums/banner-enum';
import { Banner } from '@/components/ui/Banner';
import { ButtonTypes } from '@/common';
import { Transition } from '@headlessui/react';
import { Button } from '@/components/ui';

export const RecommitmentProfileBanner = ({
  year,
  endDate,
  showWarningBanner,
}: {
  year: number;
  endDate: string;
  showWarningBanner: boolean;
}) => {
  return (
    <Transition
      show={showWarningBanner}
      appear={true}
      enter="ease-out duration-100"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <Banner
        content={
          <div>
            <p className="text-sm">
              <span className="font-bold">
                Confirm your recommitment status for the upcoming year.
              </span>{' '}
              Please ensure that your profile details are up-to-date, before
              confirming your recommitment to CORE for {year} by{' '}
              <span className="font-bold">{endDate}</span>.
            </p>
            <div className="pt-4">
              <Button variant={ButtonTypes.TERTIARY} text={'Start Recommitment'} />
            </div>
          </div>
        }
        type={BannerType.WARNING}
      />
    </Transition>
  );
};
