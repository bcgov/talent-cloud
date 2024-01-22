import { ButtonTypes } from '@/common';
import {
  Search,
  type FieldInterface,
  Button,
  MenuSingleSelect,
  MenuMultiSelect,
} from '@/components';

import type { DashboardFilters } from '@/pages/dashboard/constants';

export const Filters = ({
  fields,
  handleChange,
  onClear,
  filterValues,
}: {
  fields: { [key: string]: FieldInterface };
  handleChange: (name: string, value: any) => void;
  onClear: () => void;
  filterValues: DashboardFilters;
}) => {
  return (
    <div
      className="shadow-sm rounded-sm mx-auto bg-grayBackground mb-16 mt-8 p-12 grid grid-cols-4 gap-16
    "
    >
      <div className="col-span-1">
        <Search field={fields.name} onChange={handleChange} />
      </div>

      <div className="col-span-3">
        <div className="grid grid-cols-4">
          <div className="col-span-1">
            <label>
              Region
              <MenuMultiSelect
                onChange={handleChange}
                field={fields.region}
                values={
                  filterValues[
                    fields?.region?.name as keyof DashboardFilters
                  ] as string[]
                }
              />
            </label>
          </div>
          <div className="col-span-3">
            <label>
              Work Location
              <MenuMultiSelect
                groupName={fields.region.name}
                groupValues={
                  filterValues[
                    fields?.region?.name as keyof DashboardFilters
                  ] as string[]
                }
                field={{
                  ...fields.location,
                  groupedOptions:
                    filterValues?.region && filterValues?.region?.length > 0
                      ? fields.location?.groupedOptions?.filter(
                          (itm) => filterValues?.region?.includes(itm.label),
                        )
                      : fields?.location?.groupedOptions,
                }}
                onChange={handleChange}
                values={
                  filterValues[
                    fields.location.name as keyof DashboardFilters
                  ] as string[]
                }
              />
            </label>
          </div>
        </div>
      </div>

      <div className="col-span-1">
        <label>
          Function
          <MenuSingleSelect
            field={fields.function}
            onChange={handleChange}
            value={
              filterValues[
                fields?.function?.name as keyof DashboardFilters
              ] as string
            }
          />
        </label>
      </div>
      <div className="col-span-3">
        <div className="flex flex-row no-wrap space-x-16 items-center text-center justify-end">
          <Button type={ButtonTypes.SECONDARY} text="Clear All" onClick={onClear} />
        </div>
      </div>
    </div>
  );
};
