import { ButtonTypes } from '@/common';
import {
  MultiSelectGroup,
  Button,
  CascadingMenu,
  MultiSelect,
  Search,
  DatePicker,
} from '@/components';
import type { ChangeEvent } from 'react';
import { SingleSelect } from '@/components/filters/SingleSelect';
import type { DateRange } from 'react-day-picker';
import { useGetFilters } from '@/hooks/useGetFilters';
import type { DashboardFilters } from './constants';

export const Filters = ({
  handleMultiSelect,
  handleSingleSelect,
  handleSearch,
  onClear,
  filterValues,
  handleClose,
  handleCloseMany,
  handleSetDates,
}: {
  handleMultiSelect: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSingleSelect: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
  filterValues: DashboardFilters;
  handleClose: (name: string, value: string) => void;
  handleCloseMany: (name: string) => void;
  handleSetDates: (range: DateRange | undefined) => void;
}) => {
  const {filters} = useGetFilters();

  return (
    <div className="shadow-sm rounded-sm mx-auto bg-grayBackground mb-16 mt-8 p-12 grid grid-cols-1  lg:grid-cols-7 gap-12">
      {/** lg - column 1 start */}
      <div className="col-span-1 lg:col-span-2">
        <Search field={filters.name} handleSearchInput={handleSearch} />
      </div>

      <div className="col-span-1 mt-12 lg:mt-0 lg:col-span-5">
        <div className="grid grid-cols-1 gap-12 md:gap-0 md:grid-cols-4">
          <div className="col-span-1">
            <MultiSelect
              field={filters.region}
              values={filterValues.region}
              label="Region"
              onChange={handleMultiSelect}
              handleClose={handleClose}
              handleCloseMany={handleCloseMany}
            />
          </div>
          <div className="col-span-1 md:col-span-3">
            <MultiSelectGroup
              onChange={handleMultiSelect}
              handleClose={handleClose}
              handleCloseMany={handleCloseMany}
              field={{
                ...filters.location,
                groupedOptions:
                  filterValues.region && filterValues.region.length > 0
                    ? filters.location?.groupedOptions?.filter((itm) =>
                        filterValues?.region?.includes(itm.label),
                      )
                    : filters?.location?.groupedOptions,
              }}
              label="Work Location"
              values={filterValues.location}
            />
          </div>
        </div>
      </div>

      {/** lg - column 2 start */}
      <div className="col-span-1 lg:col-span-2">
        <CascadingMenu
          field={filters.function}
          nestedField={filters.experience}
          nestedValue={filterValues.experience}
          label="Function & Experience Level"
          onChange={handleSingleSelect}
          value={filterValues.function}
        />
      </div>
      <div className="col-span-1 mt-12 lg:mt-0 lg:col-span-4">
        <div className="grid grid-cols-1 gap-12 md:gap-0 md:grid-cols-3">
          <div className="col-span-1">
            <SingleSelect
              field={filters.availabilityType}
              label="Availability"
              value={filterValues.availabilityType}
              onChange={handleSingleSelect}
              handleClose={handleClose}
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <DatePicker
              field={filters.availabilityDates}
              label="Availability Date Range"
              value={filterValues.availabilityDates}
              onChange={handleSetDates}
            />
          </div>
        </div>
      </div>
      <div className="text-center  md:col-span-1 flex  flex-nowrap self-end pb-1">
        <Button variant={ButtonTypes.SECONDARY} text="Clear All" onClick={onClear} />
      </div>
    </div>
  );
};
