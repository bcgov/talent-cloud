import type { ChangeEvent } from 'react';
import type { FieldGroupedOption } from '@/components';
import {
  MenuItem,
  Checkbox,
  Menu,
  MenuButton,
  MenuChips,
  MenuHandler,
  MenuList,
} from '@/components';
import { classes } from './classes';

export const MultiSelectGroup = ({
  field,
  values,
  onChange,
  label,
  handleClose,
  handleCloseMany,
}: {
  field: any;
  values: any;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  handleClose: (name: string, value: string) => void;
  handleCloseMany: (name: string) => void;
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
    <>
      <label>{label}</label>
      <Menu dismiss={{ outsidePress: true, itemPress: false }}>
        <MenuHandler field={field}>
          <MenuChips
            values={values}
            label={label.toLowerCase()}
            handleClose={handleClose}
            handleCloseMany={handleCloseMany}
            name={field.name}
          />
          <MenuButton />
        </MenuHandler>
        <MenuList className={field.name}>
          <div className="flex flex-col p-4">
            <span className="label pl-4 pb-4">{`Select ${label.toLowerCase()}(s):`}</span>
            <div className="grid grid-cols-4 gap-y-4 gap-x-2">
              {field?.groupedOptions?.map((group: FieldGroupedOption) => (
                <div key={group.label} className="col-span-1">
                  <MenuItem>
                    <label className={classes.menu.listLabel}>
                      <Checkbox
                        onChange={onChangeGroup}
                        name={field.name}
                        value={group.options}
                        multiple
                        checked={group?.options?.some((option: any) =>
                          values?.find((itm: any) => itm === option),
                        )}
                      />
                      {group.label}
                      {values?.filter((itm: string) =>
                        group?.options?.find((option) => option === itm),
                      ).length > 0
                        ? ` (${
                            values?.filter((itm: string) =>
                              group?.options?.find((option) => option === itm),
                            ).length
                          })`
                        : ''}
                    </label>
                  </MenuItem>
                  {group.options?.map((option: any) => (
                    <MenuItem key={option}>
                      <label className={classes.menu.listItem} htmlFor={option}>
                        <Checkbox
                          onChange={onChange}
                          checked={values?.includes(option)}
                          name={field.name}
                          value={option}
                        />
                        {option}
                      </label>
                    </MenuItem>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </MenuList>
      </Menu>
    </>
  );
};
