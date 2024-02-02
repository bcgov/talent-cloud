import { Breadcrumbs } from '@material-tailwind/react';
// import { useParams } from 'react-router-dom';
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
  // const { personnelId } = useParams();
  return (
    <div className="h-screen pt-12 pb-24 bg-grayBackground">
      <div>
        <Breadcrumbs placeholder={''} className="px-12">
          <a href="/dashboard" className="text-linkBlue">
            <div className="flex flex-row items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={6}
                stroke="currentColor"
                className={'h-5 w-5 rotate-90'}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
              <span className="pl-4">Personnel (Dashboard)</span>
            </div>
          </a>
          <span className="font-bold">Hermione Granger</span>
        </Breadcrumbs>
        <div className="pt-12">
          <div className="px-10 float-left">
            <div className="w-32 h-32 grid rounded-full bg-blue justify-center content-center">
              <div>
                <h1 className="text-white font-bold">HG</h1>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center flex-row pb-2">
              <div className="flex items-center pr-12">
                <h2>Hermione Granger</h2>
                <div className="pl-4">
                  <span className="bg-activeGreen px-2 rounded-full">Active</span>
                </div>
              </div>
              <div>
                <HorizontalLine />
              </div>
              <div>
                <p className="text-textGray">Work Location</p>
                <p>Vancouver, SWE</p>
              </div>
            </div>
            <MemberDetails />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
