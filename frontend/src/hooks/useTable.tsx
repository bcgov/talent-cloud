import type { ChangeEvent } from 'react';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { type TableData, type PageParams, handleSearchParams } from '@/components';
import { AxiosPrivate } from '../utils';
import { v4 as uuidv4 } from 'uuid';
import { WorkLocation } from '@/common';
import { truncatePageRange } from './utils';
import type { Personnel } from '@/pages/dashboard';
import { DashboardColumns } from '@/pages/dashboard';
import { tableClass } from '@/styles/tableStyles';

const useTable = () => {
  const [tableData, setTableData] = useState<TableData>();
  const [filterValues, setFilterValues] = useState<any>({
    name: '',
    region: [],
    location: [],
    function: '',
    experience: '',
  });
  const [searchParamsUrl] = useSearchParams(encodeURI('?page=1&rows=25'));

  const [pageParams, setPageParams] = useState<PageParams>({
    rowsPerPage: 25,
    currentPage: 1,
    showInactive: false,
  });

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
      handleSearchParams(searchParamsUrl, pageParams, filterValues);
      try {
        const {
          data: { personnel, count },
        } = await AxiosPrivate.get(`/personnel?${searchParamsUrl}`);

        const rowsPerPage = pageParams?.rowsPerPage ?? 25;
        const totalPages = Math.ceil(count / rowsPerPage);
        const pageRange = calculatePages(Math.ceil(totalPages));
        const currentPage = pageParams?.currentPage ?? 1;

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
  }, [pageParams, filterValues]);

  const handlePageParams = (change: Partial<PageParams>) => {
    setPageParams({ ...pageParams, ...change });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setFilterValues((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));

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
    pageParams,
    handleChange,
    onChange,
    handleClose,
    handleCloseMultiple,
    handlePageParams,
    onClear: () =>
      setFilterValues({
        name: null,
        region: null,
        location: null,
        function: null,
        experience: null,
      }),
    filterValues,
  };
};

export default useTable;
