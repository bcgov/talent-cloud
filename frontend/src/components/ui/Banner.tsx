import { BannerType } from '@/common/enums/banner-enum';
import {
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/solid';
import type { ReactElement } from 'react';
import { CloseIcon, ExclamationCircleIcon } from './Icons';

export const CustomBanner = ({
  content,
  textColor,
  bgColor,
  icon,
  link,
  title,
  onClick,
  buttonText,
  onClose,
}: {
  content: string | ReactElement;
  textColor: string;
  bgColor: string;
  icon: ReactElement;
  link?: { name: string; url: string };
  title?: string;
  onClick?: (props?: any) => void;
  buttonText?: string;
  onClose?: (props?: any) => void;
}) => (
  <div
    className={`flex flex-row py-4 px-6 rounded-md bg-${bgColor} items-start justify-between space-x-2 w-full  shadow-lg`}
  >
    <div
      className={`flex flex-row py-4 px-6 items-start justify-start space-x-2 w-full`}
    >
      <div className="pt-3">{icon}</div>
      <div className="flex flex-col">
        {title && (
          <div className={`text-sm font-bold text-${textColor}`}>{title}</div>
        )}
        <div className={`text-sm pt-2 text-${textColor}`}>{content}</div>
      </div>
    </div>
    {onClose && (
      <button onClick={onClose}>
        <CloseIcon color={`text-${textColor}`} />
      </button>
    )}

    {link && (
      <a
        className="font-bold inline cursor-pointer"
        href={link.url}
        target={'_blank'}
        rel={'noopener noreferrer'}
      >
        {link.name}
      </a>
    )}
    {onClick && (
      <button
        aria-label="banner button"
        className={`bg-${textColor} flex flex-row flex-nowrap whitespace-nowrap rounded-md text-white leading-loose font-normal text-center px-4 py-2 text-sm h-12`}
        onClick={onClick}
      >
        {buttonText}
      </button>
    )}
  </div>
);

export const Banner = ({
  content,
  link,
  type,
  onClick,
  buttonText,
  title,
  onClose,
}: {
  content: string | ReactElement;
  link?: { name: string; url: string };
  type: BannerType;
  onClick?: () => void;
  buttonText?: string;
  title?: string;
  onClose?: (props?: any) => void;
}) => {
  const renderBanner = () => {
    switch (type) {
      case BannerType.INFO:
        return (
          <CustomBanner
            onClose={onClose}
            content={content}
            title={title}
            onClick={onClick}
            textColor={'info'}
            bgColor={'infoBannerLight'}
            link={link}
            buttonText={buttonText}
            icon={
              <InformationCircleIcon className="text-info  h-6 hidden sm:inline sm:mr-2" />
            }
          />
        );
      case BannerType.WARNING:
        return (
          <CustomBanner
            onClose={onClose}
            content={content}
            title={title}
            onClick={onClick}
            textColor={'yellow-900'}
            bgColor={'warningBannerLight'}
            link={link}
            buttonText={buttonText}
            icon={<ExclamationTriangleIcon className="text-warning  h-6 mx-2 " />}
          />
        );
      case BannerType.RECOMMITMENT:
        return (
          <CustomBanner
            onClose={onClose}
            content={content}
            title={title}
            onClick={onClick}
            textColor={'warning'}
            bgColor={'warningBannerLight'}
            link={link}
            buttonText={buttonText}
            icon={<ExclamationCircleIcon className="text-info  " />}
          />
        );
      case BannerType.ERROR:
        return (
          <CustomBanner
            onClose={onClose}
            content={content}
            title={title}
            onClick={onClick}
            textColor={'error'}
            bgColor={'errorBannerLight'}
            link={link}
            buttonText={buttonText}
            icon={
              <InformationCircleIcon className="text-error  h-6 hidden sm:inline-block sm:mr-2" />
            }
          />
        );
      case BannerType.SUCCESS:
        return (
          <CustomBanner
            onClose={onClose}
            content={content}
            title={title}
            onClick={onClick}
            textColor={'success'}
            bgColor={'successBannerLight'}
            link={link}
            buttonText={buttonText}
            icon={
              <InformationCircleIcon className="text-success  h-6 hidden sm:inline-block sm:mr-2" />
            }
          />
        );
    }
  };
  return renderBanner();
};
