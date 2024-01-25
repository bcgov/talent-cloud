import { Menu, MenuHandler, MenuList, Chip } from '@material-tailwind/react';
import type { ChangeEvent } from 'react';
import { classes } from './constants';
import { MenuButton } from './MenuButton';
import { NestedMenu } from './NestedMenu';
import { ExperienceName } from '@/common';

export const CascadingMenu = ({
  value,

  onChange,
  label,
  field,
  nestedField,
  nestedValue,
}: {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => any;
  label: string;
  field: any;
  nestedField: any;
  nestedValue: string;
}) => {
  const handleChange = (name: string, value: string) => {
    const event = {
      target: { name: name, value: value },
    } as unknown as ChangeEvent<HTMLInputElement>;
    onChange(event);
  };

  return (
    <Menu dismiss={{ itemPress: false }}>
      <MenuHandler>
        <div className={classes.menu.container}>
          <div className={classes.menu.chipsContainer}>
            {value ? (
              <Chip
                value={
                  nestedValue
                    ? `${value}:${ExperienceName[nestedValue as keyof typeof ExperienceName]}`
                    : value
                }
                color="blue-gray"
                variant="ghost"
                className={classes.menu.chip}
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
        placeholder={undefined}
        className="w-96 md:w-[700px] lg:w-72 xl:w-96"
      >
        {field.options?.map((option: any) => (
          <NestedMenu
            field={field}
            handleChange={handleChange}
            nestedField={nestedField}
            option={option}
            key={option}
          />
        ))}
      </MenuList>
    </Menu>
  );
};
