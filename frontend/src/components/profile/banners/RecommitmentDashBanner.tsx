import { BannerType } from '@/common/enums/banner-enum';
import { Banner } from '@/components/ui/Banner';
import type { RecommitmentCycle } from '@/common';
import { Transition } from '@headlessui/react';
import { useState } from 'react';
import { format } from 'date-fns';

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
              {`The ${new Date(recommitment.endDate)?.getFullYear()} CORE recommitment period has begun and will end on ${format(new Date(recommitment?.endDate), 'MMMM do, yyyy') ?? ''}. Email reminders have been sent to active members and their supervisors. Returning members with supervisor approval will be marked as "Recommitted" in the coming weeks. Please monitor their status in case further communication is needed.`}
            </p>
          }
          onClose={hideBanner}
        />
      </div>
    </Transition>
  );
};
