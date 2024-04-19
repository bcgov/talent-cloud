import { useState } from 'react';
import {
  Button,
  Input,
  Popover,
  PopoverHandler,
  PopoverContent,
  Select,
  Option,
} from '@material-tailwind/react';
import { ArrowRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import MonthPicker from '@/components/ui/MonthPicker';
import type { DateRange } from 'react-day-picker';
import { addMonths, format } from 'date-fns';

const SchedulerControl = ({
  availabilityQuery,
  onChangeAvailabilityDates,
  addEventClicked,
}: {
  availabilityQuery: DateRange;
  onChangeAvailabilityDates: (range: DateRange) => void;
  addEventClicked: () => void;
}) => {
  const numMonthsItems = [1, 3, 6, 12];
  const [numMonths, setNumMonths] = useState<number>(3);

  const fromDate = availabilityQuery.from ?? new Date();
  const toDate = availabilityQuery.to ?? new Date();
  return (
    <div className="flex flex-row">
      <div className="w-40 pt-1">
        <Button
          variant="text"
          size="sm"
          className="bg-calBlue normal-case"
          placeholder={''}
          onClick={() => {
            const date = new Date();
            const from = new Date(date.getFullYear(), date.getMonth(), 1);
            onChangeAvailabilityDates({
              to: new Date(from.getFullYear(), from.getMonth() + numMonths, 0),
              from,
            });
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
              value={format(fromDate, 'MMM yyyy')}
            />
          </PopoverHandler>
          <PopoverContent placeholder={''} className="z-50">
            <MonthPicker
              startYear={fromDate.getFullYear()}
              onSelect={({ month, year }) =>
                // FROM was changed, so we set TO according to numMonths
                onChangeAvailabilityDates({
                  to: new Date(year, month + numMonths, 0),
                  from: new Date(year, month, 1),
                })
              }
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
              value={format(toDate, 'MMM yyyy')}
            />
          </PopoverHandler>
          <PopoverContent placeholder={''} className="z-50">
            <MonthPicker
              startYear={toDate.getFullYear()}
              onSelect={({ month, year }) =>
                onChangeAvailabilityDates({
                  to: new Date(year, month + 1, 0),
                  from: new Date(year, month - numMonths, 1),
                })
              }
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="grow" />
      <div className="w-32">
        <Select
          value={numMonths.toString()}
          name={'numMonths'}
          placeholder={''}
          className="border-none"
          labelProps={{ className: 'hidden' }}
          aria-label="Select Number of Months"
          containerProps={{ className: 'min-w-px' }}
          onChange={(num) => {
            if (num) {
              const monthsToAdd = parseInt(num, 10);

              const toDate = addMonths(
                availabilityQuery?.from ?? new Date(),
                monthsToAdd,
              );
              setNumMonths(monthsToAdd);
              onChangeAvailabilityDates({
                to: new Date(toDate.getFullYear(), toDate.getMonth(), 0),
                from: availabilityQuery?.from ?? new Date(),
              });
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
      <div className="pt-2">
        <Button
          variant="text"
          aria-label="Update Availability"
          size="sm"
          className="bg-calBlueTwo text-white normal-case"
          placeholder={''}
          onClick={addEventClicked}
        >
          Update Availability
        </Button>
      </div>
    </div>
  );
};

export default SchedulerControl;
