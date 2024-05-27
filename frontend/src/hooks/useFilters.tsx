import { Status } from '@/common';
import { Route } from '@/providers';
import { datePST } from '@/utils';
import type { ChangeEvent } from 'react';
import { useMemo, useState } from 'react';
import type { DateRange } from 'react-day-picker';
import { useSearchParams } from 'react-router-dom';

export const useFilters = () => {
  const [searchParamsUrl, setSearchUrlParams] = useSearchParams({
    rows: '25',
    page: '1',
    status: Status.ACTIVE,
  });

  const [searchValue, setSearchValue] = useState<string>(
    searchParamsUrl.get('name') ?? '',
  );

  const [availabilityDates, setAvailabilityDates] = useState<DateRange | undefined>(
    undefined,
  );

  const clearSearchParams = (name: string) => {
    searchParamsUrl.delete(name);
    setSearchUrlParams(searchParamsUrl);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (e.target.value === '') {
      clearSearchParams(e.target.name);
    } else {
      setTimeout(
        () =>
          setSearchUrlParams((prev: URLSearchParams) => ({
            ...Object.fromEntries([...prev]),
            [e.target.name]: e.target.value,
          })),
        1000,
      );
    }
  };

  const handleMultiSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;

    const values = searchParamsUrl.getAll(name);
    const valueSet = new Set(values);

    if (Array.isArray(value)) {
      value.forEach((itm: any) => {
        if (valueSet.has(itm)) {
          valueSet.delete(itm);
        } else {
          valueSet.add(itm);
        }
      });
    } else if (!Array.isArray(value)) {
      if (valueSet.has(value)) {
        valueSet.delete(value);
      } else {
        valueSet.add(value);
      }
    }
    setSearchUrlParams((prev: URLSearchParams) => ({
      ...Object.fromEntries([...prev]),
      [name]: Array.from(valueSet),
    }));
  };

  const handleClose = (name: string, value: string | string[]) => {
    const event = {
      target: {
        name: name,
        value: value,
      },
    } as ChangeEvent<HTMLInputElement>;

    handleMultiSelect(event);
  };

  const handleSetDates = (range: DateRange | undefined) => {
    setAvailabilityDates(range);
    if (!range) {
      clearSearchParams('availabilityFromDate');
      clearSearchParams('availabilityToDate');
    } else {
      setSearchUrlParams((prev: URLSearchParams) => ({
        ...Object.fromEntries([...prev]),
        ['availabilityFromDate']: range.from ? datePST(range.from, true) : undefined,
        ['availabilityToDate']: range?.to ? datePST(range.to, true) : undefined,
      }));
    }
  };

  const handleChange = (name: string, value: string | number | string[]) => {
    setSearchUrlParams((prev: URLSearchParams) => ({
      ...Object.fromEntries([...prev]),
      [name]: value,
    }));
  };

  const filterValues = useMemo(() => {
    return {
      name: searchParamsUrl.get('name') ?? '',
      status: searchParamsUrl.get('status') ?? Status.ACTIVE,
      region: searchParamsUrl.getAll('region') ?? [],
      fireCentre: searchParamsUrl.getAll('fireCentre') ?? [],
      location: searchParamsUrl.getAll('location') ?? [],
      role: searchParamsUrl.get('role') ?? '',
      section: searchParamsUrl.get('section') ?? '',
      function: searchParamsUrl.get('function') ?? '',
      experience: searchParamsUrl.get('experience') ?? '',
      availabilityType: searchParamsUrl.get('availabilityType') ?? '',
      availabilityDates: searchParamsUrl.get('availabilityDates') ?? '',
    };
  }, [searchParamsUrl]);

  return {
    handleChange,
    clearSearchParams,
    searchParamsUrl,
    filterValues,
    searchValue,
    setSearchValue: (value: string) => setSearchValue(value),
    availabilityDates,
    setAvailabilityDates: (value: DateRange | undefined) =>
      setAvailabilityDates(value),
    getOptions: (fields: any, route?: Route) => {
      if (route === Route.BCWS) {
        return filterValues.fireCentre && filterValues.fireCentre?.length > 0
          ? fields.location?.groupedOptions?.filter((itm: any) =>
              filterValues.fireCentre?.includes(itm.label.toString()),
            )
          : fields?.location?.groupedOptions;
      } else {
        return filterValues.region && filterValues.region.length > 0
          ? fields.location?.groupedOptions?.filter((itm: any) =>
              filterValues.region?.includes(itm.label),
            )
          : fields?.location?.groupedOptions;
      }
    },
    handleMultiSelect,
    handleNestedChange: (
      value: { name: string; value: string },
      nestedValue: { name: string; value: string },
    ) => {
      setSearchUrlParams((prev: URLSearchParams) => ({
        ...Object.fromEntries([...prev]),
        [value.name]: value.value,
        [nestedValue.name]: nestedValue.value,
      }));
    },
    handleSearch,
    handleClose,
    handleSetDates,
    onClear: () => {
      setSearchValue('');
      const range: DateRange | undefined = { from: undefined, to: undefined };
      setAvailabilityDates(range);
      setSearchUrlParams({
        rows: '25',
        page: '1',
        status: Status.ACTIVE,
      });
    },
    disabled: [
      filterValues.availabilityType === '',
      filterValues.experience === '',
      filterValues.fireCentre.length === 0,
      filterValues.function === '',
      filterValues.location.length === 0,
      filterValues.name === '',
      filterValues.region.length === 0,
      filterValues.role === '',
      filterValues.section === '',
    ].every((itm) => itm === true),
  };
};
