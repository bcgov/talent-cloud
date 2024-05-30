import { useState, useEffect } from 'react';
import type { DashboardColumns } from '@/pages/dashboard';
import { type Personnel } from '@/pages/dashboard';
import { renderCells } from './helpers';
import { useAxios } from './useAxios';
import { Status, StatusNames } from '@/common';
import type { Route } from '@/providers';
import { activeCols, pendingColumns } from '@/pages/dashboard/columns';

export const useTable = (searchParamsUrl: URLSearchParams, route?: Route) => {
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

  const applyFilters = async (route: Route) => {
    const isPending = status === Status.PENDING;

    try {
      const {
        data: { personnel, count },
      } = await AxiosPrivate.get(`/personnel/${route}?${searchParamsUrl}`);
      const rows = personnel.map(
        ({ id, status, newMember, ...personnel }: Personnel) => ({
          key: id,
          status: newMember ? Status.NEW : status,
          cells:
            route &&
            renderCells(
              { id, status, newMember, ...personnel },
              searchParamsUrl,
              isPending,
              route,
            ),
        }),
      );
      const columns = isPending ? pendingColumns[route] : activeCols[route];

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
    if (route) {
      applyFilters(route);
    }
  }, [searchParamsUrl, route]);

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
    columns,
    setLoading: (loading: boolean) => setLoading(loading),
  };
};
