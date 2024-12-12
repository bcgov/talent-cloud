import {
  ChevronDownIcon,
  ChevronUpIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/solid';
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Chip,
} from '@material-tailwind/react';
import { useState } from 'react';
import type { ExperienceInterface, FunctionType, Personnel } from '@/common';
import { Experience } from '@/common';
import { ProfileFunctionEdit } from './ProfileFunctionEdit';
import { DialogUI } from '@/components/ui';

export const ProfileFunctions = ({
  functions,
  personnel,
  updatePersonnel,
  allowEditing,
}: {
  functions: FunctionType[];
  personnel: Personnel;
  updatePersonnel: (props: Partial<Personnel>) => void;
  allowEditing: boolean;
}) => {
  const [open, setOpen] = useState(1);
  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

  const renderExperienceLevel = (experience: Experience | undefined) => {
    switch (experience) {
      case Experience.CHIEF_EXPERIENCED:
        return (
          <Chip
            className="text-darkPurple bg-lightPurple border-darkPurple border-2 rounded-md font-bold capitalize py-0"
            value="Chief Experienced"
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
            className="text-darkYellow bg-lightYellow border-darkYellow border-2 rounded-md font-bold capitalize py-0"
            value="Outside Experienced"
          />
        );
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
  const [openEditFunctionsPopUp, setOpenEditFunctionsPopUp] = useState(false);
  const savePersonnelExperiences = async (experiences: ExperienceInterface[]) => {
    await updatePersonnel({ experiences });
    setOpenEditFunctionsPopUp(false);
  };
  const handleOpenEditFunctionsPopUp = (e: React.MouseEvent<HTMLElement>) => {
    if (openEditFunctionsPopUp === false) {
      e.stopPropagation();
    }
    setOpenEditFunctionsPopUp(!openEditFunctionsPopUp);
  };
  return (
    <>
      <section className="bg-white">
        <div className="pt-6">
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
              <div className=" w-full justify-between items-center flex lg:flex-row">
                <span>Function & Experience Levels</span>
                {allowEditing && (
                  <button
                    aria-label="edit functions"
                    onClick={handleOpenEditFunctionsPopUp}
                    className="z-20 flex text-stormy-700 flex-row items-center"
                  >
                    <PencilSquareIcon className="h-6 w-6" />
                    <span className="pl-2 font-normal underline text-sm">Edit</span>
                  </button>
                )}
              </div>
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
      <DialogUI
        open={openEditFunctionsPopUp}
        onClose={() => {}}
        handleOpen={handleOpenEditFunctionsPopUp}
        title={'Edit Experience Levels'}
        style={'lg:w-2/3 xl:w-1/2'}
      >
        <ProfileFunctionEdit
          personnel={personnel}
          open={openEditFunctionsPopUp}
          allFunctions={functions}
          handleOpenEditFunctionsPopUp={handleOpenEditFunctionsPopUp}
          updatePersonnelExperiences={savePersonnelExperiences}
        />
      </DialogUI>
    </>
  );
};
