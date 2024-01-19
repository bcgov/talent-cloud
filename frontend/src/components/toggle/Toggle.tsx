import { Switch } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import type { FieldInterface } from '../table';

export const Toggle = ({
  field,
  handleToggle,
}: {
  field: FieldInterface;
  handleToggle: (val: boolean) => void;
}) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    handleToggle(checked);
  }, [checked]);

  return (
    <div className="flex flex-row items-center mr-12">
      <label htmlFor="showInactive" className="px-4">
        Show Inactive
      </label>
      <Switch
        checked={checked}
        onChange={setChecked}
        name={field.name}
        defaultChecked={false}
        as={Fragment}
      >
        {({ checked }) => (
          <button
            className={`${
              checked ? 'bg-backgroundBlue' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">{field.name}</span>
            <span
              className={`${
                checked ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </button>
        )}
      </Switch>
    </div>
  );
};
