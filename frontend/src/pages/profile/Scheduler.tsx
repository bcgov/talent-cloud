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
  openSchedulerDialog,
}: {
  name: string;
  availability: Availability[];
  onChangeAvailabilityDates: (from: string, to: string) => void;
  openSchedulerDialog: (
    from?: string,
    to?: string,
    availabilityType?: AvailabilityType,
    deploymentCode?: string,
  ) => void;
}) => {
  const [open, setOpen] = useState(1);
  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);
  const [schedulerRows, setSchedulerRows] = useState<{
    [key: string]: SchedulerRowItem[];
  }>({});

  useEffect(() => {
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
          date: availDay.date,
          status: availDay.availabilityType,
          actualStart: availDay.actualStartDate,
          actualEnd: availDay.actualEndDate,
        });
      } else {
        months[month] = [
          {
            date: availDay.date,
            status: availDay.availabilityType,
            actualStart: availDay.actualStartDate,
            actualEnd: availDay.actualEndDate,
          },
        ];
      }
    });
    if (startDates[startDay]) {
      const lastDay = availability[availability.length - 1];
      if (lastDay.actualEndDate) {
        const difference = dayjs(lastDay.actualEndDate).diff(startDay, 'days');
        startDates[startDay].numDays = difference + 1;
      } else {
        startDates[startDay].numDays = count;
      }
    }

    // For each start date, tell our `months` object which days are starters and how many days
    // This allows us to render the border and the text
    Object.keys(startDates).forEach((startDate) => {
      const date = dayjs(startDate);
      const month = date.format('MMM');
      const schedulerItems = months[month];
      const index = schedulerItems.findIndex(
        (i) => dayjs(i.date).format('D') === date.format('D'),
      );
      schedulerItems[index] = {
        ...schedulerItems[index],
        start: true,
        numDays: startDates[startDate].numDays,
      };
    });
    setSchedulerRows(months);
  }, [availability]);

  const cellClick = (date: string) => {
    const statusIndex = availability.findIndex((s) => s.date === date);
    if (statusIndex > -1) {
      const status = availability[statusIndex];
      if (status.availabilityType === AvailabilityType.NOT_INDICATED) {
        openSchedulerDialog(status.date, status.date);
      } else {
        // For all elements before (including this one), find the first break in availability type
        const elementsBefore = availability.slice(0, statusIndex + 1).reverse();
        const lastBreakIndex = elementsBefore.findIndex(
          (s) => s.availabilityType !== status.availabilityType,
        );
        const firstDateStatus =
          lastBreakIndex > -1 ? elementsBefore[lastBreakIndex - 1] : status;

        // For all elements after (including this one), find the next break in availability type
        const elementsAfter = availability.slice(statusIndex);
        const nextBreakIndex = elementsAfter.findIndex(
          (s) => s.availabilityType !== status.availabilityType,
        );
        const lastDateStatus =
          nextBreakIndex > -1 ? elementsAfter[nextBreakIndex - 1] : status;

        // Use actualStartDate / actualEndDate if it exists
        const availabilityType = status.availabilityType;
        const deploymentCode = status.deploymentCode;
        const firstDate = firstDateStatus.actualStartDate ?? firstDateStatus.date;
        const lastDate = firstDateStatus.actualEndDate ?? lastDateStatus.date;
        openSchedulerDialog(firstDate, lastDate, availabilityType, deploymentCode);
      }
    }
  };

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
              addEventClicked={() => openSchedulerDialog()}
            />
            <SchedulerHeader />
            {schedulerRows &&
              Object.keys(schedulerRows).map((month) => (
                <SchedulerRow
                  key={month}
                  year={dayjs(schedulerRows[month][0].date).format('YYYY')}
                  month={month}
                  data={schedulerRows[month]}
                  cellClick={cellClick}
                />
              ))}
          </AccordionBody>
        </Accordion>
      </div>
    </section>
  );
};

export default Scheduler;
