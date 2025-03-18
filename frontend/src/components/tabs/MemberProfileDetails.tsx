import type { ReactElement } from 'react';
import { useState } from 'react';
import DetailsSection from '../profile/details/DetailsSection';
import { ProfileSectionHeader } from '../profile/common';
import { Button, DialogUI } from '@/components/ui';
import { MemberProfileEditForm } from '../profile/forms';
import type { Member } from '@/common';
import { ButtonTypes, Program } from '@/common';
import type { FormikValues } from 'formik';
import { Banner } from '@/components/ui/Banner';
import { BannerType } from '../../common/enums/banner-enum';
import { differenceInDays } from 'date-fns';
import { offsetTimezoneDate } from '../../utils';

export const MemberProfileDetails = ({
  member,
  profileData,
  updateMember,
}: {
  member: Member;
  profileData: any;
  updateMember: (member: FormikValues) => Promise<void>;
}) => {
  const [openEditProfilePopUp, setOpenEditProfilePopUp] = useState<boolean>(false);
  const [tooltip, setTooltip] = useState<{
    title: string;
    content: ReactElement;
  }>();
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
      <section>
        {member?.chipsProfileMissing ||
        Object.keys(member?.chipsIssues || {}).length > 0 ? (
          <Banner
            type={BannerType.ERROR}
            content={
              <>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-red-700">
                    Government Profile Syncing Errors Detected
                  </span>
                  {member?.chipsLastPing && (
                    <span className="text-sm text-gray-500">
                      Profile data synced{' '}
                      {differenceInDays(
                        new Date(),
                        offsetTimezoneDate(member.chipsLastPing),
                      )}{' '}
                      days ago
                    </span>
                  )}
                </div>
                <div className="mt-1">
                  {member?.chipsProfileMissing ? (
                    <p className="text-sm text-red-700">
                      Your profile cannot be found in the government system.
                    </p>
                  ) : (
                    <p className="text-sm text-red-700">
                      The details with an exclamation icon are directly sourced from
                      your government profile and may be outdated or incorrect.
                      Please edit your details if needed.
                    </p>
                  )}
                </div>
              </>
            }
          />
        ) : (
          <Banner
            type={BannerType.INFO}
            content={
              <>
                <div className="flex justify-between items-center">
                  <span className="font-bold">
                    Verify Information from Government Profile
                  </span>
                  {member?.chipsLastPing && (
                    <span className="text-sm text-gray-500">
                      Profile data synced{' '}
                      {differenceInDays(
                        new Date(),
                        offsetTimezoneDate(member.chipsLastPing),
                      )}{' '}
                      days ago
                    </span>
                  )}
                </div>
                <div className="mt-1">
                  <p className="text-sm text-gray-700">
                    The details with an exclamation icon are directly sourced from
                    your government profile and may be outdated or incorrect. Please
                    edit your details if needed.
                  </p>
                </div>
              </>
            }
          />
        )}
        {sections.map((itm: any) => (
          <div
            key={itm.title}
            className="border-2 border-gray-200 w-full p-8 mb-8 rounded-sm"
          >
            <ProfileSectionHeader
              title={itm.title}
              callToAction={itm.editable ? 'Edit Info' : undefined}
              callToActionType="button"
              onCallToActionClick={() => openEditSection(itm.key)}
            >
              <DetailsSection
                columns={itm.columns}
                tooltipClicked={setTooltip}
                tooltipClosed={() => setTooltip(undefined)}
              />
            </ProfileSectionHeader>
          </div>
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
          member={member}
          open={openEditProfilePopUp}
          handleClose={handleOpenEditProfilePopUp}
          updateMember={updateMember}
          sectionKey={sectionToEdit}
          program={Program.ALL}
        />
      </DialogUI>
      <DialogUI
        open={!!tooltip}
        onClose={() => setTooltip(undefined)}
        handleOpen={() => setTooltip(undefined)}
        title={tooltip?.title || ''}
        style={'lg:w-1/3'}
      >
        <>
          {tooltip?.content || <></>}
          <div className="flex flex-row py-4 justify-end px-8 border-t-2 border-gray-300">
            <Button
              variant={ButtonTypes.PRIMARY}
              text="Close"
              type="button"
              onClick={() => setTooltip(undefined)}
            />
          </div>
        </>
      </DialogUI>
    </>
  );
};
