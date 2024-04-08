import type { ChangeEvent } from 'react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { type TableData, handleSearchParams } from '@/components';

import { truncatePageRange } from './utils';
import type { DashboardFilters, Personnel } from '@/pages/dashboard';
import {
  activeAndInactive,
  activeAndInactiveWithFunction,
  pending,
  pendingWithFunction,
} from '@/pages/dashboard/columns';
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
    pageRange: [],
    totalRows: 0,
    totalPages: 1,
    count: {
      [Status.ACTIVE]: 0,
      [Status.INACTIVE]: 0,
      [Status.PENDING]: 0,
    },
  });
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
  const [dashboardColumns, setDashboardColumns] = useState(activeAndInactive);
  const debouncedValue = useDebounce<{ [key: string]: unknown }>(
    filterValues,
    defaultDebounceValue,
  );

  const renderColumns = (value: Status) => {
    if (value === Status.PENDING && filterValues.function) {
      setDashboardColumns(pendingWithFunction);
    } else if (value === Status.PENDING && !filterValues.function) {
      setDashboardColumns(pending);
    } else if (value !== Status.PENDING && filterValues.function) {
      setDashboardColumns(activeAndInactiveWithFunction);
    } else setDashboardColumns(activeAndInactive);
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
        renderColumns(filterValues.status);
        setTableData({
          totalPages,
          pageRange: truncatePageRange(totalPages, currentPage, pageRange),
          totalRows: count[filterValues.status],
          count,
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

  const onChangeTab = (value: Status) => {
    setFilterValues((prev: any) => ({
      ...prev,
      currentPage: 1,
      status: value,
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
    dashboardColumns,
    tabs: [
      {
        label: StatusNames.ACTIVE,
        value: Status.ACTIVE,
        count: tableData.count[Status.ACTIVE],
      },
      {
        label: StatusNames.INACTIVE,
        value: Status.INACTIVE,
        count: tableData.count[Status.INACTIVE],
      },
      {
        label: StatusNames.PENDING,
        value: Status.PENDING,
        count: tableData.count[Status.PENDING],
      },
    ],
  };
};
