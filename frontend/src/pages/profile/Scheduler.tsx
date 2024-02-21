import { Accordion, AccordionHeader, AccordionBody } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import SchedulerHeader from './SchedulerHeader';
import SchedulerRow from './SchedulerRow';
import SchedulerControl from './SchedulerControl';
import type { Availability, SchedulerRowItem } from '../dashboard';
import dayjs from 'dayjs';
import { AvailabilityType } from '@/common';

const Scheduler = ({
  name,
  availability,
  onChangeAvailabilityDates,
}: {
  name: string;
  availability?: Availability[];
  onChangeAvailabilityDates: (from: string, to: string) => void;
}) => {
  const [open, setOpen] = useState(1);
  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);
  const [schedulerRows, setSchedulerRows] = useState<{
    [key: string]: SchedulerRowItem[];
  }>();

  useEffect(() => {
    if (availability) {
      // Rough code to parse backend response into cell items
      const months: { [key: string]: SchedulerRowItem[] } = {};
      // Dates where a new status starts
      const startDates: {
        [key: string]: { status: AvailabilityType; numDays: number };
      } = {};
      let count = 0;
      let lastStatus = '';
      let startDay = '';

      availability.forEach((availDay) => {
        const day = dayjs(availDay.date);
        const month = day.format('MMM');
        if (
          availDay.availabilityType === lastStatus &&
          availDay.availabilityType !== AvailabilityType.NOT_INDICATED
        ) {
          count++;
        } else if (availDay.availabilityType === AvailabilityType.NOT_INDICATED) {
          // This is a break in the group of days with one status, so we set numDays and reset
          if (startDates[startDay]) {
            startDates[startDay].numDays = count;
          }
          count = 0;
          lastStatus = '';
          startDay = '';
        } else {
          // For a new status, we close out the last one, and start anew
          if (startDates[startDay]) {
            startDates[startDay].numDays = count;
          }
          startDates[availDay.date] = {
            status: availDay.availabilityType,
            numDays: 1,
          };
          count = 1;
          lastStatus = availDay.availabilityType;
          startDay = availDay.date;
        }

        if (months[month]) {
          months[month].push({
            dayOfMonth: parseInt(day.format('D')),
            status: availDay.availabilityType,
          });
        } else {
          months[month] = [
            {
              dayOfMonth: parseInt(day.format('D')),
              status: availDay.availabilityType,
            },
          ];
        }
      });
      if (startDates[startDay]) {
        // To close out, we pretend that the last day ends the status
        // We may not want this, as a status may extend past this selected month
        startDates[startDay].numDays = count;
      }

      // For each start date, tell our `months` object which days are starters and how many days
      // This allows us to render the border and the text
      Object.keys(startDates).forEach((startDate) => {
        const date = dayjs(startDate);
        const month = date.format('MMM');
        const schedulerItems = months[month];
        const dayOfMonth = parseInt(date.format('D'));
        const index = schedulerItems.findIndex((i) => i.dayOfMonth === dayOfMonth);
        schedulerItems[index] = {
          ...schedulerItems[index],
          start: true,
          numDays: startDates[startDate].numDays,
        };
      });
      setSchedulerRows(months);
    }
  }, [availability]);

  return (
    <section className="bg-white">
      <div className="pt-6 px-10">
        <Accordion
          className="border-2 border-slate-950"
          placeholder={'Schedule'}
          open={open === 1}
          icon={
            open ? (
              <ChevronUpIcon className="h-8 w-5 fill-[#606060]" />
            ) : (
              <ChevronDownIcon className="h-8 w-5 fill-[#606060]" />
            )
          }
        >
          <AccordionHeader
            placeholder={'Schedule'}
            onClick={() => handleOpen(1)}
            className="bg-grayBackground px-8"
          >
            {`${name}'s Schedule`}
          </AccordionHeader>
          <AccordionBody className="px-8">
            <SchedulerControl
              onChangeAvailabilityDates={onChangeAvailabilityDates}
            />
            <SchedulerHeader />
            {schedulerRows &&
              Object.keys(schedulerRows).map((month) => (
                <SchedulerRow
                  key={month}
                  month={month}
                  data={schedulerRows[month]}
                />
              ))}
          </AccordionBody>
        </Accordion>
      </div>
    </section>
  );
};

export default Scheduler;
