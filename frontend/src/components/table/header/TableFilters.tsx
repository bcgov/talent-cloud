import { ButtonTypes } from '@/common';
import type { FieldInterface, GroupedSelectField, SelectField } from '@/components';
import { SingleSelect, MultiSelectGroup, Button, FieldTypes, MultiSelect, Search } from '@/components';


import useTable from '@/hooks/useTable';
import { DashboardFilters } from '@/pages/dashboard/constants';
import { formClass } from '@/styles/fieldStyles';
import {  SingleValue, components } from 'react-select';


export const Option = ({ children, ...props }: any) => {
  return (
    <components.Option {...props}>
      {props.isMulti && (
        <input
          type={'checkbox'}
          checked={props.isSelected}
          onChange={props.onChange}
          className={formClass.checkbox}
        />
      )}
      {children}
    </components.Option>
  );
};
export const TableFilters = ({ fields }: { fields: FieldInterface[] }) => {
  const { handleMultiSelectChange, handleFilterChange, onSubmit, dashboardFilters } =
    useTable();

  const renderField = (field: FieldInterface) => {
    if (field.type === FieldTypes.MULTI) {
      return (
        <MultiSelectGroup
          field={field as GroupedSelectField}
          onChange={handleMultiSelectChange}
          filters={dashboardFilters}
        />
      );
    } else if (field.type === FieldTypes.SEARCH) {
      return <Search field={field} onChange={handleFilterChange} />;
    } else if (field.type === FieldTypes.SELECT) {
      return (field as SelectField).multi ? (
        <MultiSelect
          options={(field as SelectField).options}
          handleChange={handleMultiSelectChange}
          value={dashboardFilters[field.name as keyof DashboardFilters]}
          defaultValue={[]}
          multipleSelect={true}
          componentProps={{Option}}
        />
      ) : (
        <SingleSelect field={field as SelectField} onChange={(newValue: SingleValue<any>)=> handleFilterChange(
          { name: field.name, value: newValue?.value ?? '' })
        } value={dashboardFilters[field.name as keyof DashboardFilters]}  />
      );
    } else return;
  };

  return (
    <div
      className="shadow-sm rounded-sm mx-auto bg-grayBackground mb-16 mt-8 p-12 grid grid-cols-3 gap-16
    "
    >
      {fields.map((field) => (
        <div className="flex flex-col" key={field.name.toString()}>
          <label htmlFor={field.name.toString()} className="flex">
            {field.label}
          </label>
          {renderField(field)}
        </div>
      ))}

      <div className="flex flex-row no-wrap space-x-8 items-center text-center">
        <Button
          type={ButtonTypes.SECONDARY}
          text="Clear All"
          onClick={() => console.log('clear')}
        />
        <Button type={ButtonTypes.PRIMARY} text="Submit" onClick={onSubmit} />
      </div>
    </div>
  );
};
