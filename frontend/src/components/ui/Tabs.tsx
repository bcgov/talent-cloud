import type { Status } from '@/common';
import { Tab } from '@headlessui/react';

export type Tabs = {
  label: string;
  value: string;
  count: number | undefined;
}[];

export type TabData = {
  label: string;
  value: Status;
  count: number | string;
};

export type TabProps = {
  onChangeTab: (index: number) => void;
  tabs: Tabs;
  selectedTab: number;
};

export const Tabs = ({ onChangeTab, tabs, selectedTab }: TabProps) => {
  return (
    <Tab.Group selectedIndex={selectedTab} onChange={onChangeTab}>
      <Tab.List
        className={`flex flex-row bg-white sticky top-24 md:px-6 px-0`}
        as="div"
      >
        {tabs.map(({ label, value, count }, index) => (
          <Tab key={value}>
            {({ selected }) => (
              <>
                <button
                  className={`font-normal px-2 py-2 my-.5 md:px-6 ${index === 1 ? 'border-l border-r  border-gray-400' : 'border-0'} ${selected ? 'text-dark-700' : 'text-dark-600'}`}
                >
                  {' '}
                  {label}{' '}
                  <span
                    className={`mx-4 px-1.5 border border-gray-400 rounded-md py-1 ${selected ? 'bg-primaryBlue text-white' : 'text-defaultGray '}`}
                  >
                    {count}
                  </span>
                </button>
                {selected && (
                  <div className="border border-b w-full border-blue-900"></div>
                )}
              </>
            )}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
        {tabs.map(({ value }) => (
          <Tab.Panel key={value} className="w-full p-0 m-0" />
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};
