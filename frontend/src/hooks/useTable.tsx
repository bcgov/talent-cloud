import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { TableData, PageParams } from '@/components';
import { AxiosPrivate } from '../utils';
import { v4 as uuidv4 } from 'uuid';
import { Status } from '@/common';
import { truncatePageRange } from './utils';
import type { DashboardFilters, DashboardRow } from '@/pages/dashboard';
import { DashboardColumns } from '@/pages/dashboard';
import { tableClass } from '@/styles/tableStyles';

const useTable = () => {
  const [tableData, setTableData] = useState<TableData>();
  const [filterValues, setFilterValues] = useState<DashboardFilters>({
    name: null,
    region: null,
    location: null,
    function: null,
    experience: null,
  });
  const [searchParamsUrl, setSearchParamsUrl] = useSearchParams(
    encodeURI('?page=1&rows=25'),
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

    // Search Params url should be encoded 
    // WIP
  useEffect(() => {
    
    searchParamsUrl.set('page', pageParams?.currentPage.toString() ?? "1");
    searchParamsUrl.set('rows', pageParams?.rowsPerPage.toString() ?? "25");
    filterValues?.name && searchParamsUrl.set('name', filterValues?.name ?? "");
    filterValues?.region && searchParamsUrl.set('region', filterValues.region.join(",") );
    filterValues?.location && searchParamsUrl.set('location', filterValues.location.join(",") );
    filterValues?.function && searchParamsUrl.set('function', filterValues.function );
    filterValues?.experience && searchParamsUrl.set('experience', filterValues.experience);


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

  const handlePageParams =  (change: Partial<PageParams>) => {
    setPageParams({ ...pageParams, ...change });
  };

  const handleFilterChange = ({ name, value }: { name: string; value: string }) => {
    setFilterValues({ ...filterValues, [name]: value });
  };

  const handleMultiSelectChange = ({
    name,
    value,
  }: {
    name: string;
    value: any[];
  }) => {
    console.log(name, value);
    setFilterValues({ ...filterValues, [name]: [...value] });
  };
  const onSubmit = () => {
    handlePageParams({ ...pageParams, ...filterValues });
  };

  return {
    tableData,
    pageParams,
    handleFilterChange,
    handleMultiSelectChange,
    handlePageParams,
    onSubmit,
    onClear: () => setFilterValues({name: null, region: null, location: null, function: null, experience: null}),
    filterValues,
  };
};

export default useTable;
