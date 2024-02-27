import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import {
  Breadcrumbs,
  Dialog,
  DialogHeader,
  DialogBody,
} from '@material-tailwind/react';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { useParams } from 'react-router-dom';
import usePersonnel from '@/hooks/usePersonnel';
import ProfileDetails from './ProfileDetails';
import ProfileHeader from './ProfileHeader';
import { useRole } from '@/hooks';
import Scheduler from './Scheduler';
import SchedulerPopUp from './SchedulerPopUp';
import type { AvailabilityRange } from '../dashboard';

const Profile = () => {
  const { personnelId } = useParams() as { personnelId: string };
  const { personnel, availability, setCurrentAvailability, saveAvailability } =
    usePersonnel({ personnelId });
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

  useEffect(() => {
    (async () => {
      setCurrentAvailability(availabilityQuery.from, availabilityQuery.to);
    })();
  }, [availabilityQuery]);

  const onChangeAvailabilityQuery = (from: string, to: string) => {
    setAvailabilityQuery({ from, to });
  };

  const saveAvailabilityDates = (dates: AvailabilityRange) => {
    saveAvailability(dates);
    setSchedulerDialogOpen(false);
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
              personnel={personnel}
              enableEdit={() => console.log('TODO!')}
            />
            <Scheduler
              name={personnel.firstName}
              availability={availability}
              onChangeAvailabilityDates={onChangeAvailabilityQuery}
              openSchedulerDialog={handleSchedulerOpen}
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
              <span
                className="text-sm cursor-pointer"
                onClick={() => setSchedulerDialogOpen(false)}
              >
                Cancel
              </span>
            </DialogHeader>
            <DialogBody placeholder={''}>
              <SchedulerPopUp onSave={saveAvailabilityDates} />
            </DialogBody>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default Profile;
