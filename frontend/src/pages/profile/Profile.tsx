import { Breadcrumbs, Button } from '@material-tailwind/react';
import { ChevronLeftIcon, HomeIcon, MapPinIcon } from '@heroicons/react/24/solid';
import { useParams } from 'react-router-dom';
import usePersonnel from '@/hooks/usePersonnel';
import MemberDetails from './MemberDetails';

function HorizontalLine() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      strokeWidth={1}
      stroke="gray"
      className="h-10 w-10"
    >
      <path id="triangle" d="M1 5 L0 35" />
    </svg>
  );
}

const Profile = () => {
  const { personnelId } = useParams() as { personnelId: string };
  const { personnel } = usePersonnel({ personnelId });

  return (
    <div className="h-full pt-12 pb-24 bg-grayBackground">
      {personnel && (
        <div>
          <Breadcrumbs placeholder={''} className="px-12">
            <a href="/dashboard" className="text-linkBlue">
              <div className="flex flex-row items-center">
                <ChevronLeftIcon className="h-4 w-4 fill-[#003366]" />
                <span className="pl-2 underline decoration-solid">
                  Personnel (Dashboard)
                </span>
              </div>
            </a>
            <span className="font-bold">
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
              <div className="flex items-center flex-row pb-2 pr-12">
                <div className="flex items-center pr-12">
                  <h2 className="font-semibold">
                    {personnel.firstName} {personnel.lastName}
                  </h2>
                  <div className="pl-4">
                    <span className="bg-activeGreen px-2 rounded-full">
                      {personnel.active === true ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
                <div>
                  <HorizontalLine />
                </div>
                <div className="pl-16">
                  <div className="flex flex-row">
                    <MapPinIcon className="h-7 w-7" />
                    <div className="pl-2">
                      <p className="text-textGray">Work Location</p>
                      <p>
                        {personnel.workLocation}, {personnel.region}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="pl-12 grow">
                  <div className="flex flex-row">
                    <HomeIcon className="h-7 w-7" />
                    <div className="pl-2">
                      <p className="text-textGray">Home Location</p>
                      <p>
                        {personnel.workLocation}
                        {/* TODO: When Home Location is made on backend, use this */}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <Button
                    placeholder="Edit Info"
                    className="bg-blue font-thin capitalize text-base"
                  >
                    Edit Info
                  </Button>
                </div>
              </div>
              <MemberDetails personnel={personnel} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
