import type { ProfileDetail } from '@/pages/profile/types';
import { Tooltip } from '@material-tailwind/react';
// import { Tooltip } from '../../ui';

export const Detail = ({
  title,
  content,
  tooltipIcon,
  tooltipContent,
  tooltipTitle,
  tooltipClicked,
}: ProfileDetail) => {
  return (
    <div className="py-2">
      <div className="flex flex-row items-center space-x-1">
        <p className="subtext">{title}</p>
        {tooltipIcon && !tooltipTitle && <>{tooltipIcon}</>}
        {tooltipIcon && tooltipTitle && !tooltipClicked && (
          <Tooltip content={tooltipTitle} placement="bottom">
            <span>{tooltipIcon}</span>
          </Tooltip>
        )}
        {tooltipIcon && tooltipTitle && tooltipContent && tooltipClicked && (
          <button
            onClick={() =>
              tooltipClicked({ title: tooltipTitle, content: tooltipContent })
            }
          >
            {tooltipIcon}
          </button>
        )}
      </div>
      <p>{content}</p>
    </div>
  );
};
