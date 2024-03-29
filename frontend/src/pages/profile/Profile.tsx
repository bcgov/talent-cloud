import type { MouseEvent } from 'react';
import { useState } from 'react';
import dayjs from 'dayjs';
import {
  Breadcrumbs,
  Dialog,
  DialogHeader,
  Button,
  DialogBody,
} from '@material-tailwind/react';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { Link, useParams } from 'react-router-dom';
import usePersonnel from '@/hooks/usePersonnel';
import useFunctions from '@/hooks/useFunctions';
import useAvailability from '@/hooks/useAvailability';
import ProfileDetails from './ProfileDetails';
import ProfileHeader from './ProfileHeader';
import { useRole } from '@/hooks';
import Scheduler from './Scheduler';
import SchedulerPopUp from './SchedulerPopUp';
import type { AvailabilityRange, ExperienceInterface } from '../dashboard';
import { ProfileEditForm } from './ProfileEditForm';
import { Status, type AvailabilityType } from '@/common';
import ProfileFunctions from './ProfileFunctions';
import ProfileNotes from './ProfileNotes';
import { EditNotes } from './EditNotes';
import { DialogUI } from '@/components';
import { ReviewApplicant } from '../ReviewApplicant';
import { ProfileFunctionEdit } from './ProfileFunctionEdit';
import { Routes } from '@/routes';

