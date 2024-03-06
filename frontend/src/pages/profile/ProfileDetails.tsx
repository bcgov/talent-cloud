import type { MouseEvent } from 'react';
import { useState } from 'react';
import { Accordion, AccordionHeader, AccordionBody } from '@material-tailwind/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import DetailsSection from './DetailsSection';
import type { Personnel } from '../dashboard';
import dayjs from 'dayjs';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

const ProfileDetails = ({
  personnel,
  openEditPopUp,
}: {
  personnel: Personnel;
  openEditPopUp: (e: MouseEvent<HTMLElement>) => void;
}) => {
  const [open, setOpen] = useState(1);

  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);
  const generalInformation = [
    {
      title: 'Work Location, Region',
      content: `${personnel.workLocation.locationName}, ${personnel.workLocation.region}`,
    },
    {
      title: 'Remote Only',
      content: `${personnel.remoteOnly === true ? 'Yes' : 'No'}`,
    },
    {
      title: 'Home Location, Region',
      content: `${personnel.homeLocation.locationName}, ${personnel.homeLocation.region}`,
    },
    {
      title: 'Willingness to Travel',
      content: `${personnel.willingToTravel === true ? 'Yes' : 'No'}`,
    },
    {
      title: 'Date Joined',
      content: dayjs(personnel.applicationDate).format('MMMM D, YYYY'),
    },
  ];

  const contact = [
    {
      title: 'Primary Number',
      content:
        personnel?.primaryPhone?.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3') ??
        'Not Listed',
    },
    {
      title: 'Secondary Number',
      content:
        personnel?.secondaryPhone?.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3') ??
        'Not Listed',
    },
    {
      title: 'Work Phone',
      content:
        personnel?.workPhone?.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3') ??
        'Not Listed',
    },
    { title: 'Email Address', content: personnel.email },
  ];

  const organizational = [
    { title: 'Supervisor Name', content: personnel.supervisor },
    { title: 'Ministry', content: personnel.ministry },
    { title: 'Union Membership', content: personnel.classification },
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
              <button
                onClick={openEditPopUp}
                className="z-20 flex text-primaryBlue flex-row items-center"
              >
                <PencilSquareIcon className="h-6 w-6" />
                <span className="pl-2 font-normal underline text-sm">Edit</span>
              </button>
            </div>
          </AccordionHeader>

          <AccordionBody>
            <div className="px-8 grid grid-cols-1 lg:grid-cols-5">
              <div className="col-span-1 lg:col-span-5 xl:col-span-3">
                <DetailsSection
                  numColumns={3}
                  title={'General Information'}
                  columns={generalInformation}
                />
              </div>
              <div className="col-span-1 lg:col-span-3 xl:col-span-2">
                <DetailsSection numColumns={2} title={'Contact'} columns={contact} />
              </div>
              <div className="border border-b-1 border-gray-300 col-span-1 lg:col-span-5 my-8"></div>

              <div className="col-span-1 lg:col-span-3">
                <DetailsSection
                  numColumns={3}
                  title={'Organizational Information'}
                  columns={organizational}
                />
              </div>
            </div>
          </AccordionBody>
        </Accordion>
      </div>
    </section>
  );
};

export default ProfileDetails;
