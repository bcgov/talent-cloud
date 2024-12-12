import { Transition } from '@headlessui/react';
import { useState } from 'react';
import { FAQ } from '../constants';
import { ChevronDownIcon } from '@/components/ui/Icons';

export const SupervisorDashboardHeaderBanner = ({
  recommitmentYear,
  recommitmentDate,
}: {
  recommitmentDate: string;
  recommitmentYear: number;
}) => {
  const [showFAQs, setShowFAQs] = useState(false);
  return (
    <div className="bg-infoBannerLight px-12 flex flex-col items-start justify-start text-left space-y-4  pt-20 pb-12">
      <h3>{`Supervisor Approval for ${recommitmentYear} CORE Recommitment`}</h3>
      <p>
        {
          "Please approve or decline your employees' participation for the upcoming season by "
        }
        <span className="font-bold">{recommitmentDate}</span>
        {
          " down below. If you have any concerns, please contact your member's CORE coordinator."
        }
      </p>
      <button
        onClick={() => setShowFAQs((showFAQs) => !showFAQs)}
        className="w-full"
      >
        <p className="w-full flex flex-row flex-nowrap no text-nowrap items-center justify-start space-x-2 font-bold text-blue-800 text-sm ">
          <span className="underline">{showFAQs ? 'Hide FAQs' : 'Show FAQs'}</span>
          <ChevronDownIcon />
        </p>
      </button>
      <Transition
        show={showFAQs}
        enter="transition-opacity ease-linear duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div>
          {FAQ.map((itm: any) => (
            <>
              <div className="pt-6 pb-3">{itm.title}</div>
              <div>{itm.content}</div>
            </>
          ))}
        </div>
      </Transition>
    </div>
  );
};
