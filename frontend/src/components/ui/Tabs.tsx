import { Tab, TabGroup, TabList } from '@headlessui/react';

export type Tab = {
  label: string;
  value: string;
  count?: number | string;
  selected: boolean;
};
export type TabProps = {
  tabs: Tab[];
  changeTab: (value: unknown) => void;
};

export const Tabs = ({ tabs, changeTab }: TabProps) => {
  return (
    <TabGroup
      selectedIndex={tabs?.indexOf(
        tabs?.find((itm) => itm.selected === true) ?? tabs[0],
      )}
      onChange={(index) => changeTab(tabs[index].value ?? tabs[0].value)}
    >
      <TabList className={`flex flex-row bg-white md:px-6 px-0`} as="div">
        {tabs.map(({ label, value, count }, index) => (
          <Tab key={value}>
            {({ selected }) => (
              <>
                <div
                  className={`cursor-pointer font-normal px-2 py-2 my-.5 md:px-6 ${index === 1 ? 'border-l border-r  border-gray-400' : 'border-0'} ${selected ? 'text-dark-700' : 'text-dark-600'}`}
                >
                  {' '}
                  {label}{' '}
                  <span
                    className={`mx-4 px-1.5 border border-gray-400 rounded-md py-1 ${selected ? 'bg-primaryBlue text-white' : 'text-defaultGray '}`}
                  >
                    {count}
                  </span>
                </div>
                {selected && (
                  <div className="border border-b w-full border-blue-900"></div>
                )}
              </>
            )}
          </Tab>
        ))}
      </TabList>
    </TabGroup>
  );
};
