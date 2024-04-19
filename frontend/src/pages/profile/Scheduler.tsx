import { Accordion, AccordionHeader, AccordionBody } from '@material-tailwind/react';
import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import SchedulerHeader from './SchedulerHeader';
import SchedulerRow from './SchedulerRow';
import SchedulerControl from './SchedulerControl';
import type { AvailabilityInterface } from '../dashboard';
import dayjs from 'dayjs';
import type { DateRange } from 'react-day-picker';

const Scheduler = ({
  name,
  availability,
  availabilityQuery,

  onChangeAvailabilityDates,
  openSchedulerDialog,
}: {
  name: string;
  availability: AvailabilityInterface[];
  availabilityQuery: DateRange;
  onChangeAvailabilityDates: (range: DateRange) => void;

  openSchedulerDialog: (cell?: AvailabilityInterface) => void;
}) => {
  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(!open);
  const schedulerRows = availability.reduce(
    (acc: any, curr: AvailabilityInterface) => {
      const month = dayjs(curr.date).format('MMM');
      if (acc[month]) {
        acc[month].push(curr);
      } else {
        acc[month] = [curr];
      }
      return acc;
    },
    {},
  );

  const cellClick = (availability: AvailabilityInterface) => {
    openSchedulerDialog(availability);
  };

  return (
    <section className="bg-white">
      <div className="pt-6 px-10">
        <Accordion
          className="border-2 border-slate-950"
          placeholder={'Schedule'}
          open={open}
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
            onClick={handleOpen}
            className="bg-grayBackground px-8"
          >
            {`${name}'s Schedule`}
          </AccordionHeader>
          <AccordionBody className="px-8">
            <SchedulerControl
              onChangeAvailabilityDates={onChangeAvailabilityDates}
              availabilityQuery={availabilityQuery}
              addEventClicked={openSchedulerDialog}
            />
            <SchedulerHeader />
            {Object.keys(schedulerRows).map((month) => (
              <SchedulerRow
                key={month}
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
