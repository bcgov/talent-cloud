import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Row, SearchParams } from '../common/interface';
import { AxiosPrivate } from '../utils';

const useTable = () => {
  const [totalRows, setTotalRows] = useState<number>();
  const [pageData, setPageData] = useState<Row[]>();
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
        const { data } = await AxiosPrivate.get(`/resources?${searchParams}`);
        setTotalRows(data.totalRows);
        setPageRange(
          calculatePages(data.totalRows, parseInt(searchParams.get('rows') ?? '1')),
        );
        setPageData(data.rows);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [searchParams]);

  const handleParamsChange = (params: SearchParams) => {
    console.log(params);
    const url = encodeURI(
      `?page=${params.page}&rows=${params.rows}&search=${params.search}`,
    );
    setSearchParams(url);
  };

  return {
    pageRange,
    pageData,
    totalRows,
    searchParams,
    handleParamsChange,
  };
};

export default useTable;
