import type { Personnel } from '@/common';
import { Role, Status } from '@/common';
import { Toggle } from '@/components/toggle/Toggle';

export const ProfileToggle = ({
  personnel,
  roles,
  updatePersonnel,
}: {
  personnel: Personnel;
  roles?: Role[];
  updatePersonnel: ({ status }: { status: Status }) => void;
}) => {
  return (
    <div className=" pb-12 bg-white w-full pt-4  ">
      <div className="flex flex-row justify-start md:items-center md:mr-12 lg:ml-48">
        {roles?.includes(Role.COORDINATOR) &&
          personnel.status !== Status.PENDING && (
            <Toggle
              value={personnel.status === Status.ACTIVE}
              handleToggle={(checked: boolean) =>
                updatePersonnel({
                  status: checked ? Status.ACTIVE : Status.INACTIVE,
                })
              }
              label={`Switch to ${personnel.status === Status.ACTIVE ? 'Inactive' : 'Active'}`}
            />
          )}
      </div>
    </div>
  );
};
