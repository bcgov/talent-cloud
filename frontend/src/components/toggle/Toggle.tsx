import { Switch } from '@headlessui/react';
import { Fragment } from 'react';

export const Toggle = ({
  value,
  handleToggle,
  label,
}: {
  value: boolean;
  handleToggle: (checked: boolean) => void;
  label?: string;
}) => {
  return (
    <>
      {label && <p className="label px-4">{label}</p>}
      <Switch
        checked={value}
        onChange={handleToggle}
        name={'showInactive'}
        defaultChecked={false}
        as={Fragment}
      >
        {({ checked }) => (
          <button
            className={`${
              checked ? 'bg-backgroundBlue' : 'bg-gray-200'
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">{'showInactive'}</span>
            <span
              className={`${
                checked ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </button>
        )}
      </Switch>
    </>
  );
};
