import { Status } from '@/common';
import { datePST } from '@/utils';
import { useState } from 'react';
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

  const handleRemove = (name: string, value: string) => {
    searchParamsUrl.delete(name, value);
    setSearchUrlParams(searchParamsUrl);
  };

  const handleSetDates = (range: DateRange | undefined) => {
    setAvailabilityDates(range);
    if (!range || !range.from) {
      clearSearchParams('availabilityFromDate');
      clearSearchParams('availabilityToDate');
    } else {
      setSearchUrlParams((prev: URLSearchParams) => ({
        ...Object.fromEntries([...prev]),
        ['availabilityFromDate']: range.from ? datePST(range.from, true) : undefined,
        ['availabilityToDate']: range?.to
          ? datePST(range.to, true)
          : datePST(range.from, true),
      }));
    }
  };

  const handleChange = (name: string, value: string) => {
    searchParamsUrl.append(name, value);
    setSearchUrlParams(searchParamsUrl);
  };

  const handleChangeOne = (name: string, value: string) => {
    searchParamsUrl.set(name, value);
    setSearchUrlParams(searchParamsUrl);
  };

  const filterValues = {
    name: searchParamsUrl.get('name') ?? '',
    status: searchParamsUrl.get('status') ?? Status.ACTIVE,
    region: searchParamsUrl.getAll('region') ?? [],
    fireCentre: searchParamsUrl.getAll('fireCentre') ?? [],
    location: searchParamsUrl.getAll('location') ?? '[]',
    role: searchParamsUrl.get('role') ?? '',
    section: searchParamsUrl.get('section') ?? '',
    function: searchParamsUrl.get('function') ?? '',
    experience: searchParamsUrl.get('experience') ?? '',
    availabilityType: searchParamsUrl.get('availabilityType') ?? '',
    availabilityDates: searchParamsUrl.get('availabilityDates') ?? '',
  };

  return {
    handleRemove,
    handleChange,
    clearSearchParams,
    searchParamsUrl,
    filterValues,
    searchValue,
    setSearchValue: (value: string) => setSearchValue(value),
    availabilityDates,
    setAvailabilityDates: (value: DateRange | undefined) =>
      setAvailabilityDates(value),

    handleChangeOne,
    handleSetDates,
    onClear: () => {
      setSearchValue('');
      const range: DateRange | undefined = { from: undefined, to: undefined };
      setAvailabilityDates(range);
      setSearchUrlParams({
        rows: '25',
        page: '1',
        status: searchParamsUrl.get('status') ?? Status.ACTIVE,
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
