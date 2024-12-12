import { Chip } from '@material-tailwind/react';
import { useState } from 'react';
import type { ExperienceInterface, FunctionType, Personnel } from '@/common';
import { Experience } from '@/common';
import { ProfileFunctionEdit } from './ProfileFunctionEdit';
import { DialogUI } from '@/components/ui';

export const MemberProfileFunctions = ({
  functions,
  personnel,
  updatePersonnel,
}: {
  functions: FunctionType[];
  personnel: Personnel;
  updatePersonnel: (props: Partial<Personnel>) => void;
  allowEditing: boolean;
}) => {
  const renderExperienceLevel = (experience: Experience | undefined) => {
    switch (experience) {
      case Experience.CHIEF_EXPERIENCED:
        return (
          <Chip
            className="text-darkPurple bg-purple-200 border-darkPurple border-2 rounded-md font-bold capitalize py-0"
            value="Chief Experienced"
          />
        );
      case Experience.EXPERIENCED:
        return (
          <Chip
            className="text-blue-800 bg-blue-200 border-blue-800 border-2 rounded-md font-bold capitalize py-0"
            value="Experienced"
          />
        );
      case Experience.OUTSIDE_EXPERIENCED:
        return (
          <Chip
            className="text-darkYellow bg-yellow-200 border-darkYellow border-2 rounded-md font-bold capitalize py-0"
            value="Outside Experienced"
          />
        );
      case Experience.INTERESTED:
        return (
          <Chip
            className="text-leaf-700Dark bg-sprout-200 border-forest-900 rounded-md border-2 font-bold capitalize py-0"
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
        <div className="">
          <div className="flex flex-row border-b-2 border-slate-800 py-2">
            <div className="basis-1/2">
              <span className="text-blue-800 font-bold">Function</span>
            </div>
            <div className="basis-1/2">
              <span className="text-blue-800 font-bold">Experience Level</span>
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
                  personnel.experiences?.find((e) => e.id === f.id)?.experienceType,
                )}
              </div>
            </div>
          ))}
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