const Profile = () => {
  const { personnelId } = useParams() as { personnelId: string };
  const { personnel, updatePersonnel, updateExperiences } = usePersonnel({
    personnelId,
  });
  const { availability, getAvailability, saveAvailability } = useAvailability({
    personnelId,
  });
  const { functions } = useFunctions();

  const { role } = useRole();

  const [openEditNotes, setOpenEditNotes] = useState(false);
  const [openEditCoordinatorNotes, setOpenEditCoordinatorNotes] = useState(false);
  const [openEditProfilePopUp, setOpenEditProfilePopUp] = useState(false);
  const [openEditFunctionsPopUp, setOpenEditFunctionsPopUp] = useState(false);

  const handleOpenEditNotes = () => {
    setOpenEditNotes(!openEditNotes);
  };

  const handleOpenEditCoordinatorNotes = () => {
    setOpenEditCoordinatorNotes(!openEditCoordinatorNotes);
  };

  const [availabilityQuery, setAvailabilityQuery] = useState<{
    from: string;
    to: string;
  }>({
    from: dayjs().startOf('month').format('YYYY-MM-DD'),
    to: dayjs().endOf('month').format('YYYY-MM-DD'),
  });
  const [schedulerDialogOpen, setSchedulerDialogOpen] = useState(false);
  const handleSchedulerOpen = () => setSchedulerDialogOpen(!schedulerDialogOpen);
  const [editCell, setEditCell] = useState<{
    from?: string;
    to?: string;
    availabilityType?: AvailabilityType;
    deploymentCode?: string;
  }>();

  const onChangeAvailabilityQuery = (from: string, to: string) => {
    setAvailabilityQuery({ from, to });
    getAvailability(from, to);
  };

  const saveAvailabilityDates = async (dates: AvailabilityRange) => {
    await saveAvailability(dates);
    setSchedulerDialogOpen(false);
    getAvailability(availabilityQuery.from, availabilityQuery.to);
  };

  const savePersonnelExperiences = async (experiences: ExperienceInterface[]) => {
    await updateExperiences(experiences);
    setOpenEditFunctionsPopUp(false);
  };

  const handleOpenEditProfilePopUp = (e: MouseEvent<HTMLElement>) => {
    if (openEditProfilePopUp === false) {
      e.stopPropagation();
    }
    setOpenEditProfilePopUp(!openEditProfilePopUp);
  };
  const [openReviewApplicant, setOpenReviewApplicant] = useState(false);
  const handleOpenReviewApplicant = () => {
    setOpenReviewApplicant(!openReviewApplicant);
  };
  const openSchedulerDialog = (
    from?: string,
    to?: string,
    availabilityType?: AvailabilityType,
    deploymentCode?: string,
  ) => {
    if (!schedulerDialogOpen) {
      // Account for parameters
      setEditCell({ from, to, availabilityType, deploymentCode });
    } else {
      setEditCell(undefined);
    }
    setSchedulerDialogOpen(!schedulerDialogOpen);
  };
  const handleOpenEditFunctionsPopUp = (e: MouseEvent<HTMLElement>) => {
    if (openEditFunctionsPopUp === false) {
      e.stopPropagation();
    }
    setOpenEditFunctionsPopUp(!openEditFunctionsPopUp);
  };

  const getBackground =
    personnel?.status === Status.PENDING ? 'inactive' : 'grayBackground';
  return (
    <div
      className={`min-h-screen pt-12 pb-24 bg-${getBackground} w-full overflow-x-hidden`}
    >
      <Breadcrumbs
        placeholder={'Breadcrumbs'}
        className="px-12 bg-grayBackground max-w-full"
      >
        <Link to={Routes.Dashboard} className="text-linkBlue">
          <div className="flex flex-row items-center">
            <ChevronLeftIcon className="h-4 w-4 fill-[#003366]" />
            <span className="pl-2 underline decoration-solid">
              Personnel (Dashboard)
            </span>
          </div>
        </Link>
        {personnel && (
          <span className="font-bold text-black">
            {personnel.firstName} {personnel.lastName}
          </span>
        )}
      </Breadcrumbs>

      {personnel && (
        <div>
          <div className="pt-12">
            <ProfileHeader
              personnel={personnel}
              role={role}
              handleOpenReviewApplicant={handleOpenReviewApplicant}
              updatePersonnel={updatePersonnel}
            />

            <ProfileDetails
              openEditProfilePopUp={handleOpenEditProfilePopUp}
              personnel={personnel}
            />

            <ProfileFunctions
              functions={functions}
              personnel={personnel}
              openEditFunctionsPopUp={handleOpenEditFunctionsPopUp}
            />
            <Scheduler
              name={personnel.firstName}
              availability={availability}
              onChangeAvailabilityDates={onChangeAvailabilityQuery}
              openSchedulerDialog={openSchedulerDialog}
            />
            <ProfileNotes
              personnel={personnel}
              handleOpenEditNotes={handleOpenEditNotes}
              handleOpenEditCoordinatorNotes={handleOpenEditCoordinatorNotes}
            />
          </div>

          {/* Edit Profile */}
          <DialogUI
            open={openEditProfilePopUp}
            onClose={updatePersonnel}
            handleOpen={handleOpenEditProfilePopUp}
            title={'Edit Member Details'}
            style={'lg:w-2/3 xl:w-1/2'}
          >
            <ProfileEditForm
              personnel={personnel}
              open={openEditProfilePopUp}
              handleOpenEditProfilePopUp={handleOpenEditProfilePopUp}
              updatePersonnel={updatePersonnel}
            />
          </DialogUI>

          {/* Functions */}
          <DialogUI
            open={openEditFunctionsPopUp}
            onClose={() => {}}
            handleOpen={handleOpenEditFunctionsPopUp}
            title={'Edit Experience Levels'}
            style={'lg:w-2/3 xl:w-1/2'}
          >
            <ProfileFunctionEdit
              personnel={personnel}
              open={openEditFunctionsPopUp}
              allFunctions={functions}
              handleOpenEditFunctionsPopUp={handleOpenEditFunctionsPopUp}
              updatePersonnelExperiences={savePersonnelExperiences}
            />
          </DialogUI>

          {/* Notes */}
          <DialogUI
            open={openEditNotes}
            onClose={handleOpenEditNotes}
            handleOpen={handleOpenEditNotes}
            title={'Edit Notes'}
            style={'lg:w-2/3 xl:w-1/2'}
          >
            <EditNotes
              name={'logisticsNotes'}
              label="Notes"
              notes={{ logisticsNotes: personnel.logisticsNotes }}
              onSubmit={updatePersonnel}
              handleClose={handleOpenEditNotes}
            />
          </DialogUI>

          {/* Coordinator Notes */}
          <DialogUI
            open={openEditCoordinatorNotes}
            onClose={handleOpenEditCoordinatorNotes}
            handleOpen={handleOpenEditCoordinatorNotes}
            title={'Edit Coordinator Notes'}
            style={'lg:w-2/3 xl:w-1/2'}
          >
            <EditNotes
              name={'coordinatorNotes'}
              label="Coordinator Notes"
              notes={{ coordinatorNotes: personnel.coordinatorNotes }}
              onSubmit={updatePersonnel}
              handleClose={handleOpenEditCoordinatorNotes}
            />
          </DialogUI>
          <DialogUI
            open={openReviewApplicant}
            onClose={handleOpenReviewApplicant}
            handleOpen={handleOpenReviewApplicant}
            title={'Confirm Review'}
            style={'w-3/4 lg:w-1/3 xl:w-1/4'}
          >
            <ReviewApplicant
              onClose={handleOpenReviewApplicant}
              onClick={() => {
                updatePersonnel({
                  status: Status.ACTIVE,
                  dateJoined: dayjs(new Date()),
                });
                handleOpenReviewApplicant();
              }}
            />
          </DialogUI>

          {/* Scheduler */}
          <Dialog
            open={schedulerDialogOpen}
            handler={handleSchedulerOpen}
            placeholder={''}
            size="md"
          >
            <DialogHeader
              placeholder={''}
              className="flex flex-row align-middle bg-calBlue"
            >
              <h4 className="grow font-bold">
                {editCell?.availabilityType ? 'Edit Availability' : 'New Availability'}
              </h4>
              <Button
                placeholder={''}
                variant="text"
                className="text-sm"
                onClick={() => setSchedulerDialogOpen(false)}
              >
                Cancel
              </Button>
            </DialogHeader>
            <DialogBody placeholder={''}>
              <SchedulerPopUp
                editedFrom={editCell?.from}
                editedTo={editCell?.to}
                editedAvailabilityType={editCell?.availabilityType}
                editedDeploymentCode={editCell?.deploymentCode}
                editMode={!!editCell?.availabilityType}
                onSave={saveAvailabilityDates}
              />
            </DialogBody>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default Profile;
