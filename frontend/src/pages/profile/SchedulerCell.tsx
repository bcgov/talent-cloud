import dayjs from 'dayjs';
import type { AvailabilityInterface } from '../dashboard';
import { format } from 'date-fns';
import { offsetTimezoneDate } from '@/utils';

export const Cell = ({
  availability,
  cellClass,
  startClass,
  textClass,
  cellClick,
  truncate,
}: {
  availability: AvailabilityInterface;
  cellClass: string;
  startClass?: string;
  textClass?: string;
  cellClick?: () => void;
  truncate?: boolean;
}) => {
  return (
    <button
      className={availability?.start && !!startClass ? startClass : cellClass}
      onClick={cellClick}
      onKeyDown={() => {}}
      aria-label="open scheduler day"
      type="button"
    >
      <div className="flex flex-col h-full">
        <div className="flex-grow">
          {availability?.date && dayjs().isSame(availability?.date, 'day') && (
            <span className="font-bold text-calGreenText text-xs">Today</span>
          )}
        </div>
        {availability?.start && availability?.availabilityType && textClass && (
          <>
            <span className={`${textClass} font-bold truncate-small`}>
              {truncate
                ? availability.availabilityType.toUpperCase().charAt(0)
                : availability.availabilityType.toUpperCase()}
            </span>
            {!truncate && (
              <span className={textClass}>
                {format(offsetTimezoneDate(availability.groupStartDate!), 'MMM dd')}-
                {format(offsetTimezoneDate(availability.groupEndDate!), 'MMM dd')}
              </span>
            )}
          </>
        )}
      </div>
    </button>
  );
};
