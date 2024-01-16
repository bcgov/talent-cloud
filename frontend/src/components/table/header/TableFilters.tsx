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
import useTable from '@/hooks/useTable';
import type { DashboardFilters } from '@/pages/dashboard/constants';


export const TableFilters = ({ fields }: { fields: FieldInterface[] }) => {
  const {
    handleMultiSelectChange,
    handleFilterChange,
    handleGroupedMultiSelectChange,
    onSubmit,
    onClear,
    filterValues,
  } = useTable();

  const renderField = (field: FieldInterface) => {
    if (field.type === FieldTypes.MULTI) {
      return (
        <MultiSelectGroup
          field={field}
          onChange={handleGroupedMultiSelectChange}
          values={
            (filterValues[field.name as keyof DashboardFilters] as string[]) ?? []
          }
        />
      );
    } else if (field.type === FieldTypes.SEARCH) {
      return <Search field={field} onChange={handleFilterChange} />;
    } else if (field.type === FieldTypes.SELECT) {
      return field.multi ? (
        <MultiSelect
          field={field}
          values={
            (filterValues[field.name as keyof DashboardFilters] as string[]) ?? []
          }
          onChange={handleMultiSelectChange}
        />
      ) : (
        <SingleSelect
          field={field}
          onChange={handleFilterChange}
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
