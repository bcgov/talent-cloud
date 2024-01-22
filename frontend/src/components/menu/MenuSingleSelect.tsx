import { Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react';
import { MenuButton } from './MenuButton';
import { classes } from './constants';
import { Chip } from './MenuChip';

export const MenuSingleSelect = ({
  field,
  value,
  onChange,
}: {
  field: any;
  value: string;
  onChange: (name: string, value: any) => void;
}) => {
  return (
    <Menu dismiss={{ itemPress: true }}>
      <MenuHandler className={classes.menu}>
        <div className={classes.menuHandler}>
          <div className={classes.chips}>
            {value ? (
              <Chip value={value} onChange={() => onChange(field.name, null)} />
            ) : (
              <span>Select {field.name}...</span>
            )}
          </div>
          <div className="flex flex-row items-center justify-end">
            <MenuButton />
          </div>
        </div>
      </MenuHandler>
      <MenuList className={'py-4'} placeholder={undefined}>
        {field.options?.map((option: any) => (
          <MenuItem
            key={option}
            placeholder={undefined}
            className={'px-4'}
            onClick={() => onChange(field.name, option)}
          >
            <label className={classes.optionLabel} htmlFor={option}>
              <input
                name={option}
                hidden
                onChange={() => onChange(field.name, option)}
              />
              {option}
            </label>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
