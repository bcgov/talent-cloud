import { classes } from './classes';
import { Checkbox } from '../ui/Checkbox';
import { Menu, MenuButton, MenuHandler, MenuList } from '../ui';
import type { FieldInterface, Option } from '../table';
import { Filters, FireCentreName, Program, RegionName } from '@/common';
import { Chip as MuiChip, Typography, MenuItem } from '@material-tailwind/react';
import { propTypesMenuProps } from '@material-tailwind/react/types/components/select';

export const MultiSelect = ({
  field,
  setSearchParams,
  searchParams,
  label,
  maxChips,
  groupedField,
  program,
}: {
  field: FieldInterface;
  searchParams: URLSearchParams;
  setSearchParams: (searchParams: any) => any;
  label: string;
  program?: Program;
  maxChips: number;
  groupedField: FieldInterface;
}) => {
  const values = searchParams.get(field.name)?.split(',') ?? [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (values.includes(e.target.value)) {
      if (values.length === 1) {
        searchParams.delete(field.name);
        searchParams.delete(groupedField.name);
      } else {
        searchParams.set(
          field.name,
          values.filter((itm) => itm !== e.target.value).join(','),
        );
        const groupedValues = searchParams.get(groupedField.name)?.split(',') ?? [];
        const groupedFieldOptions = groupedField.groupedOptions?.find(
          (itm) => itm.value === e.target.value,
        )?.options;
        const groupValuesSet = new Set(groupedValues);

        groupedFieldOptions?.forEach((itm) => groupValuesSet.delete(itm));
        searchParams.set(groupedField.name, Array.from(groupValuesSet).join(','));
      }
    } else {
      searchParams.set(
        field.name,
        Array.from(new Set([...values, e.target.value])).join(','),
      );

      const groupedValues = searchParams.get(groupedField.name)?.split(',') ?? [];
      const groupedFieldValues = groupedField.groupedOptions?.find(
        (itm) => itm.value === e.target.value,
      )?.options;

      groupedFieldValues &&
        searchParams.set(
          groupedField.name,
          [...groupedValues, ...groupedFieldValues].join(','),
        );
    }
    setSearchParams({ ...Object.fromEntries(searchParams) });
  };

  const handleCloseMaxChips = () => {
    searchParams.delete(field.name);
    searchParams.delete(groupedField.name);
    searchParams.delete(Filters.INCLUDE_TRAVEL);
    setSearchParams({ ...Object.fromEntries(searchParams) });
  };

  const handleCloseChip = (value: string) => {
    if (values.length === 1) {
      searchParams.delete(Filters.INCLUDE_TRAVEL);
      searchParams.delete(field.name);
      searchParams.delete(groupedField.name);
    } else {
      searchParams.set(field.name, values.filter((itm) => itm !== value).join(','));
      const groupedValues = searchParams.get(groupedField.name)?.split(',') ?? [];
      searchParams.set(
        groupedField.name,
        groupedValues.filter((itm) => itm !== value).join(','),
      );
    }

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
          {values?.length ? (
            <div className={classes.menu.chipsContainer}>
              {values.length > maxChips ? (
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
                        {program === Program.BCWS
                          ? FireCentreName[itm as keyof typeof FireCentreName]
                          : itm}
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
          {(field.options as Option[])?.map((option: Option) => (
            <MenuItem key={option.value}>
              <span className={classes.menu.listItem}>
                <Checkbox
                  id={option.value}
                  onChange={handleChange}
                  checked={values?.includes(option.value)}
                  name={field.name}
                  value={option.value}
                />
                {option.label}
              </span>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </>
  );
};
