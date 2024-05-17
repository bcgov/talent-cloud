import type { MouseEvent } from 'react';
import { useState } from 'react';
import { Accordion, AccordionHeader, AccordionBody } from '@material-tailwind/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import DetailsSection from './DetailsSection';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { useRole } from '@/hooks';
import { Role } from '@/common';

type DetailProps = {
  generalInformation: { title?: string; content?: string }[];
  contact: { title?: string; content?: string }[];
  organizational: { title?: string; content?: string }[];
  openEditProfilePopUp: (e: MouseEvent<HTMLElement>) => void;
};

const ProfileDetails = ({
  generalInformation,
  contact,
  organizational,
  openEditProfilePopUp,
}: DetailProps) => {
  const [open, setOpen] = useState(1);
  const { role } = useRole();

  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);
  const sections = [
    {
      title: 'General Information',
      columns: generalInformation,
    },
    {
      title: 'Contact',
      columns: contact,
    },
    {
      title: 'Organizational',
      columns: organizational,
    },
  ];
  return (
    <section className="bg-white">
      <div className="pt-6 lg:px-10">
        <Accordion
          className="border-2 border-slate-950"
          placeholder={'Member Details'}
          open={open === 1}
          icon={
            open ? (
              <ChevronUpIcon className="cursor-pointer  h-8 w-5 fill-[#606060]" />
            ) : (
              <ChevronDownIcon className="cursor-pointer h-8 w-5 fill-[#606060]" />
            )
          }
        >
          <AccordionHeader
            placeholder={'Member Details'}
            className="bg-grayBackground px-8"
            onClick={() => handleOpen(1)}
          >
            <div className=" w-full justify-between items-center flex lg:flex-row">
              <span>Member Details</span>
              {role && role === Role.COORDINATOR && (
                <button
                  aria-label="edit profile"
                  onClick={openEditProfilePopUp}
                  className="z-20 flex text-primaryBlue flex-row items-center"
                >
                  <PencilSquareIcon className="h-6 w-6" />
                  <span className="pl-2 font-normal underline text-sm">Edit</span>
                </button>
              )}
            </div>
          </AccordionHeader>

          <AccordionBody>
            {sections.map((itm) => (
              <>
                <DetailsSection title={itm.title} columns={itm.columns} />
                <div className="w-full border border-b-1 border-gray-300 col-span-1 lg:col-span-5 my-8"></div>
              </>
            ))}
          </AccordionBody>
        </Accordion>
      </div>
    </section>
  );
};

export default ProfileDetails;
