import type { ChangeEvent } from 'react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { type TableData, handleSearchParams } from '@/components';
import { AxiosPrivate } from '../utils';
import { v4 as uuidv4 } from 'uuid';
import { truncatePageRange } from './utils';
import type { DashboardFilters, Personnel } from '@/pages/dashboard';
import { DashboardColumns } from '@/pages/dashboard';
import { useDebounce } from './useDebounce';
import { useError } from './useError';
import type { DateRange } from 'react-day-picker';
import { renderCells } from './helpers';

export const useTable = () => {
  const { handleError } = useError();

  const [tableData, setTableData] = useState<TableData>({
    rows: [],
    pageRange: [],
    totalRows: 0,
    totalPages: 1,
  });
  const [filterValues, setFilterValues] = useState<any>({
    rowsPerPage: 25,
    currentPage: 1,
    showInactive: false,
    name: '',
    region: [],
    location: [],
    function: undefined,
    experience: undefined,
    availabilityType: '',
    availabilityDates: {
      from: undefined,
      to: undefined,
    },
  });

  const [defaultDebounceValue, setDefaultDebounceValue] = useState(100);
  const [searchParamsUrl] = useSearchParams(encodeURI('?page=1&rows=25'));
  const debouncedValue = useDebounce<{ [key: string]: unknown }>(
    filterValues,
    defaultDebounceValue,
  );

  useEffect(() => {
    (async () => {
      handleSearchParams(searchParamsUrl, filterValues);

      try {
        const {
          data: { personnel, count },
        } = await AxiosPrivate.get(`/personnel?${searchParamsUrl}`);

        const rowsPerPage = filterValues?.rowsPerPage ?? 25;
        const totalPages = Math.ceil(count / rowsPerPage);
        const pageRange = [...Array(totalPages).keys()];
        const currentPage = filterValues?.currentPage ?? 1;

        setTableData({
          totalPages,
          pageRange: truncatePageRange(totalPages, currentPage, pageRange),
          totalRows: count,
          rows: personnel.map(({ id, status, ...personnel }: Personnel) => ({
            key: id,
            status: status,
            cells: renderCells(personnel, filterValues),
          })),
        });
      } catch (e) {
        handleError(e);
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
  const handleClose = (name: string, value: string) => {
    const event = {
      target: {
        name: name,
        value: value,
      },
    } as ChangeEvent<HTMLInputElement>;

    handleMultiSelect(event);
  };
  const handleCloseMany = (name: string) => {
    const event = {
      target: {
        name: name,
        value: [],
      },
    } as unknown as ChangeEvent<HTMLInputElement>;

    handleMultiSelect(event);
  };

  const handleSetDates = (range: DateRange | undefined) => {
    if (range?.from && range?.to && range.from > range.to) {
      setFilterValues((prev: any) => ({
        ...prev,
        currentPage: 1,
        availabilityDates: {
          from: range.to,
          to: range.from,
        },
      }));
    }
    setFilterValues((prev: any) => ({
      ...prev,
      currentPage: 1,
      availabilityDates: range,
    }));
  };
  return {
    tableData,
    handlePageParams,
    handleMultiSelect,
    handleSingleSelect,
    handleSearch,
    showFunctionColumn: filterValues.function,
    filterValues,
    handleClose,
    handleCloseMany,
    handleSetDates,
    onClear: () =>
      setFilterValues({
        rowsPerPage: 25,
        currentPage: 1,
        showInactive: false,
        name: '',
        region: [],
        location: [],
        function: null,
        experience: '',
        availabilityType: '',
        availabilityDates: {
          from: undefined,
          to: undefined,
        },
      }),
    dashboardColumns: [
      { key: uuidv4(), name: DashboardColumns.NAME },
      { key: uuidv4(), name: DashboardColumns.REGION },
      { key: uuidv4(), name: DashboardColumns.LOCATION },
      { key: uuidv4(), name: DashboardColumns.FUNCTION },
      { key: uuidv4(), name: DashboardColumns.AVAILABILITY },
      { key: uuidv4(), name: DashboardColumns.TRAVEL },
      { key: uuidv4(), name: DashboardColumns.REMOTE },
      { key: uuidv4(), name: DashboardColumns.UNION_MEMBERSHIP },
      { key: uuidv4(), name: DashboardColumns.MINISTRY },
    ],
  };
};
