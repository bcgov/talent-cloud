import { Chip } from '@material-tailwind/react';
import type { BcwsRoleInterface } from '../dashboard';
import {
  BcwsRoleName,
  ExperienceLevel,
  ExperienceLevelName,
  SectionName,
} from '@/common/enums/sections.enum';
import { Accordion } from '@/components/ui/Accordion';
import { chipClass } from './helpers';

export const SectionsAndRoles = ({ roles }: { roles: BcwsRoleInterface[] }) => {
  const title = 'Sections & Roles';
  const onClick = () => {};

  return (
    <Accordion title={title} onClick={onClick}>
      <div>
        <div>
          <h5 className="pl-8 py-6  font-bold text-primaryBlue">Sections & Roles</h5>
          <div className="flex flex-row border-b-2 border-slate-800 py-2 px-8">
            <div className="basis-1/3">
              <span className="text-darkGray  font-bold">Section</span>
            </div>
            <div className="basis-1/3">
              <span className="text-darkGray font-bold">Roles</span>
            </div>
            <div className="basis-1/3">
              <span className="text-darkGray font-bold">Experience Level</span>
            </div>
          </div>
          <div>
            {roles.map((itm) => (
              <div
                key={itm.role}
                className="flex flex-row border-b-2 border-gray-100 py-2 items-center justify-between"
              >
                <div className="basis-1/3 text-darkGray px-8">
                  <p>{SectionName[itm.section]}</p>
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
                        value={ExperienceLevelName[itm.expLevel as ExperienceLevel]}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Accordion>
  );
};
