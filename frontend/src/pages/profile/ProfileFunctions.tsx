import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Chip,
} from '@material-tailwind/react';
import { useState } from 'react';
import type { FunctionType, Personnel } from '../dashboard';
import { Experience } from '@/common';

const ProfileFunctions = ({
  functions,
  personnel,
}: {
  functions: FunctionType[];
  personnel: Personnel;
}) => {
  const [open, setOpen] = useState(1);
  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

  const renderExperienceLevel = (experience: Experience | undefined) => {
    switch (experience) {
      case Experience.CHIEF_EXPERIENCED:
        return (
          <Chip
            className="text-purple bg-purple border-darkPurple border-2 rounded-md font-bold capitalize py-0"
            value="Chief Experience"
          />
        );
      case Experience.EXPERIENCED:
        return (
          <Chip
            className="text-info bg-infoBannerLight border-infoDark border-2 rounded-md font-bold capitalize py-0"
            value="Experienced"
          />
        );
      case Experience.OUTSIDE_EXPERIENCED:
        return (
          <Chip
            className="text-yellow bg-yellow border-darkYellow border-2 rounded-md font-bold capitalize py-0"
            value="Outside Experience"
          />
        );
      // f9f2f6 826521
      case Experience.INTERESTED:
        return (
          <Chip
            className="text-successDark bg-successBannerLight border-successDark rounded-md border-2 font-bold capitalize py-0"
            value="Interested"
          />
        );
      default:
        return <span>-</span>;
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
            Function & Experience Levels
          </AccordionHeader>
          <AccordionBody className="px-8">
            <div className="">
              <div className="flex flex-row border-b-2 border-slate-800 py-2">
                <div className="basis-1/2">
                  <span className="text-info font-bold">Function</span>
                </div>
                <div className="basis-1/2">
                  <span className="text-info font-bold">Experience Level</span>
                </div>
              </div>
              {functions.map((f) => (
                <div
                  key={f.id}
                  className="flex flex-row border-b-2 border-gray-100 py-2 items-center"
                >
                  <div className="basis-1/2">
                    <span>{f.name}</span>
                  </div>
                  <div>
                    {renderExperienceLevel(
                      personnel.experiences?.find((e) => e.id === f.id)
                        ?.experienceType,
                    )}
                  </div>
                </div>
              ))}
            </div>
          </AccordionBody>
        </Accordion>
      </div>
    </section>
  );
};

export default ProfileFunctions;
