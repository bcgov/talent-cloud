import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { TableData, PageParams } from '@/components';
import { AxiosPrivate } from '../utils';
import { v4 as uuidv4 } from 'uuid';
import { Status, WorkLocationName } from '@/common';
import { truncatePageRange } from './utils';
import type { DashboardFilters, Personnel } from '@/pages/dashboard';
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
    searchParamsUrl.set('page', pageParams?.currentPage.toString() ?? '1');
    searchParamsUrl.set('rows', pageParams?.rowsPerPage.toString() ?? '25');

    if (pageParams?.showInactive === true) {
      searchParamsUrl.delete('active');
    } else {
      searchParamsUrl.set('active', 'true');
    }

    if (filterValues?.name) {
      searchParamsUrl.set('name', filterValues?.name);
    } else {
      searchParamsUrl.delete('name');
    }

    if (filterValues?.region?.length) {
      searchParamsUrl.set('regions', filterValues.region.join(','));
    } else {
      searchParamsUrl.delete('regions');
    }

    if (filterValues?.location?.length) {
      searchParamsUrl.set('locations', filterValues.location.join(','));
    } else {
      searchParamsUrl.delete('locations');
    }

    if (filterValues?.function) {
      searchParamsUrl.set('function', filterValues.function);
    } else {
      searchParamsUrl.delete('function');
    }

    if (filterValues?.experience) {
      searchParamsUrl.set('experience', filterValues.experience);
    } else {
      searchParamsUrl.delete('experience');
    }

    (async () => {
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
                active: active ? Status.Active : Status.Inactive,
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
                    value:
                      WorkLocationName[
                        workLocation as keyof typeof WorkLocationName
                      ],
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
  }, [pageParams]);

  const handlePageParams = (change: Partial<PageParams>) => {
    setPageParams({ ...pageParams, ...change });
  };

  const handleChange = ({ name, value }: { name: string; value: any | any[] }) => {
    if (Array.isArray(value) && value.every((v) => !!v.value)) {
      setFilterValues({ ...filterValues, [name]: value.map((itm) => itm.value) });
    } else if (Array.isArray(value) && value.every((v:string) => typeof v === 'object' || typeof v === 'string')) {
      setFilterValues({ ...filterValues, [name]: value });
    } else if (typeof value === 'string') {
      setFilterValues({ ...filterValues, [name]: value });
    } else {
      console.log('MISSING CASE');
    }
  };
  
  const onSubmit = () => {
    handlePageParams({ ...pageParams, ...filterValues });
  };

  return {
    tableData,
    pageParams,
    handleChange,
    handlePageParams,
    onSubmit,
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
