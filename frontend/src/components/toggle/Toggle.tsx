import { Switch } from '@headlessui/react';
import { Fragment } from 'react';

export const Toggle = ({
  value,
  handleToggle,
}: {
  value: boolean;
  handleToggle: (checked: boolean) => void;
}) => {

  return (
    <div className="flex flex-row justify-start md:items-center md:mr-12">
      <label htmlFor={"showInactive"} className="px-4">
        Show Inactive
      </label>
      <Switch
        checked={value}
        onChange={handleToggle}
        name={"showInactive"}
        defaultChecked={false}
        as={Fragment}
      >
        {({ checked }) => (
          <button
            className={`${
              checked ? 'bg-backgroundBlue' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">{"showInactive"}</span>
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
