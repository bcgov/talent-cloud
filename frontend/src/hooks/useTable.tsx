import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { TableData, PageParams } from '@/components';
import { AxiosPrivate } from '../utils';
import { v4 as uuidv4 } from 'uuid';
import { Status } from '@/common';
import { truncatePageRange } from './utils';
import type { DashboardFilters,  Personnel } from '@/pages/dashboard';
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
          data: {personnel, count}
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
            rows: personnel.map(({
              id,              
              active,
              firstName,
              lastName, 
              region, 
              workLocation,
              willingToTravel,
              remoteOnly,
              classification,
              ministry}: Personnel) => ({
              key: id,
              active: active ? Status.Active : Status.Inactive,
              cells: [
                {key: uuidv4(), columnName: DashboardColumns.NAME, value: `${lastName.toUpperCase()},  ${firstName}` , className: tableClass(DashboardColumns.NAME, "")},
                {key: uuidv4(), columnName: DashboardColumns.REGION, value: region , className: tableClass(DashboardColumns.REGION, region?.toLowerCase())},
                {key: uuidv4(), columnName: DashboardColumns.LOCATION, value: workLocation , className: tableClass(DashboardColumns.LOCATION, workLocation?.toLowerCase())},
                {key: uuidv4(), columnName: DashboardColumns.TRAVEL, value: willingToTravel , className: tableClass(DashboardColumns.TRAVEL,willingToTravel )},
                {key: uuidv4(), columnName: DashboardColumns.REMOTE, value: remoteOnly , className: tableClass(DashboardColumns.REMOTE, remoteOnly)},
                {key: uuidv4(), columnName: DashboardColumns.CLASSIFICATION, value: classification , className: tableClass(DashboardColumns.CLASSIFICATION, classification?.toLowerCase())},
                {key: uuidv4(), columnName: DashboardColumns.MINISTRY, value: ministry , className: tableClass(DashboardColumns.MINISTRY, ministry?.toLowerCase())}]
              }))})
                
                
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
    setFilterValues({ ...filterValues, [name]: value });
  };

  const handleGroupedMultiSelectChange = ({
    name,
    value,
  }: {
    name: string;
    value: any[];
  }) => {    
    setFilterValues({ ...filterValues, [name]: value.map(itm => itm.value) });
  };
  
  //TODO 
  // WIP
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
    handleGroupedMultiSelectChange
  };
};

export default useTable;
