import { Accordion } from '@/components/ui/Accordion';
import { Chip } from '@material-tailwind/react';
import { chipClass } from './helpers';
import type { ToolsProficiencyName } from '@/common/enums/tools.enum';
import type { LanguageProficiencyName } from '@/common/enums/language.enum';
import type { ExperienceLevel } from '@/common/enums/sections.enum';

export type SkillsProps = {
  title?: string;
  header?: string;
  subheader?: string;
  itms?: {
    label?: string;
    value?:
      | ExperienceLevel
      | ToolsProficiencyName
      | LanguageProficiencyName
      | string;
  }[];
};

export const SkillsAndCertifications = ({ skills }: { skills: SkillsProps[] }) => {
  const title = 'Skills & Certifications';

  //TODO
  const onClick = () => {};

  return (
    <Accordion title={title} onClick={onClick}>
      <div>
        {skills.map((itm) => (
          <div key={itm.title}>
            <h5 className="pl-8 py-6  font-bold text-primaryBlue">{itm.title}</h5>
            <div className="flex flex-row border-b-2 border-slate-800 py-2 px-8">
              <div className="basis-1/2">
                <span className="text-darkGray  font-bold">{itm.header}</span>
              </div>
              <div className="basis-1/2">
                <span className="text-darkGray font-bold">{itm.subheader}</span>
              </div>
            </div>
            {itm.itms?.map(
              ({
                label,
                value,
              }: {
                label?: string;
                value?:
                  | ExperienceLevel
                  | ToolsProficiencyName
                  | LanguageProficiencyName
                  | string;
              }) => (
                <div
                  key={label}
                  className="flex flex-row border-b-2 border-gray-100 py-2 items-center justify-between"
                >
                  <div className="text-darkGray px-8 basis-1/2">
                    <p>{label}</p>
                  </div>{' '}
                  <div className="basis-1/2">
                    <div className="flex flex-row justify-start">
                      {itm?.title === 'Certifications' ? (
                        <p>{value}</p>
                      ) : (
                        <div className="flex flex-shrink ">
                          <Chip className={chipClass(value)} value={value} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        ))}
      </div>
    </Accordion>
  );
};
