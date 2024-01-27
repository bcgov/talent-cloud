import { ButtonTypes, Region } from '@/common';
import {
  MultiSelectGroup,
  Button,
  CascadingMenu,
  MultiSelect,
  Search,
} from '@/components';
import type { DashboardFields, DashboardFilters } from './constants';
import type { ChangeEvent } from 'react';

export const Filters = ({
  fields,
  onChange,
  handleClose,
  handleChange,
  handleSearch,
  onClear,
  filterValues,
}: {
  fields: DashboardFields;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  handleClose: (name: string, value?: string) => void;
  onClear: () => void;
  filterValues: DashboardFilters;
}) => {
  return (
    <div className="shadow-sm rounded-sm mx-auto bg-grayBackground mb-16 mt-8 p-12 grid grid-cols-1  lg:grid-cols-6 gap-12">
      <div className="col-span-1 lg:col-span-2">
        <Search
          field={fields.name}
          handleSearchInput={handleSearch}
          value={filterValues.name}
        />
      </div>

      <div className="col-span-1 mt-12 lg:mt-0 lg:col-span-4">
        <div className="grid grid-cols-1 gap-12 md:gap-0 md:grid-cols-4">
          <div className="col-span-1">
            <MultiSelect
              field={{ name: 'region', options: Object.values(Region) }}
              values={filterValues.region}
              label="Region"
              onChange={onChange}
              handleClose={handleClose}
            />
          </div>
          <div className="col-span-1 md:col-span-3">
            <MultiSelectGroup
              onChange={onChange}
              field={{
                ...fields.location,
                groupedOptions:
                  filterValues.region && filterValues.region.length > 0
                    ? fields.location?.groupedOptions?.filter((itm) =>
                        filterValues.region.includes(
                          Region[itm.label as keyof typeof Region],
                        ),
                      )
                    : fields?.location?.groupedOptions,
              }}
              handleClose={handleClose}
              label="Work Location"
              values={filterValues.location}
            />
          </div>
        </div>
      </div>

      <div className="col-span-1 lg:col-span-3">
        <CascadingMenu
          field={fields.function}
          nestedField={fields.experience}
          nestedValue={filterValues.experience}
          label="Function"
          onChange={handleChange}
          value={filterValues.function}
        />
      </div>
      <div className="col-span-1 lg:col-span-3">
        <div className="flex flex-row no-wrap items-center justify-end text-center h-full">
          <Button type={ButtonTypes.SECONDARY} text="Clear All" onClick={onClear} />
        </div>
      </div>
    </div>
  );
};
