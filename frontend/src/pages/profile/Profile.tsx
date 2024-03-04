import type { MouseEvent } from 'react';
import { useState } from 'react';
import dayjs from 'dayjs';
import {
  Breadcrumbs,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
} from '@material-tailwind/react';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { useParams } from 'react-router-dom';
import usePersonnel from '@/hooks/usePersonnel';
import useAvailability from '@/hooks/useAvailability';
import ProfileDetails from './ProfileDetails';
import ProfileHeader from './ProfileHeader';
import { useRole } from '@/hooks';
import Scheduler from './Scheduler';
import SchedulerPopUp from './SchedulerPopUp';
import type { AvailabilityRange } from '../dashboard';
import { ProfileEditForm } from './ProfileEditForm';
import type { AvailabilityType } from '@/common';

const Profile = () => {
  const { personnelId } = useParams() as { personnelId: string };
  const { personnel, updatePersonnel } = usePersonnel({ personnelId });
  const { availability, getAvailability, saveAvailability } = useAvailability({
    personnelId,
  });

  const { role } = useRole();
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
  const [openEditPopUp, setOpenEditPopUp] = useState(false);

  const handleOpenEditPopUp = (e: MouseEvent<HTMLElement>) => {
    if (openEditPopUp === false) {
      e.stopPropagation();
    }
    setOpenEditPopUp(!openEditPopUp);
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

  return (
    <div className="min-h-screen pt-12 pb-24 bg-grayBackground w-full overflow-x-hidden">
      <Breadcrumbs
        placeholder={'Breadcrumbs'}
        className="px-12 bg-grayBackground max-w-full"
      >
        <a href="/dashboard" className="text-linkBlue">
          <div className="flex flex-row items-center">
            <ChevronLeftIcon className="h-4 w-4 fill-[#003366]" />
            <span className="pl-2 underline decoration-solid">
              Personnel (Dashboard)
            </span>
          </div>
        </a>
        {personnel && (
          <span className="font-bold text-black">
            {personnel.firstName} {personnel.lastName}
          </span>
        )}
      </Breadcrumbs>

      {personnel && (
        <div>
          <div className="pt-12">
            <ProfileHeader personnel={personnel} role={role} />

            <ProfileDetails
              openEditPopUp={handleOpenEditPopUp}
              personnel={personnel}
            />
            <ProfileEditForm
              personnel={personnel}
              open={openEditPopUp}
              handleOpenEditPopUp={handleOpenEditPopUp}
              updatePersonnel={updatePersonnel}
            />
            <Scheduler
              name={personnel.firstName}
              availability={availability}
              onChangeAvailabilityDates={onChangeAvailabilityQuery}
              openSchedulerDialog={openSchedulerDialog}
            />
          </div>
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
              <h4 className="grow font-bold">New Event</h4>
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
