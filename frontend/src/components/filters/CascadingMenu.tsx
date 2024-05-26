import { NestedMenu } from './NestedMenu';
import { MenuButton, Chip, Menu, MenuList, MenuHandler } from '../ui';
import { ExperienceName, FunctionName } from '@/common';
import { classes } from './classes';
import type { BcwsRole, Section } from '@/common/enums/sections.enum';
import { BcwsRoleName, SectionName } from '@/common/enums/sections.enum';
import { DashboardFilterNames } from '@/pages/dashboard';

export const CascadingMenu = ({
  value,
  onChange,
  handleClose,
  label,
  field,
  nestedField,
  nestedValue,
}: {
  onChange: (
    value: { name: string; value: string },
    nestedValue: { name: string; value: string },
  ) => any;
  handleClose: (name: string, nestedName: string) => any;
  label: string;
  field: any;
  nestedField: any;
  value?: string;
  nestedValue?: string | BcwsRole;
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
    if (field.name === DashboardFilterNames.SECTION) {
      return nestedValue
        ? `${SectionName[value as Section]}: ${BcwsRoleName[nestedValue as BcwsRole]}`
        : `${value}: All`;
    } else {
      return nestedValue
        ? `${displayValue(value)}: ${ExperienceName[nestedValue as keyof typeof ExperienceName]}`
        : `${value}: All`;
    }
  };

  return (
    <>
      <span className="label">{label}</span>
      <Menu dismiss={{ itemPress: false, outsidePress: true }}>
        <MenuHandler field={field} id={field.name}>
          {value ? (
            <Chip
              handleClose={() => handleClose(field.name, nestedField.name)}
              name={field.name}
              value={value}
              label={renderDisplay(value)}
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
            {field.options?.map((option: any) => (
              <NestedMenu
                field={field}
                handleChange={(nestedName, nestedValue) =>
                  onChange(
                    { name: field.name, value: option },
                    { name: nestedName, value: nestedValue },
                  )
                }
                nestedField={nestedField}
                option={option}
                key={option}
              />
            ))}
          </div>
        </MenuList>
      </Menu>
    </>
  );
};
