import {
  Chip,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from '@material-tailwind/react';
import { MenuButton } from './MenuButton';
import { classes } from './constants';
import { type ChangeEvent } from 'react';

export const MenuSingleSelect = ({
  field,
  value,
  label,
  onChange,
}: {
  field: any;
  value: string;
  label: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  const handleChange = (option: string) => {
    const event = {
      target: { name: field.name, value: option },
    } as unknown as ChangeEvent<HTMLInputElement>;
    onChange(event);
  };
  return (
    <div className="grid grid-cols-1">
      <label>{label}</label>
      <Menu dismiss={{ itemPress: true }}>
        <MenuHandler>
          <div className={classes.menu.container}>
            <div className={classes.menu.chipsContainer}>
              {value ? (
                <Chip
                  value={value}
                  color="blue-gray"
                  variant="ghost"
                  className={classes.menu.chip}
                  onClose={() => handleChange('')}
                />
              ) : (
                <span className={classes.menu.placeholder}>Select {label}(s)</span>
              )}
            </div>
            <div className="flex flex-row items-center justify-end">
              <MenuButton />
            </div>
          </div>
        </MenuHandler>
        <MenuList
          className="w-96 md:w-[700px] lg:w-72 xl:w-96"
          placeholder={undefined}
        >
          {field.options?.map((option: any) => (
            <MenuItem
              key={option}
              placeholder={undefined}
              onClick={() => handleChange(option)}
            >
              <label className={classes.menu.optionLabel} htmlFor={option}>
                {/* <input name={field.name} className='hidden' value={selected} onChange={onChange} /> */}
                {option}
              </label>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </div>
  );
};
