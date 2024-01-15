import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import type { TableData, PageParams } from '@/components';
import { AxiosPrivate } from '../utils';
import { v4 as uuidv4 } from 'uuid';
import { Status } from '@/common';
import { truncatePageRange } from './utils';
import type { DashboardFilters, DashboardRow } from '@/pages/dashboard/constants';
import { DashboardColumns } from '@/pages/dashboard/constants';
import { tableClass } from '@/styles/tableStyles';

const useTable = () => {
  const [tableData, setTableData] = useState<TableData>();
  const [dashboardFilters, setDashboardFilters] = useState<DashboardFilters>({
    search: '',
    region: [],
    location: [],
    function: undefined,
    experience: undefined,
  });
  const [searchParamsUrl, setSearchParamsUrl] = useSearchParams(
    encodeURI('?page=1&rows=25&search='),
  );

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
    const url = encodeURI(
      `?page=${pageParams?.currentPage}&rows=${pageParams?.rowsPerPage}&search=${dashboardFilters?.search}&region=${dashboardFilters?.region}&location=${dashboardFilters?.location}&function=${dashboardFilters?.function}&experience=${dashboardFilters?.experience}`,
    );
    setSearchParamsUrl(url);

    (async () => {
      try {
        const {
          data: { rows, totalRows },
        } = await AxiosPrivate.get(`/personnel?${searchParamsUrl}`);

        const rowsPerPage = pageParams?.rowsPerPage ?? 25;
        const totalPages = Math.ceil(totalRows / rowsPerPage);
        const pageRange = calculatePages(Math.ceil(totalPages));
        const currentPage = pageParams?.currentPage ?? 1;

        rows &&
          setTableData({
            totalPages,
            pageRange: truncatePageRange(totalPages, currentPage, pageRange),
            totalRows,
            rows: rows.map((itm: DashboardRow) => ({
              key: uuidv4(),
              active: itm.status === Status.Active,
              cells: Object.entries(itm).map(
                ([key, value]) =>
                  key !== DashboardColumns.STATUS && {
                    key: uuidv4(),
                    columnName: key,
                    value,
                    className: tableClass(key, value),
                  },
              ),
            })),
          });
      } catch (e) {
        console.log(e);
      }
    })();
  }, [pageParams]);

  const handlePageParams = (change: Partial<PageParams>) => {
    setPageParams({ ...pageParams, ...change });
  };

  const handleFilterChange = ({ name, value }: { name: string; value: string }) => {
    setDashboardFilters({ ...dashboardFilters, [name]: value });
  };

  const handleMultiSelectChange = ({
    name,
    value,
  }: {
    name: string;
    value: any[];
  }) => {
    console.log(name, value);
    setDashboardFilters({ ...dashboardFilters, [name]: [...value] });
  };
  const onSubmit = () => {
    handlePageParams({ ...pageParams, ...dashboardFilters });
  };
  console.log(dashboardFilters);
  return {
    tableData,
    pageParams,
    handleFilterChange,
    handleMultiSelectChange,
    handlePageParams,
    onSubmit,
    dashboardFilters,
  };
};

export default useTable;
