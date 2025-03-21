import { Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { FAQ } from '../constants';
import { ChevronDownIcon, ChevronUpIcon } from '@/components/ui/Icons';

export const SupervisorDashboardHeaderBanner = ({
  recommitmentYear,
  recommitmentDate,
  isRecommitmentCycleOpen,
}: {
  recommitmentDate: string;
  recommitmentYear: number;
  isRecommitmentCycleOpen: boolean;
}) => {
  const [showFAQs, setShowFAQs] = useState(false);
  return (
    <div className="bg-infoBannerLight px-12 flex flex-col items-start justify-start text-left space-y-4  pt-20 pb-12">
      <h3>{`Supervisor Approval for ${recommitmentYear} CORE Recommitment`}</h3>
      {isRecommitmentCycleOpen ? 
      <p>
        {
          "Please approve or decline your employees' participation for the upcoming season by "
        }
        <span className="font-bold">{recommitmentDate}</span>
        {
          " down below. If you have any concerns, please contact your member's CORE coordinator."
        }
      </p> : <p><strong>{`The ${recommitmentYear} recommitment period has ended.`}</strong> All members with supervisor approval will be considered readily deployable for the year. Please keep an eye out for deployment requests as those will also require your approval.</p>}
      <button
        onClick={() => setShowFAQs((showFAQs) => !showFAQs)}
        className="w-full"
      >
        <p className="w-full flex flex-row flex-nowrap no text-nowrap items-center justify-start space-x-2 font-bold text-blue-800 text-sm ">
          <span className="underline">{showFAQs ? 'Hide FAQs' : 'Show FAQs'}</span>
          {showFAQs ? <ChevronUpIcon /> : <ChevronDownIcon />}
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
          {FAQ.map((itm: any, index: number) => (
            <Fragment key={itm.content + index.toString()}>
              <div className="pt-6 pb-3">{itm.title}</div>
              <div>{itm.content}</div>
            </Fragment>
          ))}
        </div>
      </Transition>
    </div>
  );
};
