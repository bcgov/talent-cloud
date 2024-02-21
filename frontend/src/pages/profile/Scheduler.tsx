import { Accordion, AccordionHeader, AccordionBody } from '@material-tailwind/react';
import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import SchedulerHeader from './SchedulerHeader';
import SchedulerRow from './SchedulerRow';
import SchedulerControl from './SchedulerControl';

const Scheduler = ({ setAvailabilityQuery }: { setAvailabilityQuery: (from: string, to: string ) => void }) => {
  const [open, setOpen] = useState(1);
  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

  const data = [
    {
      date: '2024-02-01',
      status: 'Deployed',
    },
    {
      date: '2024-02-02',
      status: 'Deployed',
    },
    {
      date: '2024-02-03',
      status: 'Deployed',
    },
    {
      date: '2024-02-04',
      status: 'Deployed',
    },
    {
      date: '2024-02-05',
      status: 'Available',
    },
    {
      date: '2024-02-06',
      status: 'Available',
    },
    {
      date: '2024-02-07',
      status: 'Available',
    },
    {
      date: '2024-02-08',
      status: 'Unavailable',
    },
    {
      date: '2024-02-09',
      status: 'Unavailable',
    },
    {
      date: '2024-02-10',
      status: 'Unavailable',
    },
    {
      date: '2024-02-11',
      status: 'Available',
    },
    {
      date: '2024-02-12',
      status: 'Available',
    },
    {
      date: '2024-02-13',
      status: 'Deployed',
    },
    {
      date: '2024-02-14',
      status: 'Deployed',
    },
    {
      date: '2024-02-15',
      status: 'Deployed',
    },
    {
      date: '2024-02-16',
      status: 'Deployed',
    },
    {
      date: '2024-02-17',
      status: 'Deployed',
    },
    {
      date: '2024-02-18',
      status: 'Deployed',
    },
    {
      date: '2024-02-19',
      status: 'Deployed',
    },
    {
      date: '2024-02-20',
      status: 'Deployed',
    },
    {
      date: '2024-02-21',
      status: 'Deployed',
    },
    {
      date: '2024-02-22',
      status: 'Deployed',
    },
    {
      date: '2024-02-23',
      status: 'Deployed',
    },
    {
      date: '2024-02-24',
      status: 'Deployed',
    },
    {
      date: '2024-02-25',
      status: 'Deployed',
    },
    {
      date: '2024-02-26',
      status: 'Deployed',
    },
    {
      date: '2024-02-27',
      status: 'Deployed',
    },
    {
      date: '2024-02-28',
      status: 'Deployed',
    },
  ]

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
          Schedule
        </AccordionHeader>
        <AccordionBody className="px-8">
          <SchedulerControl setAvailabilityQuery={setAvailabilityQuery} />
          <SchedulerHeader />
          <SchedulerRow month="Mar" />
        </AccordionBody>
      </Accordion>
      </div>
    </section>
  );
}

export default Scheduler;