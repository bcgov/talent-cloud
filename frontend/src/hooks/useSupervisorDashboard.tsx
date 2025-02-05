import { useState, useEffect } from 'react';
import { type Personnel } from '@/common';
import { useAxios } from './useAxios';
import { useSearchParams } from 'react-router-dom';
import { RecommitmentStatusChip } from '@/components/supervisor/RecommitmentStatusChip';
import { SupervisorApprovalForm } from '@/pages/supervisor/SupervisorApprovalForm';

export const useSupervisorDashboard = () => {
  const { AxiosPrivate } = useAxios();

  const [searchParams, setSearchParams] = useSearchParams({
    rows: '5',
    page: '1',
  });
  const [refetch, setRefetch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  const [rows, setRows] = useState<
    { key: string; memberName: string; programs: any[] }[]
  >([]);

  const [showSuccessMessage, setShowSuccessBanner] = useState(false);

  const [showWarningBanner, setShowWarningBanner] = useState(true);

  const handleShowSuccessBanner = (banner: boolean) => {
    setShowSuccessBanner(banner);
  };

  const handleRefetch = () => {
    setRefetch(!refetch);
  };

  const handleShowWarningBanner = () => {
    setShowWarningBanner(!showWarningBanner);
  };

  const handleChangePage = (name: string, value: string) => {
    searchParams.set(name, value);
    setSearchParams({ ...Object.fromEntries(searchParams) });
  };

  const getData = async () => {
    if (rows.length === 0) {
      searchParams.set('page', '1');
      setSearchParams({ ...Object.fromEntries(searchParams) });
    }

    try {
      const {
        data: { personnel, count },
      } = await AxiosPrivate.get(`/supervisor/personnel?${searchParams}`);

      const rows = personnel.map((person: Personnel) => ({
        key: person.id,
        memberName: `${person.firstName} ${person.lastName}`,
        programs: person?.recommitment?.map((itm) => ({
          employeeId: person.employeeId,
          year: itm.year,
          program: itm.program.toUpperCase(),
          status: <RecommitmentStatusChip status={itm.status} />,
          select: (
            <SupervisorApprovalForm
              year={itm.year}
              memberId={person.paylistId ?? ''}
              personnelId={person.id}
              status={itm.status}
              program={itm.program}
              handleShowSuccessBanner={handleShowSuccessBanner}
              handleRefetch={handleRefetch}
              name={`${person.firstName} ${person.lastName}`}
            />
          ),
        })),
      }));

      setCount(count);
      setRows(rows);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [searchParams, refetch]);

  return {
    totalRows: count,
    currentPage: parseInt(searchParams.get('page') ?? '1'),
    rowsPerPage: parseInt(searchParams.get('rows') ?? '25'),
    rows,
    loading,
    columns: [
      { key: 'memberName', label: 'Member Name' },
      { key: 'employeeId', label: 'Employee ID' },
      { key: 'year', label: 'Recommitment Year' },
      { key: 'program', label: 'CORE Program' },
      { key: 'status', label: 'Recommitment Status' },
      { key: 'select', label: 'Supervisor Approval' },
    ],
    setLoading: (loading: boolean) => setLoading(loading),
    handleChangePage,
    showSuccessMessage,
    showWarningBanner,
    handleShowSuccessBanner,
    handleShowWarningBanner,
  };
};
