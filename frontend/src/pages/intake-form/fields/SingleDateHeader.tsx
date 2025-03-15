import { MonthSelector } from '@/components/filters/date-picker/MonthSelector';
import { YearSelector } from '@/components/filters/date-picker/YearSelector';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import type { CaptionProps } from 'react-day-picker';
import { useNavigation } from 'react-day-picker';

export const SingleDateHeader = (props: CaptionProps) => {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();
  return (
    <div className="flex flex-row justify-start w-full items-start">
      <div className="flex flex-row items-center justify-between px-3 w-full  space-x-2">
        <MonthSelector displayMonth={props.displayMonth} goToMonth={goToMonth} />
        <YearSelector displayMonth={props.displayMonth} goToMonth={goToMonth} />

        <button
          aria-label="previous month"
          onClick={() => previousMonth && goToMonth(previousMonth)}
        >
          <ChevronLeftIcon className="h-5 w-5 stroke-4  text-black mb-2" />
        </button>
        <button
          aria-label="next month"
          onClick={() => nextMonth && goToMonth(nextMonth)}
        >
          <ChevronRightIcon className="h-5 w-5 stroke-4  text-black mb-2" />
        </button>
      </div>
    </div>
  );
};
