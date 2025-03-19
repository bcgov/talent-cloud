import { Accordion } from '@/components/ui/Accordion';
import { Chip } from '@material-tailwind/react';
import { chipClass } from '@/common/helpers';
import type { ToolsProficiencyName } from '@/common/enums/tools.enum';
import type { LanguageProficiencyName } from '@/common/enums/language.enum';
import type { ExperienceLevel } from '@/common/enums/sections.enum';
import { format } from 'date-fns';
import { DialogUI } from '@/components/ui';
import { useState } from 'react';
import { ProfileEditSkills } from './ProfileEditSkills';
import type { Certification, Languages, PersonnelTool, Personnel } from '@/common';
import { PersonnelEndpoint } from '@/common/enums/personnel-endpoint';
import { MemberItemList } from '../sections-roles';

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

export const SkillsAndCertifications = ({
  allowEditing,
  updatePersonnel,
  personnel,
  profileData,
}: {
  allowEditing: boolean;
  updatePersonnel: (props: Partial<Personnel>, endpoint?: string) => void;
  personnel: Personnel;
  profileData: any;
}) => {
  const title = 'Skills & Certifications';
  const [openEditSkillsPopUp, setOpenEditSkillsPopUp] = useState(false);

  const handleOpenEditSkills = () => {
    setOpenEditSkillsPopUp(!openEditSkillsPopUp);
  };

  const handleSave = (skills: {
    newLanguages: Languages[];
    newTools: PersonnelTool[];
    newCertifications: Certification[];
  }) => {
    updatePersonnel(
      {
        languages: skills.newLanguages,
        tools: skills.newTools,
        certifications: skills.newCertifications,
      },
      PersonnelEndpoint.Skills,
    );
    setOpenEditSkillsPopUp(false);
  };

  return (
    <>
      <Accordion
        title={title}
        onClick={handleOpenEditSkills}
        allowEditing={allowEditing}
      >
        <div>
          {profileData?.skills?.map((itm: any) => (
            <div key={itm.title}>
              <h5 className="pl-8 py-6  font-bold text-primaryBlue">{itm.title}</h5>
              <div className="flex flex-row border-b-2 border-slate-800 py-2 px-8">
                <div className="basis-1/2">
                  <span className="text-darkGray font-bold">{itm.header}</span>
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
                        {itm.title === 'Certifications' && value && (
                          <p>{format(value ?? '', 'PPP')}</p>
                        )}
                        {itm.title !== 'Certifications' && value && (
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
          {!personnel.chipsProfileMissing &&
            personnel.chipsTrainingData.length > 0 && (
              <div>
                <h5 className="pl-8 py-6 font-bold text-primaryBlue">Training</h5>
                <div className="px-6">
                  {/* Not consistent with old profile look & feel, but consistent with Member Profile */}
                  <MemberItemList
                    columns={[
                      {
                        name: 'Course',
                        key: 'courseId',
                        size: '1/6',
                      },
                      {
                        name: 'Title',
                        key: 'courseTitle',
                        size: '1/2',
                      },
                      {
                        name: 'Date Completed',
                        key: 'completedDate',
                        size: '1/3',
                      },
                    ]}
                    data={personnel.chipsTrainingData.map((t) => ({
                      id: t.courseId,
                      courseId: t.courseId,
                      courseTitle: t.courseTitle,
                      completedDate: t.completedDate,
                    }))}
                  />
                </div>
              </div>
            )}
        </div>
      </Accordion>

      {/* Skills and Certs */}
      <DialogUI
        open={openEditSkillsPopUp}
        onClose={handleOpenEditSkills}
        handleOpen={handleOpenEditSkills}
        title="Edit Skills & Certifications"
        style="w-5/6"
      >
        <ProfileEditSkills
          originalLanguages={personnel.languages || []}
          originalTools={personnel.tools || []}
          originalCerts={personnel.certifications || []}
          handleClose={handleOpenEditSkills}
          handleSave={handleSave}
        />
      </DialogUI>
    </>
  );
};
