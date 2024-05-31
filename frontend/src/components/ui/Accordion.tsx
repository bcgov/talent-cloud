import {
  ChevronUpIcon,
  ChevronDownIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/solid';
import {
  Accordion as MuiAccordion,
  AccordionHeader,
  AccordionBody,
} from '@material-tailwind/react';
import type { ReactElement } from 'react';
import { useState } from 'react';
export const Accordion = ({
  title,
  onClick,
  children,
}: {
  title: string;
  onClick: () => void;
  children: ReactElement;
}) => {
  const [open, setOpen] = useState(1);
  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);
  return (
    <section className="bg-white">
      <div className="pt-6">
        <MuiAccordion
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
            className="bg-grayBackground"
          >
            <div className=" w-full justify-between items-center flex lg:flex-row px-8">
              <span>{title}</span>
              <button
                aria-label="edit functions"
                onClick={(e) => {
                  e.stopPropagation();
                  onClick();
                }}
                className="z-20 flex text-primaryBlue flex-row items-center"
              >
                <PencilSquareIcon className="h-6 w-6" />
                <span className="pl-2 font-normal underline text-sm">Edit</span>
              </button>
            </div>
          </AccordionHeader>
          <AccordionBody>{children}</AccordionBody>
        </MuiAccordion>
      </div>
    </section>
  );
};
