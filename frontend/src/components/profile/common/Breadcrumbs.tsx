import type { Personnel } from '@/common';
import { Status } from '@/common';
import { Routes } from '@/routes';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { Breadcrumbs } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

export const ProfileBreadcrumbs = ({ personnel }: { personnel: Personnel }) => {
  return (
    <Breadcrumbs
      placeholder={'Breadcrumbs'}
      className={`md:px-12 xl:px-24 2xl:px-64 max-w-full ${personnel?.status === Status.PENDING ? 'bg-defaultGray' : 'bg-grayBackground'}`}
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
  );
};
