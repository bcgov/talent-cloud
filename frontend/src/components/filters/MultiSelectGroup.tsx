import type { FieldGroupedOption, FieldInterface } from '@/components';
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
import { FireCentreName } from '@/common/enums/firecentre.enum';

export const MultiSelectGroup = ({
  field,
  values,
  groupValues,
  groupField, 
  onChange,
  label,
  handleClose,
  handleCloseMany,
}: {
  field: FieldInterface;
  values: string[];
  groupValues: string[];
  groupField: FieldInterface;
  onChange: (name: string, values: string) => void;
  label: string;
  handleClose: (name: string, value: string) => void;
  handleCloseMany: (name: string) => void;
}) => {
  const onChangeGroup = (options: string[]) => {
    const valueSet = options.filter((itm) => !values.includes(itm));

    if (valueSet.length === 0) {
      values.forEach((itm: string) => handleClose(field.name, itm));
    } else {
      const finalValues = valueSet.length > 0 ? valueSet : options;
      finalValues.forEach((itm) => onChange(field.name, itm));
    }
  };

  const onChangeOne = (option: string, group: string) => {
    values?.includes(option)
      ? handleClose(field.name, option)
      : onChange(field.name, option);
  
      !groupValues?.includes(group) && onChange(groupField.name, group)
    
  }

  return (
    <>
      <span className="label">{label}</span>
      <Menu dismiss={{ outsidePress: true, itemPress: false }}>
        <MenuHandler field={field} id={field.name}>
          <MenuChips
            chips={values.map((itm: string) => ({ label: itm, value: itm }))}
            placeholder={field.placeholder ?? ""}
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
                  className={`${group.label === FireCentreName.COASTAL ? 'col-span-2 grid grid-cols-2' : 'col-span-1'}`}
                >
                  <div className="col-span-2">
                    <MenuItem>
                      <label className={classes.menu.listLabel}>
                        <Checkbox
                          id={group.label}
                          onChange={() => onChangeGroup(group.options)}
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
                  </div>
                  <div className="col-span-1">
                    {group.options.slice(0, 20).map((option: any) => (
                      <MenuItem key={option}>
                        <label className={classes.menu.listItem} htmlFor={option}>
                          <Checkbox
                            id={option.name}
                            onChange={() => onChangeOne(option, group.value)}
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
                              onChange={() => onChangeOne(option, group.value)}
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
