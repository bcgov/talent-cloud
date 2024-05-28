import { Chip } from '@material-tailwind/react';
import type { BcwsPersonnelRoleInterface } from '../dashboard';
import type { Section } from '@/common/enums/sections.enum';
import {
  BcwsRoleName,
  ExperienceLevel,
  ExperienceLevelName,
  SectionName,
} from '@/common/enums/sections.enum';
import { Accordion } from '@/components/ui/Accordion';
import { chipClass } from './helpers';

export const SectionsAndRoles = ({
  roles,
  firstChoiceSection,
  secondChoiceSection,
  onClick,
}: {
  roles: BcwsPersonnelRoleInterface[];
  firstChoiceSection?: Section;
  secondChoiceSection?: Section;
  onClick: () => void;
}) => {
  const title = 'Sections & Roles';

  const sections = roles.reduce(
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

  return (
    <Accordion title={title} onClick={onClick}>
      <div>
        <div>
          <h5 className="pl-8 py-6 font-bold text-primaryBlue">Sections & Roles</h5>
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
            {Object.keys(sections).map((section) => (
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
                              ExperienceLevelName[itm.expLevel as ExperienceLevel]
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
  );
};
