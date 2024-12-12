import {
  MultiSelectGroup,
  CascadingMenu,
  MultiSelect,
  Search,
  DatePicker,
  Button,
} from '@/components';
import { SingleSelect } from '@/components/filters/SingleSelect';
import { useProgramFieldData } from '@/hooks/useProgramFieldData';
import { ButtonTypes, Program } from '@/common';
import { useFilters } from '@/hooks/useFilters';
import type { DateRange } from 'react-day-picker';
import { useState } from 'react';
import { Checkbox } from '@material-tailwind/react';

export const DashboardFilters = ({ program }: { program?: Program }) => {
  const { filters } = useProgramFieldData(program);

  const {
    filterValues,
    availabilityDates,
    setAvailabilityDates,
    onClear,
    handleRemove,
    handleSetDates,
    handleChangeOne,
    clearSearchParams,
    handleChange,
    searchValue,
    setSearchValue,
    disabled,
  } = useFilters();

  const [experienceCheckbox, setExperienceCheckbox] = useState<
    'PREVIOUSLY_DEPLOYED' | 'INTERESTED' | null
  >();
  const [includeTravel, setIncludeTravel] = useState<boolean>(
    filterValues.includeTravel === 'true',
  );

  return (
    <div className="shadow-sm rounded-sm mx-auto bg-grayBackground mb-16 mt-8 p-12 grid grid-cols-1 lg:grid-cols-7 gap-12">
      {/** lg - column 1 start */}
      <div className="col-span-1 lg:col-span-2">
        <Search
          field={filters.name}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          handleChange={handleChangeOne}
          handleClose={clearSearchParams}
        />
      </div>
      <div className="col-span-1 mt-12 lg:mt-0 lg:col-span-5">
        <div className="grid grid-cols-1 gap-12 md:gap-0 md:grid-cols-4">
          <div className="col-span-1">
            <MultiSelect
              field={program === Program.BCWS ? filters.fireCentre : filters.region}
              values={
                program === Program.BCWS
                  ? filterValues.fireCentre
                  : filterValues.region
              }
              label={program === Program.BCWS ? 'Fire Centre' : 'Region'}
              handleChange={handleChange}
              handleClose={handleRemove}
              handleCloseMany={clearSearchParams}
              maxChips={1}
            />
          </div>
          <div className="col-span-1 md:col-span-3">
            <MultiSelectGroup
              onChange={handleChange}
              handleClose={handleRemove}
              handleCloseMany={clearSearchParams}
              field={{
                ...filters.location,
                groupedOptions:
                  filterValues[program === Program.BCWS ? 'fireCentre' : 'region']
                    .length > 0
                    ? filters.location.groupedOptions?.filter((itm: any) =>
                        filterValues[
                          program === Program.BCWS ? 'fireCentre' : 'region'
                        ]?.includes(itm.value.toString()),
                      )
                    : filters.location.groupedOptions,
              }}
              label="Home Location"
              values={filterValues.location}
              groupValues={
                filterValues[program === Program.BCWS ? 'fireCentre' : 'region']
              }
              groupField={
                program === Program.BCWS ? filters.fireCentre : filters.region
              }
            />
            <Checkbox
              crossOrigin=""
              label="Show members willing to travel to the selected location(s)"
              checked={includeTravel && !!filterValues.location?.length}
              name="includeTravel"
              disabled={!filterValues.location?.length}
              iconProps={{ color: 'blue-700' }}
              onChange={(e) => {
                setIncludeTravel(e.target.checked);
                handleChangeOne(e.target.name, e.target.checked ? 'true' : 'false');
              }}
            />
          </div>
        </div>
      </div>

      {/** lg - column 2 start */}
      <div className="col-span-1 lg:col-span-3">
        <CascadingMenu
          field={program === Program.BCWS ? filters.section : filters.function}
          nestedField={program === Program.BCWS ? filters.role : filters.experience}
          nestedValue={
            program === Program.BCWS ? filterValues.role : filterValues.experience
          }
          label={
            program === Program.BCWS ? 'Section/Role' : 'Function & Experience Level'
          }
          onChange={handleChangeOne}
          handleClose={(name, nestedName) => {
            clearSearchParams(name);
            clearSearchParams(nestedName);
          }}
          value={
            program === Program.BCWS ? filterValues.section : filterValues.function
          }
          program={program}
        />
        {program === Program.BCWS && (
          <div className="flex flex-row gap-8">
            <Checkbox
              crossOrigin=""
              label="Show experienced only"
              checked={
                experienceCheckbox === 'PREVIOUSLY_DEPLOYED' &&
                !!filterValues.section
              }
              name="experience"
              disabled={!filterValues.role || !filterValues.section}
              iconProps={{ color: 'blue-700' }}
              onChange={(e) => {
                if (e.target.checked) {
                  setExperienceCheckbox('PREVIOUSLY_DEPLOYED');
                  handleChangeOne(e.target.name, 'PREVIOUSLY_DEPLOYED');
                } else {
                  setExperienceCheckbox(null);
                  handleRemove(e.target.name, 'PREVIOUSLY_DEPLOYED');
                }
              }}
            />
            <Checkbox
              crossOrigin=""
              label="Show interested only"
              checked={experienceCheckbox === 'INTERESTED' && !!filterValues.section}
              name="experience"
              disabled={!filterValues.role || !filterValues.section}
              iconProps={{ color: 'blue-700' }}
              onChange={(e) => {
                if (e.target.checked) {
                  setExperienceCheckbox('INTERESTED');
                  handleChangeOne(e.target.name, 'INTERESTED');
                } else {
                  setExperienceCheckbox(null);
                  handleRemove(e.target.name, 'INTERESTED');
                }
              }}
            />
          </div>
        )}
      </div>
      <div className="col-span-1 mt-12 lg:mt-0 lg:col-span-3">
        <div className="grid grid-cols-1 gap-12 md:gap-0 md:grid-cols-3">
          <div className="col-span-1">
            <SingleSelect
              field={filters.availabilityType}
              label="Availability"
              value={filterValues.availabilityType}
              onChange={handleChangeOne}
              handleClose={() => {
                const range: DateRange | undefined = {
                  from: undefined,
                  to: undefined,
                };
                clearSearchParams('availabilityType');
                clearSearchParams('availabilityFromDate');
                clearSearchParams('availabilityToDate');
                setAvailabilityDates(range);
              }}
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <DatePicker
              field={filters.availabilityDates}
              label="Availability Date Range"
              value={availabilityDates}
              onChange={handleSetDates}
              disabled={!filterValues.availabilityType}
              reset={() => {
                const range: DateRange | undefined = {
                  from: undefined,
                  to: undefined,
                };
                clearSearchParams('availabilityFromDate');
                clearSearchParams('availabilityToDate');
                clearSearchParams('availabilityType');
                setAvailabilityDates(range);
              }}
            />
          </div>
        </div>
      </div>
      <div
        className={
          program === Program.BCWS
            ? 'text-center md:col-span-1 flex flex-nowrap self-end pb-10'
            : 'text-center md:col-span-1 flex flex-nowrap self-end'
        }
      >
        <Button
          variant={ButtonTypes.SECONDARY}
          text="Clear All"
          onClick={onClear}
          disabled={disabled}
        />
      </div>
    </div>
  );
};
