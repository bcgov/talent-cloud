import type { Personnel } from '@/common';
import { Role, Status } from '@/common';
import { Toggle } from '@/components/toggle/Toggle';

export const ProfileToggle = ({
  personnel,
  roles,
  updatePersonnel,
  disabled,
}: {
  personnel: Personnel;
  roles?: Role[];
  updatePersonnel: ({ status }: { status: Status }) => void;
  disabled?: boolean;
}) => {
  return (
    <div className="w-full">
      <div className="flex flex-row justify-start">
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
              disabled={disabled}
            />
          )}
      </div>
    </div>
  );
};
