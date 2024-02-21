import { useEffect, useState } from 'react';
import {
  Button,
  Input,
  Popover,
  PopoverHandler,
  PopoverContent,
  Select,
  Option,
} from "@material-tailwind/react";
import dayjs from 'dayjs';
import { ArrowRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import MonthPicker from '@/components/ui/MonthPicker';
 

const SchedulerControl = () => {
  const numMonthsItems = [1, 3, 6, 12];

  const [fromMonth, setFromMonth] = useState<number>(new Date().getMonth() + 1);
  const [fromYear, setFromYear] = useState<number>(new Date().getFullYear());
  const [toMonth, setToMonth] = useState<number>(new Date().getMonth() + 2);
  const [toYear, setToYear] = useState<number>(new Date().getFullYear());
  const [numMonths, setNumMonths] = useState<number>(1);
  const [numMonthsOpen, setNumMonthsOpen] = useState<boolean>(false);

  useEffect(() => {

  }, [fromMonth, fromYear, toMonth, toYear]);
  
  return (
    <div className="flex flex-row">
      <div className="w-40">
        <Button variant="text" size="sm" placeholder={''}>Jump to Today</Button>
      </div>
      <div className="w-32">
        <Popover placement="bottom">
          <PopoverHandler>
          <Input icon={<ChevronDownIcon className="h-4 w-4 bg-calBlue" />} crossOrigin="" className="border-none" containerProps={{
              className: "min-w-0",
            }} labelProps={{
              className: "hidden",
            }} value={dayjs(`${fromYear}/${fromMonth}/1`).format('MMM YYYY')} />
          </PopoverHandler>
          <PopoverContent placeholder={''} className="z-50">
            <MonthPicker onSelect={({ month, year }) => {
              setFromMonth(month);
              setFromYear(year);
              // TRIGGER SEARCH
            }} />
          </PopoverContent>
        </Popover>
      </div>
      <div><ArrowRightIcon className="h-10 w-4" /></div>
      <div className="w-32">
        <Popover placement="bottom">
          <PopoverHandler>
          <Input icon={<ChevronDownIcon className="h-4 w-4 bg-calBlue" />} crossOrigin="" className="border-none" containerProps={{
              className: "min-w-0",
            }} labelProps={{
              className: "hidden",
            }} value={dayjs(`${toYear}/${toMonth}/1`).format('MMM YYYY')} />
          </PopoverHandler>
          <PopoverContent placeholder={''} className="z-50">
            <MonthPicker onSelect={({ month, year }) => {
              setToMonth(month);
              setToYear(year);
              // TRIGGER SEARCH
            }} />
          </PopoverContent>
        </Popover>
      </div>
      <div className="grow" />
      <div className="w-28">
        <Select value={`${numMonths}`} placeholder={''} className='border-none' labelProps={{ className: "hidden" }} containerProps={{ className: "min-w-0" }} onChange={(s) => { console.log(s)}}>
          {numMonthsItems.map((num) => (
            <Option key={num} value={num.toString()} className="text-xs">{num} Month{num > 1 && 's'}</Option>
          ))}
        </Select>
      </div>
    </div>
  );
}

export default SchedulerControl;