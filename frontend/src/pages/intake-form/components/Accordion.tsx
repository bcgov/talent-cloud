// react
import {
  Accordion as MuiAccordion,
  AccordionHeader,
  AccordionBody,
} from '@material-tailwind/react';
import type { ReactElement } from 'react';
import { useState } from 'react';

// icons
import { PlusIcon, MinusIcon } from '@heroicons/react/24/solid';

export const Accordion = ({
  title,
  children,
}: {
  title: string;
  children: ReactElement;
}) => {
  const [open, setOpen] = useState(1);
  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);
  return (
    <section className="bg-white">
      <div>
        <MuiAccordion
          open={open === 0}
          icon={
            open ? (
              <PlusIcon className="w-[16px] h-[16px] fill-infoDark" />
            ) : (
              <MinusIcon className="w-[16px] h-[16px] fill-infoDark" />
            )
          }
        >
          <AccordionHeader
            onClick={() => handleOpen(1)}
            className="bg-white py-[8px] px-[15px] border-b border-disabledGray"
          >
            <div className="text-sm font-bold text-infoDark">
              <span>{title}</span>
            </div>
          </AccordionHeader>
          <AccordionBody className="pt-[20px] pb-[25px] px-[15px] text-sm">
            {children}
          </AccordionBody>
        </MuiAccordion>
      </div>
    </section>
  );
};
