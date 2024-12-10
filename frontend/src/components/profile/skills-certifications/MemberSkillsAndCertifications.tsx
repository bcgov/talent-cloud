import { getLanguageProficiency } from '@/common/helpers';
import { Tabs, Tab, TabsBody, TabsHeader, TabPanel } from '@material-tailwind/react';
import { ToolsName, ToolsProficiencyName } from '@/common/enums/tools.enum';
import type { LanguageProficiencyName } from '@/common/enums/language.enum';
import type { ExperienceLevel } from '@/common/enums/sections.enum';
import { useState } from 'react';
import type { Personnel } from '@/common';
import { MemberItemList } from '../sections-roles';

export type MemberSkillsProps = {
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

export const MemberSkillsAndCertifications = ({
  personnel,
}: {
  allowEditing: boolean;
  updatePersonnel: (props: Partial<Personnel>) => void;
  personnel: Personnel;
  profileData: any;
}) => {
  const [activeTab, setActiveTab] = useState('languages');
  const handleTabChange = (index: string) => {
    setActiveTab(index);
  };

  return (
    <>
      <Tabs value={activeTab} onChange={handleTabChange}>
        <TabsHeader
          className="rounded-none border-b border-blue-gray-50 bg-transparent p-0 whitespace-nowrap w-fit gap-6"
          indicatorProps={{
            className:
              'bg-transparent border-b-2 border-primaryBlue shadow-none rounded-none',
          }}
        >
          <Tab
            className={`${activeTab === 'languages' ? 'text-primaryBlue font-bold' : 'text-gray-600'}`}
            value={'languages'}
            onClick={() => setActiveTab('languages')}
          >
            Languages
          </Tab>
          <Tab
            className={`${activeTab === 'tools' ? 'text-primaryBlue font-bold' : 'text-gray-600'}`}
            value={'tools'}
            onClick={() => setActiveTab('tools')}
          >
            Tools & Software
          </Tab>
          <Tab
            className={`${activeTab === 'certifications' ? 'text-primaryBlue font-bold' : 'text-gray-600'}`}
            value={'certifications'}
            onClick={() => setActiveTab('certifications')}
          >
            Certifications
          </Tab>
        </TabsHeader>
        <TabsBody>
          <TabPanel value="languages" className="px-0">
            <MemberItemList
              data={
                personnel.languages?.map((l) => ({
                  id: l.id,
                  language: l.language,
                  proficiency: getLanguageProficiency(l.level, l.type),
                  level: l.level,
                })) || []
              }
              columns={[
                {
                  name: 'Language',
                  key: 'language',
                },
                {
                  name: 'Proficiency',
                  key: 'proficiency',
                },
              ]}
            />
          </TabPanel>
          <TabPanel value="tools" className="px-0">
            <MemberItemList
              data={
                personnel.tools?.map((t) => ({
                  id: t.tool,
                  tool: ToolsName[t.tool],
                  proficiency: ToolsProficiencyName[t.proficiencyLevel],
                })) || []
              }
              columns={[
                {
                  name: 'Tool',
                  key: 'tool',
                },
                {
                  name: 'Proficiency',
                  key: 'proficiency',
                },
              ]}
            />
          </TabPanel>
          <TabPanel value="certifications" className="px-0">
            <MemberItemList
              data={
                personnel.certifications?.map((c) => ({
                  id: c.name,
                  certification: c.name,
                  expiry: c.expiry || '--',
                })) || []
              }
              columns={[
                {
                  name: 'Certification',
                  key: 'certification',
                },
                {
                  name: 'Expiry',
                  key: 'expiry',
                },
              ]}
            />
          </TabPanel>
        </TabsBody>
      </Tabs>
    </>
  );
};
