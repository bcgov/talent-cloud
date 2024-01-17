import { ButtonTypes } from '@/common';
import type { FieldInterface } from '@/components';
import {
  SingleSelect,
  MultiSelectGroup,
  Button,
  FieldTypes,
  MultiSelect,
  Search,
} from '@/components';
import type { DashboardFilters } from '@/pages/dashboard/constants';

export const TableFilters = ({
  fields,
  handleChange,
  onSubmit,
  onClear,
  filterValues,
}: {
  fields: FieldInterface[];
  handleChange: ({ name, value }: { name: string; value: any | any[] }) => void;
  onSubmit: () => void;
  onClear: () => void;
  filterValues: DashboardFilters;
}) => {
  const renderField = (field: FieldInterface) => {
    if (field.type === FieldTypes.MULTI) {
      return (
        <MultiSelectGroup
          field={field}
          onChange={handleChange}
          values={
            (filterValues[field.name as keyof DashboardFilters] as string[]) ?? []
          }
        />
      );
    } else if (field.type === FieldTypes.SEARCH) {
      return <Search field={field} onChange={handleChange} />;
    } else if (field.type === FieldTypes.SELECT) {
      return field.multi ? (
        <MultiSelect
          field={field}
          values={
            (filterValues[field.name as keyof DashboardFilters] as string[]) ?? []
          }
          onChange={handleChange}
        />
      ) : (
        <SingleSelect
          field={field}
          onChange={handleChange}
          value={
            (filterValues[field.name as keyof DashboardFilters] as string) ?? ''
          }
        />
      );
    } else return;
  };

  return (
    <div
      className="shadow-sm rounded-sm mx-auto bg-grayBackground mb-16 mt-8 p-12 grid grid-cols-3 gap-16
    "
    >
      {fields.map((field: FieldInterface) => (
        <div className="flex flex-col" key={field.name.toString()}>
          <label htmlFor={field.name.toString()} className="flex">
            {field.label}
          </label>
          {renderField(field)}
        </div>
      ))}

      <div className="flex flex-row no-wrap space-x-16 items-center text-center justify-end">
        <Button type={ButtonTypes.SECONDARY} text="Clear All" onClick={onClear} />
        <Button type={ButtonTypes.PRIMARY} text="Submit" onClick={onSubmit} />
      </div>
    </div>
  );
};
