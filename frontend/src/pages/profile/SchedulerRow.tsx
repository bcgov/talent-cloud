import dayjs from 'dayjs';
import type { SchedulerRowItem } from '../dashboard';
import { AvailabilityType } from '@/common';

const Cell = ({
  dayOfMonthStatus,
  cellClass,
  startClass,
  textClass,
  month,
}: {
  dayOfMonthStatus?: {
    dayOfMonth: number;
    status: string;
    start?: boolean;
    numDays?: number;
  };
  cellClass: string;
  startClass?: string;
  textClass?: string;
  month?: string;
}) => {
  const startDateString =
    dayOfMonthStatus?.start && !!month
      ? `${month} ${dayOfMonthStatus.dayOfMonth} ${new Date().getFullYear()}`
      : '';
  const dateString = () => {
    const startDate = dayjs(startDateString);
    if (dayOfMonthStatus?.numDays) {
      const endDate = dayjs(startDateString).add(
        dayOfMonthStatus?.numDays - 1,
        'days',
      );
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
  if (dayOfMonthStatus?.dayOfMonth && status) {
    dates = dateString();
    if (
      dayOfMonthStatus?.numDays === 1 ||
      daysInMonth - dayOfMonthStatus?.dayOfMonth < 1
    ) {
      status = status.charAt(0);
      dates = '';
    }
  }

  return (
    <div
      className={dayOfMonthStatus?.start && !!startClass ? startClass : cellClass}
    >
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
  month,
  data,
}: {
  month: string;
  data: SchedulerRowItem[];
}) => {
  // Because setting variable classes doesn't tend to work, we define all classes ahead of time
  const availableStartClass =
    'h-20 border-l-4 border-calGreenTwo bg-calGreen hover:bg-calGreenHover cursor-pointer text-sm z-10 pl-2 pt-10';
  const availableClass =
    'h-20 border-l border-cyan-950 bg-calGreen hover:bg-calGreenHover cursor-pointer';
  const availableTextClass = `text-nowrap font-bold text-calGreenTwo text-xs`;
  const deployedStartClass =
    'h-20 border-l-4 border-calBlueTwo bg-calBlue hover:bg-calBlueHover cursor-pointer text-sm z-10 pl-2 pt-10';
  const deployedClass =
    'h-20 border-l border-cyan-950 bg-calBlue hover:bg-calBlueHover cursor-pointer';
  const deployedTextClass = `text-nowrap font-bold text-calBlueTwo text-xs`;
  const unavailableStartClass =
    'h-20 border-l-4 border-calRedTwo bg-calRed hover:bg-calRedHover cursor-pointer text-sm z-10 pl-2 pt-10';
  const unavailableClass =
    'h-20 border-l border-cyan-950 bg-calRed hover:bg-calRedHover cursor-pointer';
  const unavailableTextClass = `text-nowrap font-bold text-calRedTwo text-xs`;
  const notIndicatedClass =
    'h-20 border-l border-cyan-950 bg-white hover:bg-gray-200 cursor-pointer';
  const noDateClass = 'h-20 border-l border-cyan-950 bg-disabledGray';

  return (
    <div className="grid grid-cols-32 border border-cyan-950">
      <div className="h-20 border-l border-cyan-950 bg-white text-xs font-bold pl-1 pt-2">
        {month}
      </div>
      {[...Array(32).keys()].slice(1).map((dayOfMonth) => {
        const dayOfMonthStatus = data.find((d) => d.dayOfMonth === dayOfMonth);
        // Assumes all days in a month is part of the data
        if (!dayOfMonthStatus) {
          return <Cell cellClass={noDateClass} key={dayOfMonth} />;
        }
        switch (dayOfMonthStatus.status) {
          case AvailabilityType.DEPLOYED:
            return (
              <Cell
                dayOfMonthStatus={dayOfMonthStatus}
                cellClass={deployedClass}
                startClass={deployedStartClass}
                textClass={deployedTextClass}
                month={month}
                key={dayOfMonth}
              />
            );
          case AvailabilityType.AVAILABLE:
            return (
              <Cell
                dayOfMonthStatus={dayOfMonthStatus}
                cellClass={availableClass}
                startClass={availableStartClass}
                textClass={availableTextClass}
                month={month}
                key={dayOfMonth}
              />
            );
          case AvailabilityType.UNAVAILABLE:
            return (
              <Cell
                dayOfMonthStatus={dayOfMonthStatus}
                cellClass={unavailableClass}
                startClass={unavailableStartClass}
                textClass={unavailableTextClass}
                month={month}
                key={dayOfMonth}
              />
            );
          default:
            return <Cell cellClass={notIndicatedClass} key={dayOfMonth} />;
        }
      })}
    </div>
  );
};

export default SchedulerRow;
