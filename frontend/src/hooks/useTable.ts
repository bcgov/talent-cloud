import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { DashboardRow, SearchParams } from '../common/interface';
import { AxiosPrivate } from '../utils';
import { dashboardColumns } from '@/components/table/columns';
import { tableClass } from '@/components/table/utils';
import { DashboardColumns, type TableData } from '@/components/table/interface';
import { Status } from '../common';
import { v4 as uuidv4 } from 'uuid';

const useTable = () => {
  const [totalRows, setTotalRows] = useState<number>();
  const [tableData, setTableData] = useState<TableData>();
  const [pageRange, setPageRange] = useState<number[]>([1]);

  const [searchParams, setSearchParams] = useSearchParams(
    encodeURI('?page=1&rows=25&search='),
  );

  const calculatePages = (totalRows: number, rowsPerPage: number) => {
    const range = [];
    const num = Math.ceil(totalRows / rowsPerPage);
    // create the pages array for the footer
    for (let i = 1; i <= num; i++) {
      range.push(i);
    }
    return range;
  };

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { rows, totalRows },
        } = await AxiosPrivate.get(`/personnel?${searchParams}`);
        setTotalRows(totalRows);
        totalRows &&
          setPageRange(
            calculatePages(totalRows, parseInt(searchParams.get('rows') ?? '1')),
          );

        rows &&
          setTableData({
            columns: dashboardColumns.map((itm: string) => ({
              name: itm,
              key: uuidv4(),
            })),
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
  }, [searchParams]);

  const handleParamsChange = (params: SearchParams) => {
    const url = encodeURI(
      `?page=${params.page}&rows=${params.rows}&search=${params.search}`,
    );
    setSearchParams(url);
  };

  return {
    pageRange,
    tableData,
    totalRows,
    searchParams,
    handleParamsChange,
  };
};

export default useTable;
