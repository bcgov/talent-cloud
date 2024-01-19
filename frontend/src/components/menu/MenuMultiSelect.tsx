import { Menu, MenuHandler, MenuList } from '@material-tailwind/react';
import { classes } from './constants';
import { MenuItemGroupList } from './MenuListGroup';
import { MenuItemList } from './MenuList';
import { MenuButton } from './MenuButton';
import { renderChips } from './utils';

export const MenuMultiSelect = ({
  field,
  values,
  onChange,
  groupValues,
  groupName,
}: {
  field: any;
  values: any;
  onChange: (name: string, value: any) => void;
  groupValues?: any[];
  groupName?: string;
}) => {
  const handleChange = (name: string, option: string) => {
    const selectedOptionSet = new Set(values);
    if (values?.includes(option)) {
      selectedOptionSet.delete(option);
    } else {
      selectedOptionSet.add(option);
    }

    const newSelectedOptions = Array.from(selectedOptionSet);

    onChange(name, newSelectedOptions);
  };

  const handleSelectGroup = (name: string, options: string[]) => {
    const selectedOptionSet = new Set(values);

    if (options.every((option: any) => values?.find((itm: any) => itm === option))) {
      options.forEach((option) => {
        selectedOptionSet.delete(option);
      });
    } else {
      options.forEach((option) => {
        selectedOptionSet.add(option);
      });
    }
    const newSelectedOptions = Array.from(selectedOptionSet);
    onChange(name, newSelectedOptions);
  };

  const handleClearAll = () => {
    onChange(field.name, []);
  };

  return (
    <Menu dismiss={{ itemPress: false }}>
      <MenuHandler className={classes.menu}>
        <div className={classes.menuHandler}>
          <div className={classes.chips}>
            {renderChips(field, values, handleChange, handleClearAll)}
          </div>
          <div className="flex flex-row items-center justify-end">
            <MenuButton />
          </div>
        </div>
      </MenuHandler>
      <MenuList placeholder={undefined}>
        {field.groupedOptions ? (
          <MenuItemGroupList
            field={field}
            values={values}
            onChange={handleChange}
            onChangeGroup={handleSelectGroup}
            groupValues={groupValues!}
            groupName={groupName!}
          />
        ) : (
          <MenuItemList field={field} values={values} onChange={handleChange} />
        )}
      </MenuList>
    </Menu>
  );
};
