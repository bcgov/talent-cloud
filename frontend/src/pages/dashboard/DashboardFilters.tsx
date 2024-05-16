import { ButtonTypes } from '@/common';
import {
  MultiSelectGroup,
  Button,
  CascadingMenu,
  MultiSelect,
  Search,
  DatePicker,
} from '@/components';
import { SingleSelect } from '@/components/filters/SingleSelect';
import type { DateRange } from 'react-day-picker';
import { useGetFilters } from '@/hooks/useGetFilters';
import type { DashboardFilters } from './constants';
import { Route } from '@/providers';
import type { ChangeEvent } from 'react';

export const Filters = ({
  filterValues,
  changeHandlers,
  route,
}: {
  filterValues: DashboardFilters;
  changeHandlers: {
    handleMultiSelect: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSingleSelect: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
    onClear: () => void;
    handleClose: (name: string, value: string) => void;
    handleCloseMany: (name: string) => void;
    handleSetDates: (range: DateRange | undefined) => void;
    resetType: () => void;
  };
  route?: Route;
}) => {
  const { filters } = useGetFilters();

  const {
    handleMultiSelect,
    handleSingleSelect,
    handleSearch,
    onClear,
    handleClose,
    handleCloseMany,
    handleSetDates,
    resetType,
  } = changeHandlers;
  const getOptions = () => {
    if (route === Route.BCWS) {
      return filterValues.fireCentre && filterValues.fireCentre.length > 0
        ? filters.location?.groupedOptions?.filter((itm) =>
            filterValues?.fireCentre?.includes(itm.label),
          )
        : filters?.location?.groupedOptions;
    } else {
      return filterValues.region && filterValues.region.length > 0
        ? filters.location?.groupedOptions?.filter((itm) =>
            filterValues?.region?.includes(itm.label),
          )
        : filters?.location?.groupedOptions;
    }
  };

  return (
    <div className="shadow-sm rounded-sm mx-auto bg-grayBackground mb-16 mt-8 p-12 grid grid-cols-1  lg:grid-cols-7 gap-12">
      {/** lg - column 1 start */}
      <div className="col-span-1 lg:col-span-2">
        <Search
          field={filters.name}
          handleSearchInput={handleSearch}
          value={filterValues.name}
        />
      </div>
      <div className="col-span-1 mt-12 lg:mt-0 lg:col-span-5">
        <div className="grid grid-cols-1 gap-12 md:gap-0 md:grid-cols-4">
          <div className="col-span-1">
            <MultiSelect
              field={route === Route.BCWS ? filters.fireCentre : filters.region}
              values={
                route === Route.BCWS ? filterValues.fireCentre : filterValues.region
              }
              label={route === Route.BCWS ? 'Fire Centre' : 'Region'}
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
                groupedOptions: getOptions(),
              }}
              label="Home Location"
              values={filterValues.location}
            />
          </div>
        </div>
      </div>

      {/** lg - column 2 start */}
      <div className="col-span-1 md:col-span-3">
        <CascadingMenu
          field={route === Route.BCWS ? filters.section : filters.function}
          nestedField={route === Route.BCWS ? filters.role : filters.experience}
          nestedValue={
            route === Route.BCWS ? filterValues.role : filterValues.experience
          }
          label={
            route === Route.BCWS ? 'Section/Role' : 'Function & Experience Level'
          }
          onChange={handleSingleSelect}
          value={route === Route.BCWS ? filterValues.section : filterValues.function}
        />
      </div>
      <div className="col-span-1 mt-12 lg:mt-0 lg:col-span-3">
        <div className="grid grid-cols-1 gap-12 md:gap-0 md:grid-cols-3">
          <div className="col-span-1">
            <SingleSelect
              field={filters.availabilityType}
              label="Availability"
              value={filterValues.availabilityType}
              onChange={handleSingleSelect}
              resetDates={handleSetDates}
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <DatePicker
              field={filters.availabilityDates}
              label="Availability Date Range"
              value={filterValues.availabilityDates}
              onChange={handleSetDates}
              disabled={!filterValues.availabilityType}
              reset={resetType}
            />
          </div>
        </div>
      </div>
      <div className="text-center  md:col-span-1 flex  flex-nowrap self-end pb-1">
        <Button
          variant={ButtonTypes.SECONDARY}
          text="Clear All"
          onClick={onClear}
          disabled={
            [
              filterValues.name,
              filterValues.experience,
              filterValues.function,
              filterValues.availabilityType,
              filterValues.availabilityDates.from,
              filterValues.availabilityDates.to,
            ].filter((itm) => itm).length === 0 &&
            filterValues?.region?.length === 0 &&
            filterValues?.location?.length === 0
          }
        />
      </div>
    </div>
  );
};
