import { ButtonTypes, Experience } from '@/common';
import type { ExperienceInterface, FunctionType, Personnel } from '@/common';
import { Option, Select } from '@material-tailwind/react';
import { Button } from '@/components';
import type { MouseEvent } from 'react';
import { useState } from 'react';

export const ProfileFunctionEdit = ({
  personnel,
  allFunctions,
  handleOpenEditFunctionsPopUp,
  updatePersonnelExperiences,
}: {
  open: boolean;
  personnel: Personnel;
  allFunctions: FunctionType[];
  handleOpenEditFunctionsPopUp: (e: MouseEvent<HTMLElement>) => void;
  updatePersonnelExperiences: (
    personnelExperiences: ExperienceInterface[],
  ) => Promise<void>;
}) => {
  const [experiences, setExperiences] = useState<ExperienceInterface[]>(
    personnel.experiences || [],
  );

  const updateFunction = (id: number, experienceType: string) => {
    if (experienceType === 'NOT_APPLICABLE') {
      const experienceExists = experiences.findIndex((e) => e.id === id);
      if (experienceExists > -1) {
        setExperiences(experiences.filter((e) => e.id !== id));
      }
    } else {
      const experience = experiences.find((e) => e.id === id);
      if (experience) {
        const newExperiences = experiences.map((e) => {
          if (e.id === id) {
            return {
              ...e,
              experienceType: Experience[experienceType as keyof typeof Experience],
            };
          } else {
            return e;
          }
        });
        setExperiences(newExperiences);
      } else {
        setExperiences([
          ...experiences,
          {
            id,
            experienceType: Experience[experienceType as keyof typeof Experience],
            functionName: allFunctions.find((f) => f.id === id)!.name,
            function: allFunctions.find((f) => f.id === id)!
          },
        ]);
      }
    }
  };

  return (
    <section className="pt-4">
      <div className="pb-24 px-10">
        <div className="flex flex-row border-b-2">
          <div className="basis-1/2">
            <span className="text-info font-bold">Function</span>
          </div>
          <div className="basis-1/2">
            <span className="text-info font-bold">Experience</span>
          </div>
        </div>
        {allFunctions.map((f) => (
          <div key={f.id} className="flex flex-row py-2">
            <div className="basis-1/2">
              <span className="font-bold">{f.name}</span>
            </div>
            <div className="basis-1/2">
              <Select
                placeholder={''}
                labelProps={{
                  className: 'before:mr-0 after:ml-0',
                }}
                value={
                  experiences.find((e) => e.id === f.id)?.experienceType ||
                  'NOT_APPLICABLE'
                }
                onChange={(val) => updateFunction(f.id, val as string)}
              >
                <Option value={'NOT_APPLICABLE'}>Not Applicable</Option>
                <Option value={Experience.INTERESTED}>Interested</Option>
                <Option value={Experience.EXPERIENCED}>Experienced</Option>
                <Option value={Experience.CHIEF_EXPERIENCED}>
                  Chief Experienced
                </Option>
                <Option value={Experience.OUTSIDE_EXPERIENCED}>
                  Outside Experienced
                </Option>
              </Select>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t-4 flex flex-row space-x-6 py-4 justify-end px-8">
        <Button
          variant={ButtonTypes.PRIMARY}
          type="button"
          onClick={handleOpenEditFunctionsPopUp}
          text="Cancel"
        />
        <Button
          variant={ButtonTypes.TERTIARY}
          text="Update"
          type="submit"
          onClick={() => updatePersonnelExperiences(experiences)}
        />
      </div>
    </section>
  );
};
