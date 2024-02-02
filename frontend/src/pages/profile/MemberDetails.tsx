import { useState } from 'react';
import { Accordion, AccordionHeader, AccordionBody } from '@material-tailwind/react';
import MemberDetailsSection from './MemberDetailsSection';

function ArrowIcon({ id, open }: { id: number; open: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={6}
      stroke="currentColor"
      className={`${id === open ? 'rotate-180' : ''} h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

const MemberDetails = () => {
  const [open, setOpen] = useState(1);

  const handleOpen = (value: any) => setOpen(open === value ? 0 : value);

  return (
    <section className="bg-white">
      <div className="pb-12">
        <p>Last deployed 28 days ago</p>
      </div>
      <div className="pl-44 pr-12">
        <Accordion
          placeholder={'Hello'}
          open={open === 1}
          icon={<ArrowIcon id={1} open={open} />}
        >
          <AccordionHeader
            placeholder={'??'}
            onClick={() => handleOpen(1)}
            className="bg-grayBackground px-8"
          >
            Member Details
          </AccordionHeader>
          <AccordionBody className="px-8">
            <MemberDetailsSection />
            <MemberDetailsSection />
            <MemberDetailsSection />
          </AccordionBody>
        </Accordion>
      </div>
    </section>
  );
};

export default MemberDetails;
