// ui
import { DatePicker } from '@/components';
import { SingleSelect } from '@/components/ui/SingleSelect';
import { Filters, Program } from '@/common';

// hooks
import { useProgramFieldData } from '@/hooks/useProgramFieldData';

// util
import { format, parse } from 'date-fns';

export const AvailabilityFilter = ({
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
  );
};
