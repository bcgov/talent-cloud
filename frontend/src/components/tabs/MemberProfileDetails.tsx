import { Fragment, useState } from 'react';
import DetailsSection from '../profile/details/DetailsSection';
import { ProfileSectionHeader } from '../profile/common';
import { DialogUI } from '@/components/ui';
import { MemberProfileEditForm } from '../profile/forms';
import type { Personnel } from '@/common';
import { Program } from '@/common';
import type { FormikValues } from 'formik';

export const MemberProfileDetails = ({
  personnel,
  profileData,
  updatePersonnel,
}: {
  personnel: Personnel;
  profileData: any;
  updatePersonnel: (personnel: FormikValues) => Promise<void>;
}) => {
  const [openEditProfilePopUp, setOpenEditProfilePopUp] = useState(false);
  const [sectionToEdit, setSectionToEdit] = useState<string>('');

  const openEditSection = (sectionKey: string) => {
    setSectionToEdit(sectionKey);
    setOpenEditProfilePopUp(true);
  };

  const handleOpenEditProfilePopUp = () => {
    setOpenEditProfilePopUp(!openEditProfilePopUp);
  };

  const { generalInformation, contact, organizational, emergency, membership } =
    profileData;
  const sections = [
    {
      key: 'general',
      title: 'General Information',
      columns: generalInformation,
      editable: true,
    },
    {
      key: 'employee',
      title: 'Employee Information',
      columns: organizational,
      editable: true,
    },
    {
      key: 'contact',
      title: 'Contact Information',
      columns: contact,
      editable: true,
    },
    {
      key: 'emergency',
      title: 'Emergency Contact Information',
      columns: emergency,
      editable: true,
    },
    {
      key: 'membership',
      title: 'CORE Membership Status',
      columns: membership,
      editable: false,
    },
  ];

  return (
    <>
      <section className="bg-white">
        {sections.map((itm: any) => (
          <Fragment key={itm.title}>
            <ProfileSectionHeader
              title={itm.title}
              callToAction={itm.editable ? 'Edit Info' : undefined}
              callToActionType="button"
              onCallToActionClick={() => openEditSection(itm.key)}
            >
              <DetailsSection columns={itm.columns} />
            </ProfileSectionHeader>
          </Fragment>
        ))}
      </section>
      <DialogUI
        open={openEditProfilePopUp}
        onClose={handleOpenEditProfilePopUp}
        handleOpen={handleOpenEditProfilePopUp}
        title={'Edit Member Details'}
        style={'lg:w-2/3 xl:w-1/2'}
      >
        <MemberProfileEditForm
          personnel={personnel}
          open={openEditProfilePopUp}
          handleClose={handleOpenEditProfilePopUp}
          updatePersonnel={updatePersonnel}
          sectionKey={sectionToEdit}
          program={Program.ALL}
        />
      </DialogUI>
    </>
  );
};
