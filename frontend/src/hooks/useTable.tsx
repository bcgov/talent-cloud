import type { ChangeEvent } from 'react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { type TableData, handleSearchParams } from '@/components';
import { AxiosPrivate } from '../utils';
import { v4 as uuidv4 } from 'uuid';
import { truncatePageRange } from './utils';
import type { DashboardFilters, Personnel } from '@/pages/dashboard';
import { DashboardColumns } from '@/pages/dashboard';
import { tableClass } from '@/styles/tableStyles';
import { WorkLocation } from '@/common/enums/work-location.enum';
import { useDebounce } from './useDebounce';

const useTable = () => {
  const [tableData, setTableData] = useState<TableData>();
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
  const [searchParamsUrl] = useSearchParams(encodeURI('?page=1&rows=25'));
  const debouncedValue = useDebounce<string>(filterValues, 500)


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

        personnel &&
          setTableData({
            totalPages,
            pageRange: truncatePageRange(totalPages, currentPage, pageRange),
            totalRows: count,
            rows: personnel.map(
              ({
                id,
                active,
                firstName,
                lastName,
                region,
                workLocation,
                willingToTravel,
                remoteOnly,
                classification,
                ministry,
              }: Personnel) => ({
                key: id,
                active,
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
                    value: WorkLocation[workLocation as keyof typeof WorkLocation],
                    className: tableClass(
                      DashboardColumns.LOCATION,
                      workLocation?.toLowerCase(),
                    ),
                  },
                  {
                    key: uuidv4(),
                    columnName: DashboardColumns.TRAVEL,
                    value: willingToTravel,
                    className: tableClass(DashboardColumns.TRAVEL, willingToTravel),
                  },
                  {
                    key: uuidv4(),
                    columnName: DashboardColumns.REMOTE,
                    value: remoteOnly,
                    className: tableClass(DashboardColumns.REMOTE, remoteOnly),
                  },
                  {
                    key: uuidv4(),
                    columnName: DashboardColumns.CLASSIFICATION,
                    value: classification,
                    className: tableClass(
                      DashboardColumns.CLASSIFICATION,
                      classification?.toLowerCase(),
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFilterValues((prev: any) => ({
      ...prev,
      currentPage: 1,
      [e.target.name]: e.target.value,
    }));

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
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

    setFilterValues((prev: any) => ({ ...prev, [name]: Array.from(valueSet) }));
  };

  const handleClose = (name: string, value: string) => {
    const event = {
      target: {
        name: name,
        value: value,
      },
    } as ChangeEvent<HTMLInputElement>;
    onChange(event);
  };

  const handleCloseMultiple = (name: string) => {
    const event = {
      target: {
        name: name,
        value: filterValues[name],
      },
    } as ChangeEvent<HTMLInputElement>;
    onChange(event);
  };
  return {
    tableData,
    handleChange,
    onChange,
    handleClose,
    handleCloseMultiple,
    handlePageParams,
    onClear: () =>
      setFilterValues({
        rowsPerPage: 25,
        currentPage: 1,
        showInactive: false,
        name: '',
        region: [],
        location: [],
        function: '',
        experience: '',
      }),
    filterValues,
  };
};

export default useTable;
