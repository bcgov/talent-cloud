import { MenuItem, Checkbox } from '@material-tailwind/react';
import type { FieldGroupedOption } from '../table';
import { classes } from './constants';
import type { ChangeEvent } from 'react';
import { MenuItemList } from './MenuList';

export const MenuItemGroupList = ({
  field,
  values,
  onChange,
}: {
  field: any;
  values: any[];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  const onChangeGroup = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.split(',');

    const valueSet = value.filter((itm) => !values.includes(itm));

    const event = {
      target: {
        name: field.name,
        value: valueSet.length > 0 ? valueSet : value,
      },
    } as unknown as ChangeEvent<HTMLInputElement>;

    onChange(event);
  };

  return (
    <div className="flex flex-col">
      <label className="pt-8 pl-6">{`Select ${field.name}(s):`}</label>
      <div className="grid grid-cols-4 gap-y-4 gap-x-4 pt-8">
        {field?.groupedOptions?.map((group: FieldGroupedOption) => (
          <div key={group.label} className="col-span-1">
            <MenuItem placeholder={undefined} className={classes.menu.menuItem}>
              <label className={classes.menu.groupLabel} htmlFor={group.label}>
                <Checkbox
                  type="checkbox"
                  onChange={onChangeGroup}
                  crossOrigin={undefined}
                  name={field.name}
                  value={group.options}
                  multiple
                  // name={groupName}
                  checked={group?.options?.some((option: any) =>
                    values?.find((itm) => itm === option),
                  )}
                />
                <h6>
                  {group.label} (
                  {`${
                    values?.filter((itm) =>
                      group?.options?.find((option) => option === itm),
                    ).length ?? 0
                  }`}
                  )
                </h6>
              </label>
            </MenuItem>
            <MenuItemList
              field={{ ...field, options: group.options }}
              values={values}
              onChange={onChange}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
