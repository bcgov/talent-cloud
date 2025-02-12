import {
  MultiSelectGroup,
  CascadingMenu,
  Search,
  DatePicker,
  Button,
  GroupedMultiSelect,
} from '@/components';
import { SingleSelect } from '@/components/ui/SingleSelect';
import { useProgramFieldData } from '@/hooks/useProgramFieldData';
import { ButtonTypes, Filters, Program } from '@/common';
import { Checkbox } from '@material-tailwind/react';
import { format, parse } from 'date-fns';

export const DashboardFilters = ({
  searchParams,
  setSearchParams,
  program,
}: {
  searchParams: URLSearchParams;
  setSearchParams: (params: any) => any;
  program?: Program;
}) => {
  const { fields } = useProgramFieldData(program);

  const handleChange = (value: string) => {
    const date = new Date();
    searchParams.set(fields.availabilityType.name, value);
    if (!searchParams.get(Filters.AVAILABILITY_FROM_DATE)) {
      searchParams.set(
        Filters.AVAILABILITY_FROM_DATE,
        format(
          new Date(date.getFullYear(), date.getMonth(), date.getDate()),
          'yyyy-MM-dd',
        ),
      );
    }
    if (!searchParams.get(Filters.AVAILABILITY_TO_DATE)) {
      searchParams.set(
        Filters.AVAILABILITY_TO_DATE,
        format(
          new Date(date.getFullYear(), date.getMonth(), date.getDate()),
          'yyyy-MM-dd',
        ),
      );
    }
    setSearchParams({ ...Object.fromEntries(searchParams) });
  };
  
  return (
    <div className="shadow-sm rounded-sm mx-auto bg-grayBackground mb-16 mt-8 p-12 grid grid-cols-1 lg:grid-cols-7 gap-12">
      {/** lg - column 1 start */}
      <div className="col-span-1 lg:col-span-2">
        <Search
          field={fields.name}
          setSearchParams={setSearchParams}
          searchParams={searchParams}
        />
      </div>
      <div className="col-span-1 mt-12 lg:mt-0 lg:col-span-5">
        <div className="grid grid-cols-1 gap-12 md:gap-0 md:grid-cols-4">
          <div className="col-span-1">
            <GroupedMultiSelect
              field={program === Program.BCWS ? fields.fireCentre : fields.region}
              program={program}
              label={program === Program.BCWS ? 'Fire Centre' : 'Region'}
              maxChips={1}
              setSearchParams={setSearchParams}
              searchParams={searchParams}
              groupedField={fields.location}
            />
          </div>
          <div className="col-span-1 md:col-span-3">
            <MultiSelectGroup
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              field={fields.location}
              label="Home Location"
              program={program}
              groupedField={
                program === Program.BCWS ? fields.fireCentre : fields.region
              }
            />
            <Checkbox
              crossOrigin=""
              label="Show members willing to travel to the selected location(s)"
              checked={searchParams.get(Filters.INCLUDE_TRAVEL) === 'true'}
              name="includeTravel"
              disabled={
                program === Program.BCWS
                  ? searchParams.getAll(Filters.FIRE_CENTRE).length === 0
                  : searchParams.getAll(Filters.REGION).length === 0
              }
              iconProps={{ color: 'primaryBlue' }}
              onChange={(e) => {
                searchParams.set(e.target.name, e.target.checked.toString());
                setSearchParams({ ...Object.fromEntries(searchParams) });
              }}
            />
          </div>
        </div>
      </div>

      {/** lg - column 2 start */}
      <div className="col-span-1 lg:col-span-3">
        <CascadingMenu
          field={program === Program.BCWS ? fields.section : fields.function}
          nestedField={program === Program.BCWS ? fields.role : fields.experience}
          nestedValue={
            searchParams.get(
              program === Program.BCWS ? Filters.ROLE : Filters.EXPERIENCE,
            ) ?? ''
          }
          value={
            searchParams.get(program === Program.BCWS ? 'section' : 'function') ?? ''
          }
          label={
            program === Program.BCWS ? 'Section/Role' : 'Function & Experience Level'
          }
          program={program}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
        {program === Program.BCWS && (
          <div className="flex flex-row gap-8">
            <Checkbox
              crossOrigin=""
              label="Show experienced only"
              checked={searchParams.get('experience') === 'PREVIOUSLY_DEPLOYED'}
              name="experience"
              disabled={!searchParams.get('role') || !searchParams.get('section')}
              iconProps={{ color: 'primaryBlue' }}
              onChange={(e) => {
                searchParams.get('experience') === 'PREVIOUSLY_DEPLOYED'
                  ? searchParams.delete('experience')
                  : searchParams.set(e.target.name, 'PREVIOUSLY_DEPLOYED');

                setSearchParams({ ...Object.fromEntries(searchParams) });
              }}
            />
            <Checkbox
              crossOrigin=""
              label="Show interested only"
              checked={searchParams.get('experience') === 'INTERESTED'}
              name="experience"
              disabled={!searchParams.get('role') || !searchParams.get('section')}
              iconProps={{ color: 'primaryBlue' }}
              onChange={(e) => {
                searchParams.get('experience') === 'INTERESTED'
                  ? searchParams.delete('experience')
                  : searchParams.set(e.target.name, 'INTERESTED');
                setSearchParams({ ...Object.fromEntries(searchParams) });
              }}
            />
          </div>
        )}
      </div>
      <div className="col-span-1 mt-12 lg:mt-0 lg:col-span-3">
        <div className="grid grid-cols-1 gap-12 md:gap-0 md:grid-cols-3">
          <div className="col-span-1">
            <SingleSelect
              field={fields.availabilityType}
              label="Availability"
              value={searchParams.get('availabilityType') ?? ''}
              placeholder="Select availability type"
              useChip={true}
              handleChange={handleChange}
              handleClose={() => {
                searchParams.delete('availabilityType');
                searchParams.delete('availabilityFromDate');
                searchParams.delete('availabilityToDate');
                setSearchParams({ ...Object.fromEntries(searchParams) });
              }}
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <DatePicker
              field={fields.availabilityDates}
              label="Availability Date Range"
              value={{
                from: parse(
                  searchParams.get('availabilityFromDate') ??
                    format(new Date(), 'yyyy-MM-dd'),
                  'yyyy-MM-dd',
                  new Date(),
                ),
                to: parse(
                  searchParams.get('availabilityToDate') ??
                    format(new Date(), 'yyyy-MM-dd'),
                  'yyyy-MM-dd',
                  new Date(),
                ),
              }}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
              disabled={!searchParams.get('availabilityType')}
              reset={() => {
                searchParams.delete('availabilityToDate');
                searchParams.delete('availabilityFromDate');
                searchParams.delete('availabilityType');
                setSearchParams({ ...Object.fromEntries(searchParams) });
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
          onClick={() => {
            setSearchParams({
              page: '1',
              rows: searchParams.get('rows') ?? '10',
              status: searchParams.get('status') ?? 'ACTIVE',
            });
          }}
        />
      </div>
    </div>
  );
};
