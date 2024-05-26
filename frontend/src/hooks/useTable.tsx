import { useState, useEffect, useMemo } from 'react';
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
  const [columns, setColumns] = useState<DashboardColumns[]>([]);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const [tabCount, setTabCount] = useState();

  /**
   * This function is used to dynamically render the columns based on the selected filter values values
   * @param columns
   * @returns
   */

  const applyFilters = async (route: Route) => {
    try {
      const {
        data: { personnel, count },
      } = await AxiosPrivate.get(`/personnel/${route}?${searchParamsUrl}`);

      const status = searchParamsUrl.get('status') ?? Status.ACTIVE;
      const isPending = status === Status.PENDING;

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

      count !== tabCount && setTabCount(count);
      setColumns(isPending ? pendingColumns[route] : activeCols[route]);
      setRows(rows);
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
  }, [searchParamsUrl]);

  const tabs = useMemo(() => {
    return [
      {
        label: StatusNames.ACTIVE,
        value: Status.ACTIVE,
        count: tabCount?.[Status.ACTIVE],
      },
      {
        label: StatusNames.INACTIVE,
        value: Status.INACTIVE,
        count: tabCount?.[Status.INACTIVE],
      },
      {
        label: 'Pending Approval',
        value: Status.PENDING,
        count: tabCount?.[Status.PENDING],
      },
    ];
  }, [tabCount]);

  return {
    changeTab: (index: number) => setSelectedTabIndex(index),
    totalRows: tabs?.[selectedTabIndex].count ? tabs[selectedTabIndex].count : 0,
    currentPage: parseInt(searchParamsUrl.get('page') ?? '1'),
    rowsPerPage: parseInt(searchParamsUrl.get('rows') ?? '25'),
    rows,
    loading,
    tabs,
    selectedTab: selectedTabIndex,
    columns,
  };
};
