import type { ChangeEvent } from 'react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { type TableData, handleSearchParams } from '@/components';

import { truncatePageRange } from './utils';
import {
  DashboardColumns,
  type DashboardFilters,
  type Personnel,
} from '@/pages/dashboard';
import { activeAndInactive, pending } from '@/pages/dashboard/columns';
import { useDebounce } from './useDebounce';
import { useError } from './useError';
import type { DateRange } from 'react-day-picker';
import { renderCells } from './helpers';
import { useAxios } from './useAxios';
import { Status, StatusNames } from '@/common';

export const useTable = () => {
  const { handleError } = useError();
  const { AxiosPrivate } = useAxios();

  const [loading, setLoading] = useState(true);
  const [tableData, setTableData] = useState<TableData>({
    rows: [],
    columns: [],
    pageRange: [],
    totalRows: 0,
    totalPages: 1,
    count: {
      [Status.ACTIVE]: 0,
      [Status.INACTIVE]: 0,
      [Status.PENDING]: 0,
    },
  });
  const [counts, setCounts] = useState<any>({
    [Status.ACTIVE]: 0,
    [Status.INACTIVE]: 0,
    [Status.PENDING]: 0,
  });
  const tabs = [
    { index: 0, label: StatusNames.ACTIVE, value: Status.ACTIVE },
    { index: 1, label: StatusNames.INACTIVE, value: Status.INACTIVE },
    { index: 2, label: StatusNames.PENDING, value: Status.PENDING },
  ];

  const [selectedTab, setSelectedTab] = useState(0);

  const [filterValues, setFilterValues] = useState<any>({
    rowsPerPage: 25,
    currentPage: 1,
    status: Status.ACTIVE,
    name: '',
    region: [],
    location: [],
    function: undefined,
    experience: undefined,
    availabilityType: '',
    availabilityDates: {
      from: '',
      to: '',
    },
  });

  const [defaultDebounceValue, setDefaultDebounceValue] = useState(100);
  const [searchParamsUrl] = useSearchParams(encodeURI('?page=1&rows=25'));
  const debouncedValue = useDebounce<{ [key: string]: unknown }>(
    filterValues,
    defaultDebounceValue,
  );

  const renderColumns = (value: Status) => {
    if (value === Status.PENDING) {
      return !filterValues.function
        ? pending.filter((itm) => itm.key !== DashboardColumns.FUNCTION)
        : pending;
    } else {
      return !filterValues.function
        ? activeAndInactive.filter((itm) => itm.key !== DashboardColumns.FUNCTION)
        : activeAndInactive;
    }
  };

  useEffect(() => {
    (async () => {
      handleSearchParams(searchParamsUrl, filterValues);
      try {
        const {
          data: { personnel, count },
        } = await AxiosPrivate.get(`/personnel?${searchParamsUrl}`);
        const rowsPerPage = filterValues?.rowsPerPage ?? 25;

        const totalPages = Math.ceil(count[filterValues.status] / rowsPerPage);

        const pageRange = [...Array(totalPages).keys()];

        pageRange.splice(0, 1);

        const currentPage = filterValues?.currentPage ?? 1;
        setCounts(count);
        setTableData({
          totalPages,
          pageRange: truncatePageRange(totalPages, currentPage, pageRange),
          totalRows: count[filterValues.status],
          columns: renderColumns(filterValues.status),
          rows: personnel.map(
            ({ id, status, newMember, ...personnel }: Personnel) => ({
              key: id,
              status: newMember ? Status.NEW : status,
              cells: renderCells(
                { id, status, newMember, ...personnel },
                filterValues,
              ),
            }),
          ),
        });
      } catch (e) {
        handleError(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [debouncedValue]);

  const handlePageParams = (change: Partial<DashboardFilters>) => {
    setFilterValues({ ...filterValues, ...change });
  };

  const handleSingleSelect = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterValues((prev: any) => ({
      ...prev,
      currentPage: 1,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setDefaultDebounceValue(1000);
    setFilterValues((prev: any) => ({
      ...prev,
      currentPage: 1,
      [e.target.name]: e.target.value,
    }));
  };

  const handleMultiSelect = (event: ChangeEvent<HTMLInputElement>) => {
    setDefaultDebounceValue(100);
    const {
      target: { name, value },
    } = event;

    const valueSet = new Set(filterValues[name]);

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

    setFilterValues((prev: any) => ({
      ...prev,
      currentPage: 1,
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
  const handleCloseMany = (name: string) => {
    setFilterValues((prev: any) => ({
      ...prev,
      currentPage: 1,
      [name]: [],
    }));
  };

  const handleSetDates = (range: DateRange | undefined) => {
    if (!range) {
      setFilterValues((prev: any) => ({
        ...prev,
        currentPage: 1,
        availabilityDates: {
          from: '',
          to: '',
        },
      }));
    } else {
      setFilterValues((prev: any) => ({
        ...prev,
        currentPage: 1,
        availabilityDates: range,
      }));
    }
  };
  const resetType = () => {
    setFilterValues((prev: any) => ({
      ...prev,
      currentPage: 1,
      availabilityType: '',
    }));
  };

  const onChangeTab = (index: number) => {
    setSelectedTab(index);
    setFilterValues((prev: any) => ({
      ...prev,
      currentPage: 1,
      status: tabs[index].value,
    }));
  };

  return {
    tableData,
    handlePageParams,
    handleMultiSelect,
    handleSingleSelect,
    handleSearch,
    filterValues,
    handleClose,
    handleCloseMany,
    handleSetDates,
    resetType,
    loading,
    counts,
    tabs,
    selectedTab,
    onChangeTab,
    onClear: () =>
      setFilterValues({
        rowsPerPage: 25,
        currentPage: 1,
        status: Status.ACTIVE,
        name: '',
        region: [],
        location: [],
        function: null,
        experience: '',
        availabilityType: '',
        availabilityDates: {
          from: '',
          to: '',
        },
      }),
  };
};
