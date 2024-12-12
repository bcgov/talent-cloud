import { ButtonTypes } from '@/common';
import { Banner } from '../ui/Banner';
import { BannerType } from '@/common/enums/banner-enum';
import { Button } from '../ui/Button';
import type { ReactElement } from 'react';

export const RecommitmentBanner = ({
  content,
  statusText,
  statusBg,
  statusTextBg,
  type = BannerType.RECOMMITMENT,
  buttonText,
  onClick,
  onClose,
}: {
  content: ReactElement;
  statusText: string;
  statusBg: string;
  statusTextBg: string;
  type?: BannerType;
  buttonText?: string;
  onClick?: () => void;
  onClose?: () => void;
}) => {
  return (
    <Banner
      content={
        <div className="flex flex-col w-full items-start text-left justify-start pl-4">
          <div className="flex flex-row justify-between items-start w-full">
            {content}
            <p className="flex flex-row flex-nowrap items-baseline">
              <span className=" font-bold text-sm pl-16 pr-4">Status:</span>

              <span
                className={`${statusBg} text-sm rounded-xl px-3 text-nowrap items-center justify-center flex py-1 text-${statusTextBg}`}
              >
                {statusText}
              </span>
            </p>
          </div>
          {statusText === 'Not Started' && (
            <div className="pt-4 text-sm">
              <span className="font-bold text-sm text-blue-800Dark pr-2">
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
              <button className="underline text-blue-800 text-md" onClick={onClose}>
                Close
              </button>
            )}
          </div>
        </div>
      }
      type={type}
    />
  );
};
