import type { FieldGroupedOption, FieldInterface } from '@/components';
import { Checkbox, Menu, MenuButton, MenuHandler, MenuList } from '@/components';
import { classes } from './classes';
import { FireCentreName } from '@/common/enums/firecentre.enum';
import { Filters, type Program } from '@/common';
import { MenuItem, Typography, Chip as MuiChip } from '@material-tailwind/react';
import { propTypesMenuProps } from '@material-tailwind/react/types/components/select';

export const MultiSelectGroup = ({
  searchParams,
  setSearchParams,
  field,

  label,
  groupedField,
}: {
  field: FieldInterface;
  searchParams: URLSearchParams;
  setSearchParams: (searchParams: any) => any;
  label: string;
  program?: Program;
  groupedField: FieldInterface;
}) => {
  const values = searchParams.get(field.name)?.split(',') ?? [];

  const groupValues = searchParams.get(groupedField.name)?.split(',') ?? [];

  const handleChangeGroup = (group: FieldGroupedOption) => {
    // If the group value is not selected, then select it and the options
    if (!groupValues.includes(group.value)) {
      searchParams.set(groupedField.name, [group.value, ...groupValues].join(','));
      searchParams.set(
        field.name,
        Array.from(new Set([...values, ...group.options])).join(','),
      );
    }
    // if this value is already selected...
    else if (groupValues.includes(group.value)) {
      // find the currently selected values from group options...
      const selectedGroupValues = values.filter((itm) =>
        group.options?.includes(itm),
      );

      // ...if all the values in the group are selected, then remove the group value and all the options
      if (selectedGroupValues.length === group.options.length) {
        //  ...and if there is only one value or one group value, then delete the params
        if (values.length === 1 || groupValues.length === 1) {
          searchParams.delete(field.name);
          searchParams.delete(Filters.INCLUDE_TRAVEL);
          searchParams.delete(groupedField.name);
        }
        // ...otherwise, remove the group value and the selected options
        else {
          searchParams.set(
            groupedField.name,
            groupValues.filter((itm) => itm !== group.value).join(','),
          );
          searchParams.set(
            field.name,
            values.filter((itm) => !group.options.includes(itm)).join(','),
          );
        }
      }
      // ...or if only some values are selected, then select the remaining unselected values
      else if (values.some((option: any) => group.options.includes(option))) {
        searchParams.set(
          field.name,
          Array.from(new Set([...values, ...group.options])).join(','),
        );
      }
    }
    setSearchParams({ ...Object.fromEntries(searchParams) });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // if the selected value is not already selected, then select it
    if (!values.includes(e.target.value)) {
      // include the value in the list of selected values
      searchParams.set(
        field.name,
        Array.from(new Set([...values, e.target.value])).join(','),
      );
      // find the grouped value of the selected value
      const groupedValue = field.groupedOptions?.find((itm) =>
        itm.options.includes(e.target.value),
      )?.value;

      // if the group value exists, and it is not already selected, then select it
      if (groupedValue && !groupValues.includes(groupedValue)) {
        searchParams.set(
          groupedField.name,
          [groupedValue, ...groupValues].join(','),
        );
      }
    }
    // if the selected value is already selected...
    else {
      //...and it is the only value selected, then delete the params
      if (values.length === 1) {
        searchParams.delete(field.name);
        searchParams.delete(Filters.INCLUDE_TRAVEL);
        searchParams.delete(groupedField.name);
      }
      // ...otherwise, remove the selected value, and possibly the group value
      else {
        searchParams.set(
          field.name,
          values.filter((itm) => itm !== e.target.value).join(','),
        );

        // find the value of the group
        const groupedValue = field.groupedOptions?.find((itm) =>
          itm.options.includes(e.target.value),
        )?.value;

        // find all of the possible group options
        const groupedOptions = field.groupedOptions?.find(
          (itm) => itm.value === groupedValue,
        )?.options;
        // find which values from the group options are currently selected
        const selectedGroupOptions = values.filter((itm) =>
          groupedOptions?.includes(itm),
        );
        // if this is the only value selected in the group, then remove the group value
        if (selectedGroupOptions.length === 1) {
          searchParams.set(
            groupedField.name,
            groupValues.filter((itm) => itm !== groupedValue).join(','),
          );
        }
      }
    }
    setSearchParams({ ...Object.fromEntries(searchParams) });
  };

  const handleCloseMaxChips = () => {
    searchParams.delete(field.name);
    searchParams.delete(Filters.INCLUDE_TRAVEL);
    searchParams.delete(groupedField.name);
    setSearchParams({ ...Object.fromEntries(searchParams) });
  };

  const handleCloseChip = (value: string) => {
    if (values.length === 1) {
      handleCloseMaxChips();
    } else {
      searchParams.set(field.name, values.filter((itm) => itm !== value).join(','));
      setSearchParams({ ...Object.fromEntries(searchParams) });
    }
  };

  return (
    <>
      <span className="label">{label}</span>
      <Menu
        {...propTypesMenuProps}
        dismiss={{
          outsidePress: true,
          itemPress: false,
          isRequired: { outsidePress: true, itemPress: false },
        }}
      >
        <MenuHandler field={field} id={field.name}>
          {values?.length ? (
            <div className={classes.menu.chipsContainer}>
              {values.length > 3 ? (
                <MuiChip
                  value={
                    <Typography
                      placeholder={undefined}
                      variant="small"
                      className="font-bold text-info capitalize leading-none"
                    >
                      {values.length} Selected
                    </Typography>
                  }
                  variant="ghost"
                  className={classes.menu.chip}
                  onClose={handleCloseMaxChips}
                />
              ) : (
                values?.map((itm) => (
                  <MuiChip
                    key={itm}
                    value={
                      <Typography
                        placeholder={undefined}
                        variant="small"
                        className="font-bold text-info capitalize leading-none"
                      >
                        {itm}
                      </Typography>
                    }
                    variant="ghost"
                    className={classes.menu.chip}
                    onClose={() => handleCloseChip(itm)}
                  />
                ))
              )}
            </div>
          ) : (
            <span className={classes.menu.placeholder}>{field.placeholder}</span>
          )}
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
                      <span className={classes.menu.listLabel}>
                        <Checkbox
                          id={group.value}
                          onChange={() => handleChangeGroup(group)}
                          name={group.label}
                          value={group.options}
                          multiple
                          checked={
                            group?.options?.some((option: any) =>
                              values?.find((itm: any) => itm === option),
                            ) || groupValues.includes(group.label)
                          }
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
                      </span>
                    </MenuItem>
                  </div>
                  <div className="col-span-1">
                    {group.options.slice(0, 20).map((option: any) => (
                      <MenuItem key={option}>
                        <label
                          className={classes.menu.listItem}
                          htmlFor={option.name}
                        >
                          <Checkbox
                            id={option.name}
                            onChange={handleChange}
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
                          <span className={classes.menu.listItem}>
                            <Checkbox
                              id={option.value + ' location list'}
                              onChange={handleChange}
                              checked={values?.includes(option)}
                              name={field.name}
                              value={option}
                            />
                            {option}
                          </span>
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
