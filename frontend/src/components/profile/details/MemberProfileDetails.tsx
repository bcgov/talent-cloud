import { Fragment } from 'react';
import DetailsSection from './DetailsSection';
import { ProfileSectionHeader } from '../common';

export const MemberProfileDetails = ({ profileData }: { profileData: any }) => {
  const {
    generalInformation,
    contact,
    organizational,
    emergency,
    membership,
    intakeRequirements,
  } = profileData;
  const sections = [
    {
      title: 'General Information',
      columns: generalInformation,
    },
    {
      title: 'Employee Information',
      columns: organizational,
    },
    {
      title: 'Contact Information',
      columns: contact,
    },
    {
      title: 'Emergency Contact Information',
      columns: emergency,
    },
    {
      title: 'CORE Membership Status',
      columns: membership,
    },
  ];

  if (intakeRequirements) {
    sections.unshift({
      title: 'Intake Requirements',
      columns: intakeRequirements,
    });
  }

  return (
    <>
      <section className="bg-white">
        {sections.map((itm: any) => (
          <Fragment key={itm.title}>
            <ProfileSectionHeader
              title={itm.title}
              callToAction="Edit Info"
              callToActionType="button"
              onCallToActionClick={() => {}}
            >
              <DetailsSection columns={itm.columns} />
            </ProfileSectionHeader>
          </Fragment>
        ))}
      </section>
    </>
  );
};
