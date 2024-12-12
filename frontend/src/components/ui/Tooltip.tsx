import { Tooltip as MuiTooltip } from '@material-tailwind/react';
import type { ReactNode } from 'react';

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
          className="bg-blue-200 text-blue-800"
          disabled={disabled}
        >
          {children}
        </MuiTooltip>
      )}
    </>
  );
};
