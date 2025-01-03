import { useState, useEffect } from 'react';
import type { DashboardColumns, Program } from '@/common';
import { type Personnel } from '@/common';
import { renderCells } from './helpers';
import { useAxios } from './useAxios';
import { Status, StatusNames } from '@/common';
import { activeCols, pendingColumns } from '@/pages/dashboard/columns';
import { renderName } from '@/components/ui/helpers';

export const useTable = (searchParamsUrl: URLSearchParams, program?: Program) => {
  const { AxiosPrivate } = useAxios();
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState<DashboardColumns[]>();
  const [tabCount, setTabCount] = useState();
  const status = searchParamsUrl.get('status');

  /**
   * This function is used to dynamically render the columns based on the selected filter values values
   * @param columns
   * @returns
   */

  const applyFilters = async (program: Program) => {
    const isPending = status === Status.PENDING;

    try {
      const {
        data: { personnel, count },
      } = await AxiosPrivate.get(`/${program}?${searchParamsUrl}`);
      const rows = personnel.map(
        ({ id, status, newMember, ...personnel }: Personnel) => ({
          key: id,
          status: newMember ? Status.NEW : status,
          cells:
            program &&
            renderCells(
              { id, status, newMember, ...personnel },
              searchParamsUrl,
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
    if (program) {
      applyFilters(program);
    }
  }, [searchParamsUrl, program]);

  return {
    totalRows: status && tabCount ? tabCount[status] : 0,
    currentPage: parseInt(searchParamsUrl.get('page') ?? '1'),
    rowsPerPage: parseInt(searchParamsUrl.get('rows') ?? '25'),
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
  };
};
