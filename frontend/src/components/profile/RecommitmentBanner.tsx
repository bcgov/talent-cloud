import type { Program } from '@/common';
import { ButtonTypes } from '@/common';
import { Banner } from '../ui/Banner';
import { BannerType } from '@/common/enums/banner-enum';
import { Button } from '../ui/Button';
import type { ReactElement } from 'react';
import { Transition } from '@headlessui/react';

export const RecommitmentBanner = ({
  content,
  statusText,
  statusBg,
  statusTextBg,
  type = BannerType.RECOMMITMENT,
  buttonText,
  onClick,
  onClose,
  program,
  showBanner,
}: {
  content: ReactElement;
  statusText: string;
  statusBg: string;
  statusTextBg: string;
  type?: BannerType;
  buttonText?: string;
  onClick?: () => void;
  onClose?: (program?: Program) => void;
  program?: Program;
  showBanner: boolean;
}) => {
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
          content={
            <div className="flex flex-col w-full items-start text-left justify-start pl-4">
              <div className="flex flex-row justify-between items-start w-full">
                {content}
                <p className="flex flex-row flex-nowrap items-baseline">
                  <span className=" font-bold text-sm pl-40 pr-4">Status:</span>

                  <span
                    className={`${statusBg} text-sm rounded-xl px-3 text-nowrap items-center justify-center flex py-1 text-${statusTextBg}`}
                  >
                    {program?.toUpperCase()} {statusText}
                  </span>
                </p>
              </div>
              {statusText === 'Not Started' && (
                <div className="pt-4 text-sm">
                  <span className="font-bold text-sm text-infoDark pr-2">
                    Estimated Duration:
                  </span>
                  <span>10 minutes</span>
                </div>
              )}
              <div
                className={`flex flex-row space-x-12 items-baseline ${onClose && !onClick ? 'pt-6' : 'pt-1'}`}
              >
                {onClick && buttonText && (
                  <div className="pt-4 text-sm">
                    <Button
                      variant={ButtonTypes.TERTIARY}
                      text={buttonText}
                      onClick={onClick}
                    />
                  </div>
                )}
                {onClose && (
                  <button
                    className="underline text-info text-md"
                    onClick={() => onClose(program)}
                  >
                    Close
                  </button>
                )}
              </div>
            </div>
          }
          type={type}
        />
      </div>
    </Transition>
  );
};
