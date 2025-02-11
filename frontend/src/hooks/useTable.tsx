import { useState, useEffect } from 'react';
import type { DashboardColumns, Program } from '@/common';
import { Filters, type Personnel } from '@/common';
import { renderCells } from './helpers';
import { useAxios } from './useAxios';
import { Status, StatusNames } from '@/common';
import { activeCols, pendingColumns } from '@/pages/dashboard/columns';
import { renderName } from '@/components/ui/helpers';
import { useSearchParams } from 'react-router-dom';

export const useTable = (program?: Program) => {
  const { AxiosPrivate } = useAxios();
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState<DashboardColumns[]>();
  const [tabCount, setTabCount] = useState();

  const [searchInputValue, setSearchInputValue] = useState('');

  const [searchParams, setSearchParams] = useSearchParams({
    rows: '25',
    page: '1',
    status: Status.ACTIVE,
  });

  const status = searchParams.get(Filters.STATUS) ?? Status.ACTIVE;
  const handleChangeSearch = (value: string) => {
    setSearchInputValue(value);
  };
  const applyFilters = async () => {
    const isPending = status === Status.PENDING;

    if (rows.length === 0) {
      searchParams.set(Filters.PAGE, '1');
      setSearchParams({ ...Object.fromEntries(searchParams) });
    }

    try {
      const {
        data: { personnel, count },
      } = await AxiosPrivate.get(`/${program}?${searchParams}`);

      const rows = personnel.map(
        ({ id, status, newMember, ...personnel }: Personnel) => ({
          key: id,
          status: newMember ? Status.NEW : status,
          recommitmentStatus: personnel.recommitment?.[0]?.status,
          cells:
            program &&
            renderCells(
              { id, status, newMember, ...personnel },
              searchParams,
              isPending,
              program,
            ),
        }),
      );

      const columns = isPending
        ? pendingColumns[program as keyof typeof pendingColumns]
        : activeCols[program as keyof typeof pendingColumns];

      setRows(rows);
      setTabCount(count);
      setColumns(columns);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [searchParams]);

  const resetParams = () => {
    const params = searchParams.entries();
    for (const [key] of params) {
      searchParams.delete(key);
    }
    handleChangeSearch('');
    setSearchParams({
      rows: '25',
      page: '1',
      status: Status.ACTIVE,
    });
  };

  return {
    totalRows: status && tabCount ? tabCount[status] : 0,
    currentPage: parseInt(searchParams.get(Filters.PAGE) ?? '1'),
    rowsPerPage: parseInt(searchParams.get(Filters.ROWS) ?? '25'),
    rows,
    loading,
    tabs: [
      {
        label: StatusNames.ACTIVE,
        value: Status.ACTIVE,
        count: tabCount?.[Status.ACTIVE] ?? '',
        selected: status === Status.ACTIVE,
      },
      {
        label: StatusNames.INACTIVE,
        value: Status.INACTIVE,
        count: tabCount?.[Status.INACTIVE] ?? '',
        selected: status === Status.INACTIVE,
      },
      {
        label: 'Pending Approval',
        value: Status.PENDING,
        count: tabCount?.[Status.PENDING] ?? '',
        selected: status === Status.PENDING,
      },
    ],
    columns: columns?.map((itm) => renderName(itm)),
    setLoading: (loading: boolean) => setLoading(loading),
    searchParams,
    setSearchParams,
    resetParams,
    searchInputValue,
    handleChangeSearch,
  };
};
