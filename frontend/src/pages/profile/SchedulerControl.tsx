import { useEffect, useState } from 'react';
import {
  Button,
  Input,
  Popover,
  PopoverHandler,
  PopoverContent,
  Select,
  Option,
} from '@material-tailwind/react';
import dayjs from 'dayjs';
import { ArrowRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import MonthPicker from '@/components/ui/MonthPicker';

const SchedulerControl = ({
  onChangeAvailabilityDates,
}: {
  onChangeAvailabilityDates: (from: string, to: string) => void;
}) => {
  const numMonthsItems = [1, 3, 6, 12];

  const [fromMonth, setFromMonth] = useState<number>(new Date().getMonth() + 1);
  const [fromYear, setFromYear] = useState<number>(new Date().getFullYear());
  const [toMonth, setToMonth] = useState<number>(new Date().getMonth() + 3);
  const [toYear, setToYear] = useState<number>(new Date().getFullYear());
  const [numMonths, setNumMonths] = useState<number>(3);

  // When values change, then we send a reuqest
  useEffect(() => {
    const fromString = `${fromYear}-${fromMonth}-01`;
    const toString = dayjs(`${toYear}/${toMonth}/01`)
      .endOf('month')
      .format('YYYY-MM-DD');
    onChangeAvailabilityDates(fromString, toString);
  }, [fromMonth, fromYear, toMonth, toYear, numMonths]);

  return (
    <div className="flex flex-row">
      <div className="w-40 pt-1">
        <Button
          variant="text"
          size="sm"
          className="bg-calBlue normal-case"
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
      <div className="w-32">
        <Popover placement="bottom">
          <PopoverHandler>
            <Input
              icon={<ChevronDownIcon className="h-4 w-4 bg-calBlue" />}
              crossOrigin=""
              className="border-none"
              containerProps={{
                className: 'min-w-px',
              }}
              labelProps={{
                className: 'hidden',
              }}
              value={dayjs(`${fromYear}/${fromMonth}/1`).format('MMM YYYY')}
            />
          </PopoverHandler>
          <PopoverContent placeholder={''} className="z-50">
            <MonthPicker
              startYear={fromYear}
              onSelect={({ month, year }) => {
                // FROM was changed, so we set TO according to numMonths
                setFromMonth(month);
                setFromYear(year);
                const fromDate = dayjs(`${year}/${month}/01`);
                const toDate = fromDate.add(numMonths - 1, 'months');
                setToMonth(toDate.month() + 1);
                setToYear(toDate.year());
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <ArrowRightIcon className="h-10 w-4" />
      </div>
      <div className="w-32">
        <Popover placement="bottom">
          <PopoverHandler>
            <Input
              icon={<ChevronDownIcon className="h-4 w-4 bg-calBlue" />}
              crossOrigin=""
              className="border-none"
              containerProps={{
                className: 'min-w-px',
              }}
              labelProps={{
                className: 'hidden',
              }}
              value={dayjs(`${toYear}/${toMonth}/1`).format('MMM YYYY')}
            />
          </PopoverHandler>
          <PopoverContent placeholder={''} className="z-50">
            <MonthPicker
              startYear={toYear}
              onSelect={({ month, year }) => {
                // TO was changed, so we set FROM according to numMonths
                setToMonth(month);
                setToYear(year);
                const toDate = dayjs(`${year}/${month}/01`);
                const fromDate = toDate.subtract(numMonths - 1, 'months');
                setFromMonth(fromDate.month() + 1);
                setFromYear(fromDate.year());
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="grow" />
      <div className="w-32">
        <Select
          value={`${numMonths}`}
          placeholder={''}
          className="border-none"
          labelProps={{ className: 'hidden' }}
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

export default SchedulerControl;
