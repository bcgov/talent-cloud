import { BannerType } from '@/common/enums/banner-enum';
import { Banner } from '@/components/ui/Banner';
import type { RecommitmentCycle } from '@/common';
import { Transition } from '@headlessui/react';
import { useState } from 'react';

// TODO - make me look nice
export const RecommitmentDashBanner = ({
  recommitment,
  isRecommitmentCycleOpen,
}: {
  recommitment: RecommitmentCycle;
  isRecommitmentCycleOpen: boolean;
}) => {
  const [showBanner, setShowBanner] = useState(isRecommitmentCycleOpen);
  const hideBanner = () => {
    setShowBanner(false);
  };

  return (
    <Transition
      show={showBanner}
      appear={true}
      enter="ease-out duration-100"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <div>
        <Banner
          type={BannerType.INFO}
          onClick={hideBanner}
          content={
            <p>
              <span className="font-bold">
                {recommitment.year} CORE recommitment reminders have been sent to
                members and supervisors.{' '}
              </span>
              Returning members with supervisor approval will be marked as
              Recommitted: {recommitment.year} in the coming weeks. Please monitor
              their status for any needed follow-up and ParQ review.
            </p>
          }
          onClose={hideBanner}
        />
      </div>
    </Transition>
  );
};
