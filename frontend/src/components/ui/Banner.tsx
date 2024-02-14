import { BannerType } from '@/common/enums/banner-enum';
import { ArrowRightIcon, InformationCircleIcon } from '@heroicons/react/24/solid';



export const Banner = ({
  content,
  link,
  type,
}: {
  content: string;
  link: { name: string; url: string };
  type: BannerType;
}) => {
  const renderBanner = () => {
    switch (type) {
      case BannerType.INFO:
        return <InfoBanner content={content} link={link} />;
      case BannerType.WARNING:
        return <WarningBanner content={content} link={link} />;
      case BannerType.ERROR:
        return <ErrorBanner content={content} link={link} />;
      case BannerType.SUCCESS:
        return <SuccessBanner content={content} link={link} />;
    }
  };
  return renderBanner();
};

const InfoBanner = ({
  content,
  link,
}: {
  content: string;
  link: { name: string; url: string };
}) => (
  <div className="flex flex-row py-2 px-4 rounded-sm bg-infoBannerLight items-center space-x-2 w-full">
    <InformationCircleIcon className="text-info  h-6" />
    <p className="text-info ">
      {content}
      <a className="font-bold inline" href={link.url}>
        {link.name}
        <ArrowRightIcon className="h-4 w-4 inline mb-1" />
      </a>
    </p>
  </div>
);

const WarningBanner = ({
  content,
  link,
}: {
  content: string;
  link: { name: string; url: string };
}) => (
  <div className="flex flex-row py-2 px-4 rounded-sm bg-warningBannerLight items-center space-x-2 w-full">
    <InformationCircleIcon className="warning-info  h-6" />
    <p className="warning-info ">
      {content}
      <a className="font-bold inline" href={link.url}>
        {link.name}
        <ArrowRightIcon className="h-4 w-4 inline mb-1" />
      </a>
    </p>
  </div>
);

const ErrorBanner = ({
  content,
  link,
}: {
  content: string;
  link: { name: string; url: string };
}) => (
  <div className="flex flex-row py-2 px-4 rounded-sm bg-errorBannerLight items-center space-x-2 w-full">
    <InformationCircleIcon className="text-error  h-6" />
    <p className="text-info ">
      {content}
      <a className="font-bold inline" href={link.url}>
        {link.name}
        <ArrowRightIcon className="h-4 w-4 inline mb-1" />
      </a>
    </p>
  </div>
);

const SuccessBanner = ({
  content,
  link,
}: {
  content: string;
  link: { name: string; url: string };
}) => (
  <div className="flex flex-row py-2 px-4 rounded-sm bg-sucessBannerLight items-center space-x-2 w-full">
    <InformationCircleIcon className="text-success  h-6" />
    <p className="text-success ">
      {content}
      <a className="font-bold inline" href={link.url}>
        {link.name}
        <ArrowRightIcon className="h-4 w-4 inline mb-1" />
      </a>
    </p>
  </div>
);
