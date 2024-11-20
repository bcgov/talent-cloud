import { BannerType } from '@/common/enums/banner-enum';
import {
  ArrowRightIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/solid';
import type { ReactElement } from 'react';

const InfoBanner = ({
  content,
  link,
}: {
  content: string | ReactElement;
  link?: { name: string; url: string };
}) => (
  <div className="flex flex-row py-2 px-4 rounded-sm bg-infoBannerLight items-center space-x-2 w-full">
    <span>
      <InformationCircleIcon className="text-info  h-6 hidden sm:inline sm:mr-2" />{' '}
    </span>
    <p className="text-info ">{content}</p>
    {link && (
      <a
        className="font-bold inline cursor-pointer"
        href={link.url}
        target={'_blank'}
        rel={'noopener noreferrer'}
      >
        {link.name}
        <ArrowRightIcon className="h-4 w-4 inline mb-1" />
      </a>
    )}
  </div>
);

const WarningBanner = ({
  content,
  link,
  onClick,
  buttonText,
}: {
  content: string | ReactElement;
  link?: { name: string; url: string };
  onClick?: () => void;
  buttonText?: string;
}) => (
  <div className="p-4 rounded-sm bg-warningBannerLight text-sm  flex flex-row justify-start space-x-4  w-auto">
    <div className="">
      <ExclamationTriangleIcon className="text-warning  h-6 mx-2 " />
    </div>
    <div className="flex flex-col justify-baseline">{content}</div>
    <div className="flex flex-col justify-start mx-4">
      {onClick ? (
        <button
          aria-label="banner button"
          className="bg-warningBannerDark flex flex-row flex-nowrap whitespace-nowrap rounded-md text-white leading-loose font-normal text-center px-4 py-2 text-sm h-12"
          onClick={onClick}
        >
          {buttonText}
        </button>
      ) : (
        <a
          className="font-bold inline"
          href={link?.url}
          target={'_blank'}
          rel={'noopener noreferrer'}
        >
          {link?.name}
        </a>
      )}
    </div>
  </div>
);

const ErrorBanner = ({
  content,
  link,
}: {
  content: string | ReactElement;
  link?: { name: string; url: string };
}) => (
  <div className="flex flex-row py-2 px-4 rounded-sm bg-errorBannerLight items-center space-x-2 w-full">
    <p className="text-error ">
      <InformationCircleIcon className="text-error  h-6 hidden sm:inline-block sm:mr-2" />
      {content}
      {link && (
        <a
          className="font-bold inline"
          href={link.url}
          target={'_blank'}
          rel={'noopener noreferrer'}
        >
          {link.name}
          <ArrowRightIcon className="h-4 w-4 inline mb-1" />
        </a>
      )}
    </p>
  </div>
);

const SuccessBanner = ({
  content,
  link,
}: {
  content: string | ReactElement;
  link?: { name: string; url: string };
}) => (
  <div className="flex flex-row py-2 px-4 rounded-sm bg-successBannerLight items-center space-x-2 w-full">
    <p className="text-success ">
      <InformationCircleIcon className="text-success  h-6 hidden sm:inline-block sm:mr-2" />
      {content}
      {link && (
        <a
          className="font-bold inline"
          href={link.url}
          target={'_blank'}
          rel={'noopener noreferrer'}
        >
          {link.name}
          <ArrowRightIcon className="h-4 w-4 inline mb-1" />
        </a>
      )}
    </p>
  </div>
);

export const Banner = ({
  content,
  link,
  type,
  onClick,
  buttonText,
}: {
  content: string | ReactElement;
  link?: { name: string; url: string };
  type: BannerType;
  onClick?: () => void;
  buttonText?: string;
}) => {
  const renderBanner = () => {
    switch (type) {
      case BannerType.INFO:
        return <InfoBanner content={content} link={link} />;
      case BannerType.WARNING:
        return (
          <WarningBanner
            content={content}
            link={link}
            onClick={onClick}
            buttonText={buttonText}
          />
        );
      case BannerType.ERROR:
        return <ErrorBanner content={content} link={link} />;
      case BannerType.SUCCESS:
        return <SuccessBanner content={content} link={link} />;
    }
  };
  return renderBanner();
};
