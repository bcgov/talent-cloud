import { ButtonTypes } from '@/common';
import { Button, MenuMultiSelect, MenuSingleSelect, Search } from '@/components';
import type { DashboardFields } from '@/pages/dashboard/constants';
import { type DashboardFilters } from '@/pages/dashboard/constants';
import type { ChangeEvent } from 'react';

export const Filters = ({
  fields,
  onChange,
  handleClose,
  handleCloseMultiple,
  onClear,
  filterValues,
}: {
  fields: DashboardFields;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleClose: (name: string, value: string) => void;
  handleCloseMultiple: (name: string) => void;
  onClear: () => void;
  filterValues: DashboardFilters;
}) => {
  return (
    <div
      className="shadow-sm rounded-sm mx-auto bg-grayBackground mb-16 mt-8 p-12 grid grid-cols-4 gap-16
    "
    >
      <div className="col-span-1">
        <Search field={fields.name} onChange={onChange} />
      </div>

      <div className="col-span-1 mt-12 lg:mt-0 lg:col-span-4">
        <div className="grid grid-cols-1 gap-12 md:gap-0 md:grid-cols-4">
          <div className="col-span-1">
            <MenuMultiSelect
              field={fields.region}
              values={filterValues.region}
              label="Region"
              onChange={onChange}
              handleClose={handleClose}
              handleCloseMultiple={handleCloseMultiple}
            />
          </div>
          <div className="col-span-3">
            <MenuMultiSelect
              onChange={onChange}
              field={{
                ...fields.location,
                groupedOptions:
                  filterValues?.region && filterValues?.region?.length > 0
                    ? fields.location?.groupedOptions?.filter((itm) =>
                        filterValues?.region?.includes(itm.label),
                      )
                    : fields?.location?.groupedOptions,
              }}
              handleClose={handleClose}
              handleCloseMultiple={handleCloseMultiple}
              label="Work Location"
              values={filterValues.location}
            />
          </div>
        </div>
      </div>

      <div className="col-span-1">
        <MenuSingleSelect
          field={fields.function}
          label="Function"
          onChange={onChange}
          handleClose={handleClose}
          value={filterValues.function}
        />
      </div>
      <div className="col-span-1 lg:col-span-4">
        <div className="flex flex-col no-wrap items-end text-center h-full lg:mt-12">
          <Button type={ButtonTypes.SECONDARY} text="Clear All" onClick={onClear} />
        </div>
      </div>
    </div>
  );
};
