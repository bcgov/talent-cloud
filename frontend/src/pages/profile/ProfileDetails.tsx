import { useState } from 'react';
import { Accordion, AccordionHeader, AccordionBody } from '@material-tailwind/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import DetailsSection from './DetailsSection';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { useRole } from '@/hooks';
import { Role } from '@/common';
import type { DetailProps } from './types';

const ProfileDetails = ({
  generalInformation,
  contact,
  organizational,
  pending,
  intakeRequirements,
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
      title: 'Contact Information',
      columns: contact,
    },
    {
      title: 'Organization Information',
      columns: organizational,
    },
  ];

  if (intakeRequirements) {
    sections.unshift({
      title: 'Intake Requirements',
      columns: intakeRequirements,
    });
  }
  return (
    <section className="bg-white">
      <div className="pt-6">
        <Accordion
          className="border-2 border-slate-950"
          placeholder={'Member Details'}
          open={open === 1}
          icon={
            open ? (
              <ChevronUpIcon className="cursor-pointer h-8 w-5 fill-[#606060]" />
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
              <span>{pending ? 'Applicant' : 'Member'} Details</span>
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
