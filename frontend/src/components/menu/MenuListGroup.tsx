import { MenuItem as MuiMenuItem, Checkbox } from '@material-tailwind/react';
import type { FieldGroupedOption } from '../table';
import { classes } from './constants';

export const MenuItemGroupList = ({
  field,
  values,
  onChange,
  onChangeGroup,
  groupName,
}: {
  field: any;
  values: any[];
  onChange: (name: string, value: any) => void;
  onChangeGroup: (name: string, options: string[]) => void;
  groupName: string;
}) => {
  return (
    <div className="p-4 w-[1000px]">
      <label>{`Select ${field.name}s:`}</label>
      <div className="grid grid-cols-4 gap-y-8 gap-x-4 pt-8">
        {field?.groupedOptions?.map((group: FieldGroupedOption) => (
          <div key={group.label} className="col-span-1">
            <MuiMenuItem placeholder={undefined} className={classes.menuItem}>
              <label className={classes.groupLabel}>
                <Checkbox
                  type="checkbox"
                  onChange={() => onChangeGroup(field.name, group.options)}
                  crossOrigin={undefined}
                  name={groupName}
                  checked={group?.options?.some(
                    (option: any) => values?.find((itm) => itm === option),
                  )}
                />
                {group.label} (
                {`${
                  values?.filter(
                    (itm) => group?.options?.find((option) => option === itm),
                  ).length ?? 0
                }`}
                )
              </label>
            </MuiMenuItem>

            {group?.options.map((option: any) => (
              <MuiMenuItem
                key={option}
                placeholder={undefined}
                className={classes.menuItem}
              >
                <label className={classes.optionLabel} htmlFor={option}>
                  <Checkbox
                    type="checkbox"
                    onChange={() => onChange(field.name, option)}
                    crossOrigin={undefined}
                    checked={values?.includes(option)}
                  />
                  {option}
                </label>
              </MuiMenuItem>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
