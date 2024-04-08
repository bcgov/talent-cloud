import type { Status } from '@/common';
import { Tab } from '@headlessui/react';
import type { ReactElement } from 'react';
import { useState } from 'react';

export type TabData = {
  label: string;
  value: Status;
  count: number;
};

export type TabProps = {
  onChangeTab: (value: Status) => void;
  data: TabData[];
  children: ReactElement;
};

export const Tabs = ({ onChangeTab, children, data }: TabProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
      <Tab.List className={`bg-white sticky top-24 md:px-6 px-0`} as="div">
        {data.map(({ label, value, count }, index) => (
          <Tab
            key={value}
            className={`px-2 md:px-6 py-6 ${index === 1 ? 'border-l border-r  border-gray-400' : 'border-0'}`}
          >
            {({ selected }) => (
              <button
                onClick={() => onChangeTab(value)}
                className={` ${selected ? 'font-bold' : 'font-normal'}`}
              >
                {' '}
                {label}{' '}
                <span
                  className={`mx-4 px-2.5 border border-gray-400 rounded-sm py-1 ${selected ? 'bg-primaryBlue text-white' : 'text-defaultGray '}`}
                >
                  {count}
                </span>
              </button>
            )}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
        {data.map(({ value }) => (
          <Tab.Panel key={value} className="w-full p-0 m-0">
            {children}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};
