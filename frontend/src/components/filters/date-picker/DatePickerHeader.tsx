import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useNavigation } from 'react-day-picker';
import type { CustomCaptionProps } from './interface';
import { ResetButton } from './ResetButton';
import { MonthSelector } from './MonthSelector';
import { YearSelector } from './YearSelector';
import { useEffect } from 'react';

export const DatePickerHeader = (props: CustomCaptionProps) => {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();

  useEffect(() => {
    if (props.startingDate) {
      goToMonth(props.startingDate);
    }
  }, []);
  return (
    <div className="flex flex-col justify-start w-full items-start">
      {props.hideResetButton !== true && (
        <ResetButton
          reset={props?.reset}
          goToMonth={goToMonth}
          onChange={props.onChange}
        />
      )}
      <div className="flex flex-row items-center justify-between w-full pl-2 space-x-8">
        <MonthSelector displayMonth={props.displayMonth} goToMonth={goToMonth} />
        <YearSelector displayMonth={props.displayMonth} goToMonth={goToMonth} />

        <div>
          <button
            aria-label="previous month"
            onClick={() => previousMonth && goToMonth(previousMonth)}
          >
            <ChevronLeftIcon className="h-4 w-4 stroke-4 text-icon" />
          </button>
          <button
            aria-label="next month"
            onClick={() => nextMonth && goToMonth(nextMonth)}
          >
            <ChevronRightIcon className="h-4 w-4 stroke-4 text-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};
