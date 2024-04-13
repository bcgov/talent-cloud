import type { Status } from '@/common';
import { Tab } from '@headlessui/react';
import type { ReactElement } from 'react';
import type { TabCount } from '../table';

export type TabData = {
  label: string;
  value: Status;
  index: number;
};

export type TabProps = {
  onChangeTab: (index: number) => void;
  tabs: TabData[];
  selectedTab: number;
  counts: TabCount;
  children: ReactElement;
};

export const Tabs = ({
  onChangeTab,
  tabs,
  selectedTab,
  counts,
  children,
}: TabProps) => {
  return (
    <Tab.Group selectedIndex={selectedTab} onChange={onChangeTab}>
      <Tab.List className={`bg-white sticky top-24 md:px-6 px-0`} as="div">
        {tabs.map(({ label, value }, index) => (
          <Tab
            key={value}
            className={`px-2 md:px-6 py-6 ${index === 1 ? 'border-l border-r  border-gray-400' : 'border-0'}`}
          >
            {({ selected }) => (
              <button className={` ${selected ? 'font-bold' : 'font-normal'}`}>
                {' '}
                {label}{' '}
                <span
                  className={`mx-4 px-2.5 border border-gray-400 rounded-sm py-1 ${selected ? 'bg-primaryBlue text-white' : 'text-defaultGray '}`}
                >
                  {counts[value]}
                </span>
              </button>
            )}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
        {tabs.map(({ value }) => (
          <Tab.Panel key={value} className="w-full p-0 m-0">
            {children}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};
