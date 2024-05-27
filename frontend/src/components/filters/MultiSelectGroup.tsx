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
import { FireCentre, FireCentreName } from '@/common/enums/firecentre.enum';
import { Route } from '@/providers';

export const MultiSelectGroup = ({
  field,
  values,
  onChange,
  label,
  handleClose,
  handleCloseMany,
  route,
}: {
  field: any;
  values: any;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  handleClose: (name: string, value: string) => void;
  handleCloseMany: (name: string) => void;
  route?: Route;
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
      <span className="label">{label}</span>
      <Menu dismiss={{ outsidePress: true, itemPress: false }}>
        <MenuHandler field={field} id={field.name}>
          <MenuChips
            chips={values.map((itm: string) => ({ label: itm, value: itm }))}
            placeholder={field.placeholder}
            handleClose={handleClose}
            handleCloseMany={handleCloseMany}
            name={field.name}
            maxChips={3}
          />
          <MenuButton />
        </MenuHandler>
        <MenuList className={field.name}>
          <div className="flex flex-col p-4">
            <span className="label pl-4 pb-4">{`Select ${label.toLowerCase()}(s):`}</span>
            <div className="grid grid-cols-4 gap-y-4 gap-x-2">
              {field?.groupedOptions?.map((group: FieldGroupedOption) => (
                <div
                  key={group.label}
                  className={`${group.label === FireCentre.COASTAL ? 'col-span-2 grid grid-cols-2' : 'col-span-1'}`}
                >
                  <div className="col-span-2">
                    <MenuItem>
                      <label className={classes.menu.listLabel}>
                        <Checkbox
                          id={group.label}
                          onChange={onChangeGroup}
                          name={field.name}
                          value={group.options}
                          multiple
                          checked={group?.options?.some((option: any) =>
                            values?.find((itm: any) => itm === option),
                          )}
                        />
                        {route === Route.BCWS
                          ? FireCentreName[group.label as FireCentre]
                          : group.label}
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
                  </div>
                  <div className="col-span-1">
                    {group.options.slice(0, 20).map((option: any) => (
                      <MenuItem key={option}>
                        <label className={classes.menu.listItem} htmlFor={option}>
                          <Checkbox
                            id={option.name}
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
                  <div className="col-span-1">
                    {group.options
                      .slice(20, group.options.length)
                      .map((option: any) => (
                        <MenuItem key={option}>
                          <label className={classes.menu.listItem} htmlFor={option}>
                            <Checkbox
                              id={option.name}
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
                </div>
              ))}
            </div>
          </div>
        </MenuList>
      </Menu>
    </>
  );
};
