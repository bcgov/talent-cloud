import { getLanguageProficiency } from '@/common/helpers';
import { Tabs, Tab, TabsBody, TabsHeader, TabPanel } from '@material-tailwind/react';
import { ToolsName, ToolsProficiencyName } from '@/common/enums/tools.enum';
import type { LanguageProficiencyName } from '@/common/enums/language.enum';
import type { ExperienceLevel } from '@/common/enums/sections.enum';
import { useState } from 'react';
import { MemberItemList } from '../sections-roles';
import type { Languages, Member } from '@/common';

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
  member,
}: {
  allowEditing?: boolean;
  updateMember?: (props: Member) => void;
  member: Member;
  profileData?: any;
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
                member.languages?.map((l: Languages) => ({
                  id: l?.id,
                  language: l.language,
                  proficiency: getLanguageProficiency(l.level, l.type),
                  level: l.level,
                })) || []
              }
              columns={[
                {
                  name: 'Language',
                  key: 'language',
                  size: '1/2',
                },
                {
                  name: 'Proficiency',
                  key: 'proficiency',
                  size: '1/2',
                },
              ]}
              displayEmpty={true}
            />
          </TabPanel>
          <TabPanel value="tools" className="px-0">
            <MemberItemList
              data={
                member.tools?.map((t) => ({
                  id: t.tool,
                  tool: ToolsName[t.tool],
                  proficiency: ToolsProficiencyName[t.proficiencyLevel],
                })) || []
              }
              columns={[
                {
                  name: 'Tool',
                  key: 'tool',
                  size: '1/2',
                },
                {
                  name: 'Proficiency',
                  key: 'proficiency',
                  size: '1/2',
                },
              ]}
              displayEmpty={true}
            />
          </TabPanel>
          <TabPanel value="certifications" className="px-0">
            <MemberItemList
              data={
                member.certifications?.map((c) => ({
                  id: c.name,
                  certification: c.name,
                  expiry: c.expiry || '--',
                })) || []
              }
              columns={[
                {
                  name: 'Certification',
                  key: 'certification',
                  size: '1/2',
                },
                {
                  name: 'Expiry',
                  key: 'expiry',
                  size: '1/2',
                },
              ]}
              displayEmpty={true}
            />
          </TabPanel>
        </TabsBody>
      </Tabs>
    </>
  );
};
