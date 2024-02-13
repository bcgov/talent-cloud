import type { ChangeEvent } from 'react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { type TableData, handleSearchParams } from '@/components';
import { AxiosPrivate } from '../utils';
import { v4 as uuidv4 } from 'uuid';
import { truncatePageRange } from './utils';
import type { DashboardFilters, Personnel } from '@/pages/dashboard';
import { DashboardColumns } from '@/pages/dashboard';
import { tableClass } from '@/components/table/classes';
import { useDebounce } from './useDebounce';
import { ExperienceName } from '@/common';

export const useTable = () => {
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
    function: '',
    experience: '',
  });
  const [showFunctionColumn, setShowFunctionColumn] = useState<boolean>(false);
  const [defaultDebounceValue, setDefaultDebounceValue] = useState(100);
  const [searchParamsUrl] = useSearchParams(encodeURI('?page=1&rows=25'));
  const debouncedValue = useDebounce<string>(filterValues, defaultDebounceValue);

  const calculatePages = (totalPages: number): number[] => {
    const range = [];

    // create the pages array for the footer
    for (let i = 1; i <= totalPages; i++) {
      range.push(i);
    }
    return range;
  };

  useEffect(() => {
    (async () => {
      handleSearchParams(searchParamsUrl, filterValues);

      try {
        const {
          data: { personnel, count },
        } = await AxiosPrivate.get(`/personnel?${searchParamsUrl}`);

        const rowsPerPage = filterValues?.rowsPerPage ?? 25;
        const totalPages = Math.ceil(count / rowsPerPage);
        const pageRange = calculatePages(Math.ceil(totalPages));
        const currentPage = filterValues?.currentPage ?? 1;
        filterValues.function
          ? setShowFunctionColumn(true)
          : setShowFunctionColumn(false);

        personnel &&
          setTableData({
            totalPages,
            pageRange: truncatePageRange(totalPages, currentPage, pageRange),
            totalRows: count,
            rows: personnel.map(
              ({
                id,
                status,
                firstName,
                lastName,
                experiences,
                region,
                workLocation,
                willingToTravel,
                remoteOnly,
                classification,
                ministry,
              }: Personnel) => ({
                key: id,
                status: status,
                
                cells: [
                  {
                    key: uuidv4(),
                    columnName: DashboardColumns.NAME,
                    value: `${lastName.toUpperCase()},  ${firstName}`,
                    className: tableClass(DashboardColumns.NAME, ''),
                  },

                  {
                    key: uuidv4(),
                    columnName: DashboardColumns.REGION,
                    value: region,
                    className: tableClass(
                      DashboardColumns.REGION,
                      region?.toLowerCase(),
                    ),
                  },
                  {
                    key: uuidv4(),
                    columnName: DashboardColumns.LOCATION,
                    value: workLocation,
                    className: tableClass(
                      DashboardColumns.LOCATION,
                      workLocation?.toLowerCase(),
                    ),
                  },
                  {
                    key: uuidv4(),
                    columnName: DashboardColumns.FUNCTION,
                    value: `${experiences.find((itm: any) => itm.functionName === filterValues.function)?.functionName}:${ExperienceName[experiences.find((itm: any) => itm.functionName === filterValues.function)?.experienceType as keyof typeof ExperienceName]}`,
                    className: experiences.find(
                      (itm: any) => itm.functionName === filterValues.function,
                    )
                      ? tableClass(DashboardColumns.FUNCTION, '')
                      : 'hidden',
                  },
                  {
                    key: uuidv4(),
                    columnName: DashboardColumns.TRAVEL,
                    value: willingToTravel,
                    className: tableClass(
                      DashboardColumns.TRAVEL,
                      willingToTravel ? 'yes' : 'no',
                    ),
                  },
                  {
                    key: uuidv4(),
                    columnName: DashboardColumns.REMOTE,
                    value: remoteOnly,
                    className: tableClass(
                      DashboardColumns.REMOTE,
                      remoteOnly ? 'yes' : 'no',
                    ),
                  },
                  {
                    key: uuidv4(),
                    columnName: DashboardColumns.UNION_MEMBERSHIP,
                    value: classification,
                    className: tableClass(
                      DashboardColumns.UNION_MEMBERSHIP,
                      classification,
                    ),
                  },
                  {
                    key: uuidv4(),
                    columnName: DashboardColumns.MINISTRY,
                    value: ministry,
                    className: tableClass(
                      DashboardColumns.MINISTRY,
                      ministry?.toLowerCase(),
                    ),
                  },
                ],
              }),
            ),
          });
      } catch (e) {
        console.log(e);
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

  return {
    tableData,
    handlePageParams,
    handleMultiSelect,
    handleSingleSelect,
    handleSearch,
    showFunctionColumn,
    filterValues,
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
      }),
    dashboardColumns: [
      { key: uuidv4(), name: DashboardColumns.NAME },
      { key: uuidv4(), name: DashboardColumns.REGION },
      { key: uuidv4(), name: DashboardColumns.LOCATION },
      { key: uuidv4(), name: DashboardColumns.FUNCTION },
      { key: uuidv4(), name: DashboardColumns.TRAVEL },
      { key: uuidv4(), name: DashboardColumns.REMOTE },
      { key: uuidv4(), name: DashboardColumns.UNION_MEMBERSHIP },
      { key: uuidv4(), name: DashboardColumns.MINISTRY },
    ],
  };
};
