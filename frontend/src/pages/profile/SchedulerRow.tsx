import dayjs from 'dayjs';
import type { SchedulerRowItem } from '../dashboard';
import { AvailabilityType } from '@/common';
import {
  SCHEDULER_AVAILABLE_CLASS,
  SCHEDULER_AVAILABLE_START_CLASS,
  SCHEDULER_AVAILABLE_TEXT_CLASS,
  SCHEDULER_DEPLOYED_CLASS,
  SCHEDULER_DEPLOYED_START_CLASS,
  SCHEDULER_DEPLOYED_TEXT_CLASS,
  SCHEDULER_NOT_INDICATED_CLASS,
  SCHEDULER_NO_DATE_CLASS,
  SCHEDULER_UNAVAILABLE_CLASS,
  SCHEDULER_UNAVAILABLE_START_CLASS,
  SCHEDULER_UNAVAILABLE_TEXT_CLASS,
} from '@/utils';

const Cell = ({
  dayOfMonthStatus,
  dayOfMonth,
  cellClass,
  startClass,
  textClass,
  month,
  cellClick,
}: {
  dayOfMonthStatus?: {
    date: string;
    status: string;
    start?: boolean;
    numDays?: number;
    actualStart?: string;
    actualEnd?: string;
  };
  dayOfMonth: number;
  cellClass: string;
  startClass?: string;
  textClass?: string;
  month?: string;
  cellClick?: (date: string) => void;
}) => {
  const startDateString =
    dayOfMonthStatus?.start && !!month
      ? `${month} ${dayOfMonth} ${new Date().getFullYear()}`
      : '';
  const dateString = () => {
    const startDate = dayOfMonthStatus?.actualStart
      ? dayjs(dayOfMonthStatus.actualStart)
      : dayjs(startDateString);
    if (dayOfMonthStatus?.numDays) {
      const endDate = dayOfMonthStatus?.actualEnd
        ? dayjs(dayOfMonthStatus.actualEnd)
        : dayjs(startDateString).add(dayOfMonthStatus?.numDays - 1, 'days');
      const endDateString =
        startDate.month() === endDate.month()
          ? endDate.format('D')
          : endDate.format('MMM D');
      return `${startDate.format('MMM D')} - ${endDateString}`;
    }
    return startDate.format('MMM D');
  };

  let status = dayOfMonthStatus?.status;
  let dates = '';

  const daysInMonth = dayjs(startDateString).daysInMonth();
  if (dayOfMonth && status) {
    dates = dateString();
    if (dayOfMonthStatus?.numDays === 1 || daysInMonth - dayOfMonth < 1) {
      status = status.charAt(0);
      dates = '';
    }
  }

  return (
    <div
      className={dayOfMonthStatus?.start && !!startClass ? startClass : cellClass}
      onClick={() =>
        dayOfMonthStatus && cellClick && cellClick(dayOfMonthStatus.date)
      }
      onKeyDown={() => {}}
      role="button"
    >
      {dayjs().isSame(dayOfMonthStatus?.date, 'date') && (
        <div className="text-center">
          <span className="font-bold text-xs">Today</span>
        </div>
      )}
      {dayOfMonthStatus?.start &&
        dayOfMonthStatus?.numDays &&
        status &&
        textClass && (
          <div className="flex flex-col">
            <span className={`${textClass} font-bold`}>{status}</span>
            <span className={textClass}>{dates}</span>
          </div>
        )}
    </div>
  );
};

const SchedulerRow = ({
  year,
  month,
  data,
  cellClick,
}: {
  year: string;
  month: string;
  data: SchedulerRowItem[];
  cellClick: (dayOfMonth: string) => void;
}) => {
  // Because setting variable classes doesn't tend to work, we define all classes ahead of time
  return (
    <div className="grid grid-cols-32 border border-cyan-950">
      <div className="h-20 border-l border-cyan-950 bg-white text-xs font-bold pl-1 pt-2">
        {month}
      </div>
      {[...Array(32).keys()].slice(1).map((dayOfMonth) => {
        const dayOfMonthStatus = data.find(
          (d) => parseInt(dayjs(d.date).format('D')) === dayOfMonth,
        );
        // Assumes all days in a month is part of the data
        if (!dayOfMonthStatus) {
          return (
            <Cell
              cellClass={SCHEDULER_NO_DATE_CLASS}
              dayOfMonth={dayOfMonth}
              key={dayOfMonth}
            />
          );
        }
        switch (dayOfMonthStatus.status) {
          case AvailabilityType.DEPLOYED:
            return (
              <Cell
                dayOfMonthStatus={dayOfMonthStatus}
                cellClass={SCHEDULER_DEPLOYED_CLASS}
                startClass={SCHEDULER_DEPLOYED_START_CLASS}
                textClass={SCHEDULER_DEPLOYED_TEXT_CLASS}
                month={month}
                dayOfMonth={dayOfMonth}
                key={dayOfMonth}
                cellClick={cellClick}
              />
            );
          case AvailabilityType.AVAILABLE:
            return (
              <Cell
                dayOfMonthStatus={dayOfMonthStatus}
                cellClass={SCHEDULER_AVAILABLE_CLASS}
                startClass={SCHEDULER_AVAILABLE_START_CLASS}
                textClass={SCHEDULER_AVAILABLE_TEXT_CLASS}
                month={month}
                dayOfMonth={dayOfMonth}
                key={dayOfMonth}
                cellClick={cellClick}
              />
            );
          case AvailabilityType.UNAVAILABLE:
            return (
              <Cell
                dayOfMonthStatus={dayOfMonthStatus}
                cellClass={SCHEDULER_UNAVAILABLE_CLASS}
                startClass={SCHEDULER_UNAVAILABLE_START_CLASS}
                textClass={SCHEDULER_UNAVAILABLE_TEXT_CLASS}
                month={month}
                dayOfMonth={dayOfMonth}
                key={dayOfMonth}
                cellClick={cellClick}
              />
            );
          default:
            return (
              <Cell
                cellClass={SCHEDULER_NOT_INDICATED_CLASS}
                key={dayOfMonth}
                dayOfMonth={dayOfMonth}
                dayOfMonthStatus={{
                  date: dayjs(`${month} ${dayOfMonth}, ${year}`).format(
                    'YYYY-MM-DD',
                  ),
                  status: AvailabilityType.NOT_INDICATED,
                }}
                cellClick={cellClick}
              />
            );
        }
      })}
    </div>
  );
};

export default SchedulerRow;
