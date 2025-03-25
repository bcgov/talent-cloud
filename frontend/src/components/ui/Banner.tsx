// react
import type { ReactComponentElement, ReactElement } from 'react';

// enums
import { BannerType } from '@/common/enums/banner-enum';

// icons
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import { CloseIcon, ExclamationCircleIcon } from './Icons';
import { AlertType } from '@/providers/Alert';

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
  content:
    | string
    | ReactComponentElement<any, Pick<any, string | number | symbol>>
    | undefined;
  textColor: string;
  bgColor: string;
  icon: ReactElement;
  link?: { name: string; url: string };
  title?:
    | string
    | ReactComponentElement<any, Pick<any, string | number | symbol>>
    | undefined;
  onClick?: (props?: any) => void;
  buttonText?: string;
  onClose?: (props?: any) => void;
}) => (
  <div
    className={`flex flex-row py-2 px-6 rounded-md bg-${bgColor} items-start justify-between space-x-2 w-full  shadow-sm`}
  >
    <div
      className={`flex flex-row py-2  items-start justify-start space-x-2 w-full`}
    >
      <div className="pt-3 pr-2">{icon}</div>
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
  hideIcon,
}: {
  content:
    | string
    | ReactComponentElement<any, Pick<any, string | number | symbol>>
    | undefined;
  link?: { name: string; url: string };
  type: BannerType;
  onClick?: () => void;
  buttonText?: string;
  title?:
    | string
    | React.ReactComponentElement<any, Pick<any, string | number | symbol>>;
  onClose?: (props?: any) => void;
  hideIcon?: boolean;
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
              hideIcon ? (
                <></>
              ) : (
                <ExclamationCircleIcon
                  className="text-info  h-6 hidden sm:inline sm:mr-2"
                  type={AlertType.INFO}
                />
              )
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
            icon={
              hideIcon ? (
                <></>
              ) : (
                <ExclamationTriangleIcon className="text-warning  h-6 mx-2 " />
              )
            }
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
            icon={
              hideIcon ? <></> : <ExclamationCircleIcon className="text-info  " />
            }
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
              hideIcon ? (
                <></>
              ) : (
                <ExclamationCircleIcon
                  className="text-error  h-6 hidden sm:inline-block sm:mr-2"
                  type={AlertType.ERROR}
                />
              )
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
            textColor={'green-900'}
            bgColor={'successBannerLight'}
            link={link}
            buttonText={buttonText}
            icon={
              hideIcon ? (
                <></>
              ) : (
                <ExclamationCircleIcon
                  className="text-green-900  h-6 hidden sm:inline-block sm:mr-2"
                  type={AlertType.SUCCESS}
                />
              )
            }
          />
        );
    }
  };
  return renderBanner();
};
