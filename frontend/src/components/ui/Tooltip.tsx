import { Tooltip as MuiTooltip } from '@material-tailwind/react';
import { ReactNode } from 'react';

export const Tooltip = ({
  children,
  content,
  placement,
  disabled,
}: {
  children: ReactNode;
  content: string;
  placement: string;
  disabled?: boolean;
}) => {
  return (
    <>
      {disabled ? (
        <>{children}</>
      ) : (
        <MuiTooltip
          content={content}
          placement={placement}
          className="bg-infoBannerLight text-info"
          disabled={disabled}
        >
          {children}
        </MuiTooltip>
      )}
    </>
  );
};
