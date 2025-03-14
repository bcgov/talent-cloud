import { useEffect, useState } from 'react';
import { Button, Select, Option } from '@material-tailwind/react';
import dayjs from 'dayjs';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'; // Add this import

export const MemberSchedulerControl = ({
  onChangeAvailabilityDates,
}: {
  onChangeAvailabilityDates: (from: string, to: string) => void;
}) => {
  const numMonthsItems = [1, 3, 6, 12];

  const [fromMonth, setFromMonth] = useState<number>(new Date().getMonth() + 1);
  const [fromYear, setFromYear] = useState<number>(new Date().getFullYear());
  const [toMonth, setToMonth] = useState<number>(new Date().getMonth() + 6);
  const [toYear, setToYear] = useState<number>(new Date().getFullYear());
  const [numMonths, setNumMonths] = useState<number>(6);

  // When values change, then we send a reuqest
  useEffect(() => {
    const fromString = dayjs(`${fromYear}/${fromMonth}/01`).format('YYYY-MM-DD');
    const toString = dayjs(`${toYear}/${toMonth}/01`)
      .endOf('month')
      .format('YYYY-MM-DD');
    onChangeAvailabilityDates(fromString, toString);
  }, [fromMonth, fromYear, toMonth, toYear, numMonths]);

  return (
    <div className="flex flex-row items-center">
      <div>
        <Button
          variant="text"
          size="sm"
          className="text-blue-800 normal-case font-normal underline text-sm"
          placeholder={''}
          onClick={() => {
            const fromDate = dayjs(new Date());
            const toDate = fromDate.add(numMonths - 1, 'months');
            setFromMonth(fromDate.month() + 1);
            setFromYear(fromDate.year());
            setToMonth(toDate.month() + 1);
            setToYear(toDate.year());
          }}
        >
          Jump to Today
        </Button>
      </div>
      <div>
        <Button
          variant="text"
          size="sm"
          className="bg-calBlue p-1 mr-2"
          onClick={() => {
            const fromDate = dayjs(`${fromYear}/${fromMonth}/01`).subtract(
              1,
              'months',
            );
            const toDate = dayjs(`${toYear}/${toMonth}/01`).subtract(1, 'months');
            setFromMonth(fromDate.month() + 1);
            setFromYear(fromDate.year());
            setToMonth(toDate.month() + 1);
            setToYear(toDate.year());
          }}
        >
          <ChevronLeftIcon className="h-4 w-4 text-gray-600" />
        </Button>

        <Button
          variant="text"
          size="sm"
          className="bg-calBlue p-1"
          onClick={() => {
            const fromDate = dayjs(`${fromYear}/${fromMonth}/01`).add(1, 'months');
            const toDate = dayjs(`${toYear}/${toMonth}/01`).add(1, 'months');
            setFromMonth(fromDate.month() + 1);
            setFromYear(fromDate.year());
            setToMonth(toDate.month() + 1);
            setToYear(toDate.year());
          }}
        >
          <ChevronRightIcon className="h-4 w-4  text-gray-600" />
        </Button>
      </div>
      <div className="pl-6">
        <p className="text-sm font-bold">
          {dayjs(`${fromYear}/${fromMonth}/1`).format('MMMM, YYYY')}
        </p>
      </div>
      <div className="grow" />
      <div className="w-32 pb-2">
        <Select
          value={`${numMonths}`}
          placeholder={''}
          className="border-gray-200 rounded-sm"
          labelProps={{ className: 'hidden' }}
          aria-label="Select Number of Months"
          containerProps={{ className: 'min-w-px' }}
          onChange={(num) => {
            if (num) {
              // numMonths was changed, so we set TO to numMonths after FROM
              const monthsToAdd = parseInt(num, 10);
              setNumMonths(monthsToAdd);
              const fromDate = dayjs(`${fromYear}/${fromMonth}/01`);
              const toDate = fromDate.add(monthsToAdd - 1, 'months');
              setToMonth(toDate.month() + 1);
              setToYear(toDate.year());
            }
          }}
        >
          {numMonthsItems.map((num) => (
            <Option key={num} value={num.toString()} className="text-xs">
              {num} Month{num > 1 && 's'}
            </Option>
          ))}
        </Select>
      </div>
    </div>
  );
};
