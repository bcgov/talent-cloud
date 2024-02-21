import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Breadcrumbs } from '@material-tailwind/react';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { useParams } from 'react-router-dom';
import usePersonnel from '@/hooks/usePersonnel';
import ProfileDetails from './ProfileDetails';
import ProfileHeader from './ProfileHeader';
import { useRole } from '@/hooks';
import Scheduler from './Scheduler';

const Profile = () => {
  const { personnelId } = useParams() as { personnelId: string };
  const { personnel, availability, getAvailability } = usePersonnel({ personnelId });
  const { role } = useRole();
  const [availabilityQuery, setAvailabilityQuery] = useState<{from: string, to: string}>({
    from: dayjs().startOf('month').format('YYYY-MM-DD'),
    to: dayjs().endOf('month').format('YYYY-MM-DD'),
  });

  useEffect(() => {
    (async() => {
      getAvailability(availabilityQuery.from, availabilityQuery.to);
    })();
  }, [availabilityQuery]);

  const onChangeAvailabilityQuery = (from: string, to: string) => {
    setAvailabilityQuery({ from, to });
  }

  return (
    <div className="min-h-screen pt-12 pb-24 bg-grayBackground">
      {personnel && (
        <div>
          <Breadcrumbs
            placeholder={'Breadcrumbs'}
            className="px-12 bg-grayBackground"
          >
            <a href="/dashboard" className="text-linkBlue">
              <div className="flex flex-row items-center">
                <ChevronLeftIcon className="h-4 w-4 fill-[#003366]" />
                <span className="pl-2 underline decoration-solid">
                  Personnel (Dashboard)
                </span>
              </div>
            </a>
            <span className="font-bold text-black">
              {personnel.firstName} {personnel.lastName}
            </span>
          </Breadcrumbs>
          <div className="pt-12">
            <div className="px-10 float-left">
              <div className="w-32 h-32 grid rounded-full bg-blue justify-center content-center">
                <div>
                  <h1 className="text-white font-bold text-5xl">
                    {personnel.firstName?.charAt(0)}
                    {personnel.lastName?.charAt(0)}
                  </h1>
                </div>
              </div>
            </div>
            <div>
              <ProfileHeader personnel={personnel} role={role} />
              <ProfileDetails personnel={personnel} />
              <Scheduler setAvailabilityQuery={onChangeAvailabilityQuery} />
            </div>
          </div>
          <div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
