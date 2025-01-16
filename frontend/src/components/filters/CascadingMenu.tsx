import { NestedMenu } from './NestedMenu';
import { MenuButton, Menu, MenuList, MenuHandler } from '../ui';
import { ExperienceName, FunctionName, Program } from '@/common';
import { classes } from './classes';
import type { BcwsRole, Section } from '@/common/enums/sections.enum';
import { BcwsRoleName, SectionName } from '@/common/enums/sections.enum';
import { Chip as MuiChip, Typography } from '@material-tailwind/react';
import { propTypesMenuProps } from '@material-tailwind/react/types/components/select';

export const CascadingMenu = ({
  value,
  label,
  field,
  nestedField,
  nestedValue,
  program,
  setSearchParams,
  searchParams,
}: {
  label: string;
  field: any;
  nestedField: any;
  value?: string;
  nestedValue?: string | BcwsRole;
  program?: Program;
  searchParams: URLSearchParams;
  setSearchParams: (searchParams: any) => any;
}) => {
  const displayValue = (value: string) => {
    if (value === FunctionName.EMERGENCY_SUPPORT_SERVICES) {
      return 'ESS';
    } else if (value === FunctionName.ADVANCED_PLANNING_UNIT) {
      return 'APU';
    } else {
      return value;
    }
  };

  const renderDisplay = (value: string) => {
    if (program === Program.BCWS) {
      return nestedValue
        ? `${SectionName[value as Section]}: ${BcwsRoleName[nestedValue as BcwsRole]}`
        : `${value}: All`;
    } else {
      return nestedValue
        ? `${displayValue(value)}: ${ExperienceName[nestedValue as keyof typeof ExperienceName]}`
        : `${value}: All`;
    }
  };

  const handleChange = (value: { name: string; value: string }[]) => {
    searchParams.set(value[0].name, value[0].value);
    searchParams.set(value[1].name, value[1].value);
    setSearchParams({ ...Object.fromEntries(searchParams) });
  };

  return (
    <>
      <span className="label">{label}</span>
      <Menu
        {...propTypesMenuProps}
        dismiss={{
          outsidePress: true,
          itemPress: false,
          isRequired: { outsidePress: true, itemPress: true },
        }}
      >
        <MenuHandler field={field} id={field.name}>
          {value ? (
            <MuiChip
              value={
                <Typography
                  variant="small"
                  className="font-bold text-info capitalize leading-none"
                >
                  {renderDisplay(value)}
                </Typography>
              }
              variant="ghost"
              className={classes.menu.chip}
              onClose={() => {
                searchParams.delete(field.name);
                searchParams.delete(nestedField.name);
                setSearchParams({ ...Object.fromEntries(searchParams) });
              }}
            />
          ) : (
            <p className={classes.menu.placeholder}>
              Select {label.toLowerCase()}(s)
            </p>
          )}
          <MenuButton />
        </MenuHandler>
        <MenuList>
          <div className="w-full">
            {field.options?.map(
              (option: { label: string; value: string }, index: number) => (
                <NestedMenu
                  field={field}
                  handleChange={handleChange}
                  nestedField={{
                    ...nestedField,
                    options:
                      program === Program.BCWS
                        ? nestedField.options[index]
                        : nestedField.options,
                  }}
                  option={option}
                  key={option.value + index.toString()}
                />
              ),
            )}
          </div>
        </MenuList>
      </Menu>
    </>
  );
};
