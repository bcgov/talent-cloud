import { Program } from '@/common';
import { ButtonTypes } from '@/common';
import { Banner } from '../ui/Banner';
import { BannerType } from '@/common/enums/banner-enum';
import { Button } from '../ui/Button';
import type { ReactElement } from 'react';
import { BannerTransition } from '../ui/BannerTransition';

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
    <BannerTransition show={showBanner}>
      <Banner
        content={
          <div className="flex flex-col  items-start text-left justify-start pl-4">
            <div className="flex flex-row justify-between items-start w-full">
              {content}
              <p className="flex flex-row flex-nowrap items-baseline">
                <span className=" font-bold text-sm pl-40 pr-4">Status:</span>

                <span
                  className={`${statusBg} text-sm rounded-xl px-3 text-nowrap items-center justify-center flex py-1 text-${statusTextBg}`}
                >
                  {program !== Program.ALL && program?.toUpperCase()} {statusText}
                </span>
              </p>
            </div>
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
    </BannerTransition>
  );
};
