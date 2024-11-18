import { Chip } from '@material-tailwind/react';
import type { Section } from '@/common/enums/sections.enum';
import {
  BcwsRoleName,
  ExperienceLevel,
  ExperienceLevelName,
  SectionName,
} from '@/common/enums/sections.enum';
import { Accordion } from '@/components/ui/Accordion';
import { chipClass } from '@/common/helpers';
import { DialogUI } from '@/components/ui';
import { ProfileEditRoles } from './ProfileEditRoles';
import type {
  BcwsPersonnelRoleInterface,
  BcwsRoleInterface,
  Personnel,
} from '@/common';
import { useState } from 'react';

export const SectionsAndRoles = ({
  allowEditing,
  bcwsRoles,
  personnel,
  updatePersonnel,
}: {
  allowEditing: boolean;
  bcwsRoles: BcwsRoleInterface[];
  personnel: Personnel;
  updatePersonnel: (props: Partial<Personnel>) => void;
}) => {
  const title = 'Sections & Roles';
  const [openEditRolesPopUp, setOpenEditRolesPopUp] = useState(false);
  const firstChoiceSection = personnel.firstChoiceSection;
  const secondChoiceSection = personnel.secondChoiceSection;
  const handleOpenEditRoles = () => {
    setOpenEditRolesPopUp(!openEditRolesPopUp);
  };
  const sections = personnel?.roles?.reduce(
    (acc: { [key: string]: BcwsPersonnelRoleInterface[] }, role) => {
      const key = role.section;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(role);
      return acc;
    },
    {},
  );

  const handleSave = (roles: {
    newRoles: { roleId: number; expLevel: string }[];
    firstChoiceSection?: Section;
    secondChoiceSection?: Section;
  }) => {
    updatePersonnel(roles);
    setOpenEditRolesPopUp(false);
  };

  const EmptyChoiceSection = ({ section }: { section: Section }) => (
    <div className="border-b-2 border-gray-100">
      <div className="flex flex-row py-2 items-center justify-between">
        <div className="basis-1/3 text-darkGray px-8">
          <p className="flex flex-row gap-2">
            {SectionName[section]}
            <Chip
              value={section === firstChoiceSection ? '1st Choice' : '2nd Choice'}
              className={
                section === firstChoiceSection
                  ? 'rounded-full capitalize'
                  : 'rounded-full capitalize bg-infoBannerLight text-ministry'
              }
            />
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Accordion
        title={title}
        onClick={handleOpenEditRoles}
        allowEditing={allowEditing}
      >
        <div>
          <div>
            <h5 className="pl-8 py-6 font-bold text-primaryBlue">
              Sections & Roles
            </h5>
            <div className="flex flex-row border-b-2 border-slate-800 py-2 px-8">
              <div className="basis-1/3">
                <span className="text-darkGray font-bold">Section</span>
              </div>
              <div className="basis-1/3">
                <span className="text-darkGray font-bold">Roles</span>
              </div>
              <div className="basis-1/3">
                <span className="text-darkGray font-bold">Experience Level</span>
              </div>
            </div>
            <div>
              {firstChoiceSection &&
                sections &&
                !Object.keys(sections).includes(firstChoiceSection) && (
                  <EmptyChoiceSection section={firstChoiceSection} />
                )}
              {secondChoiceSection &&
                sections &&
                !Object.keys(sections).includes(secondChoiceSection) && (
                  <EmptyChoiceSection section={secondChoiceSection} />
                )}
              {sections &&
                Object.keys(sections).map((section) => (
                  <div key={section} className="border-b-2 border-gray-100">
                    {sections[section].map((itm, i) => (
                      <div
                        key={itm.role}
                        className="flex flex-row py-2 items-center justify-between"
                      >
                        <div className="basis-1/3 text-darkGray px-8">
                          {i === 0 && (
                            <p className="flex flex-row gap-2">
                              {SectionName[section as keyof typeof Section]}
                              {section === firstChoiceSection && (
                                <Chip
                                  value="1st Choice"
                                  className="rounded-full capitalize"
                                />
                              )}
                              {section === secondChoiceSection && (
                                <Chip
                                  value="2nd Choice"
                                  className="rounded-full bg-infoBannerLight text-ministry capitalize"
                                />
                              )}
                            </p>
                          )}
                        </div>{' '}
                        <div className="basis-1/3 text-darkGray px-4">
                          <p>{BcwsRoleName[itm.role]}</p>
                        </div>{' '}
                        <div className="basis-1/3">
                          <div className="flex flex-row justify-start">
                            <div className="flex flex-shrink ">
                              <Chip
                                className={chipClass(
                                  ExperienceLevel[itm.expLevel as ExperienceLevel],
                                )}
                                value={
                                  ExperienceLevelName[
                                    itm.expLevel as ExperienceLevel
                                  ]
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </Accordion>
      <DialogUI
        open={openEditRolesPopUp}
        onClose={handleOpenEditRoles}
        handleOpen={handleOpenEditRoles}
        title="Edit Roles"
        style="w-5/6"
      >
        <ProfileEditRoles
          allRoles={bcwsRoles}
          originalRoles={personnel.roles || []}
          sectionChoices={{
            firstChoiceSection,
            secondChoiceSection,
          }}
          handleClose={handleOpenEditRoles}
          handleSave={handleSave}
        />
      </DialogUI>
    </>
  );
};
