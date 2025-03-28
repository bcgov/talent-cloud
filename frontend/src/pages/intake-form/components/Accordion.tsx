// react
import { MinusIcon, PlusIcon } from '@/components/ui/Icons';
import {
  Accordion as MuiAccordion,
  AccordionHeader,
  AccordionBody,
} from '@material-tailwind/react';
import type { ReactComponentElement, ReactElement } from 'react';
import { useState } from 'react';

// icons


export const Accordion = ({
  title,
  children,
}: {
  title:
    | string
    | ReactComponentElement<any, Pick<any, string | number | symbol>>
    | undefined;
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
              <PlusIcon fill="#1A5A96"/>
            ) : (
              <MinusIcon  />
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
