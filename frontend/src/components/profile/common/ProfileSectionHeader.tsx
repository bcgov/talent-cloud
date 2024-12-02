import { Button } from '@material-tailwind/react';

interface ProfileSectionHeaderProps {
  title: string;
  callToAction?: string;
  onCallToActionClick?: () => void;
  description?: React.ReactNode;
  buttonText?: string;
  onButtonClick?: () => void;
  children: React.ReactNode;
}

export const ProfileSectionHeader: React.FC<ProfileSectionHeaderProps> = ({
  title,
  callToAction,
  onCallToActionClick,
  description,
  buttonText,
  onButtonClick,
  children,
}) => {
  return (
    <div className="w-full">
      {/* Top row with header and call to action */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        {callToAction && (
          <button
            onClick={onCallToActionClick}
            className="text-sm text-linkBlue underline hover:text-gray-700 transition-colors cursor-pointer"
          >
            {callToAction}
          </button>
        )}
      </div>

      {/* Optional middle row with description and button */}
      {(description || buttonText) && (
        <div className="flex justify-between items-center mb-6">
          {description && <>{description}</>}
          {buttonText && (
            <Button
              variant="filled"
              className="bg-primaryBlue normal-case text-md rounded-none py-1"
              onClick={onButtonClick}
            >
              {buttonText}
            </Button>
          )}
        </div>
      )}

      {/* Content section */}
      <div className="w-full">{children}</div>
    </div>
  );
};
