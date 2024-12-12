import { useState, useEffect } from 'react';
import { Program, type Personnel } from '@/common';
import { useAxios } from './useAxios';
import { useSearchParams } from 'react-router-dom';
import { ApprovalCell } from '../components/supervisor/ApprovalCell';
import { RecommitmentStatusChip } from '@/components/supervisor/RecommitmentStatusChip';

export const useSupervisorDashboard = () => {
  const { AxiosPrivate } = useAxios();

  const [loading, setLoading] = useState(false);

  const [count, setCount] = useState(0);

  const [showSuccessMessage, setShowSuccessBanner] = useState(false);

  const [showWarningBanner, setShowWarningBanner] = useState(true);

  const handleShowSuccessBanner = (banner?: boolean) => {
    setShowSuccessBanner(banner ?? !showSuccessMessage);
  };

  const handleShowWarningBanner = (banner?: boolean) => {
    setShowWarningBanner(banner ?? !showWarningBanner);
  };

  const [searchParamsUrl, setSearchUrlParams] = useSearchParams({
    rows: '5',
    page: '1',
  });

  const handleChangePage = (name: string, value: string) => {
    searchParamsUrl.set(name, value);
    setSearchUrlParams(searchParamsUrl);
  };

  const [rows, setRows] = useState<
    { key: string; memberName: string; bcws?: any; emcr?: any }[]
  >([]);

  const getData = async () => {
    try {
      setLoading(true);

      const {
        data: { personnel, count },
      } = await AxiosPrivate.get(`/supervisor/personnel?${searchParamsUrl}`);

      setCount(count);

      const splitPersonnel = personnel.map((person: Personnel) => ({
        key: person.id,
        memberName: `${person.firstName} ${person.lastName}`,
        bcws: person.bcws
          ? {
              name: `${person.firstName} ${person.lastName}`,
              employeeId: person.employeeId,
              year: person.recommitment?.recommitmentCycle?.year,
              program: 'BCWS',
              status: person.recommitment?.bcws && (
                <RecommitmentStatusChip status={person.recommitment.bcws} />
              ),
              approval: person?.recommitment?.bcws && (
                <ApprovalCell
                  personnel={person}
                  program={Program.BCWS}
                  handleShowSuccessBanner={handleShowSuccessBanner}
                  handleShowWarningBanner={handleShowWarningBanner}
                  year={person.recommitment?.recommitmentCycle?.year}
                />
              ),
            }
          : null,

        emcr: person.emcr
          ? {
              name: `${person.firstName} ${person.lastName}`,
              employeeId: person.employeeId,
              year: person.recommitment?.recommitmentCycle?.year,
              program: 'EMCR',
              status: person.recommitment?.emcr && (
                <RecommitmentStatusChip status={person.recommitment.emcr} />
              ),
              approval: person?.recommitment?.emcr && (
                <ApprovalCell
                  personnel={person}
                  program={Program.EMCR}
                  handleShowSuccessBanner={handleShowSuccessBanner}
                  handleShowWarningBanner={handleShowWarningBanner}
                  year={person.recommitment?.recommitmentCycle?.year}
                />
              ),
            }
          : null,
      }));

      setRows(splitPersonnel);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [searchParamsUrl, showSuccessMessage]);

  return {
    totalRows: count,
    currentPage: parseInt(searchParamsUrl.get('page') ?? '1'),
    rowsPerPage: parseInt(searchParamsUrl.get('rows') ?? '25'),
    rows,
    loading,
    columns: [
      { key: 'memberName', label: 'Member Name' },
      { key: 'employeeId', label: 'Employee ID' },
      { key: 'year', label: 'Recommitment Year' },
      { key: 'program', label: 'CORE Program' },
      { key: 'status', label: 'Recommitment Status' },
      { key: 'approval', label: 'Supervisor Approval' },
    ],
    setLoading: (loading: boolean) => setLoading(loading),
    handleChangePage,
    showSuccessMessage,
    showWarningBanner,
    handleShowSuccessBanner,
    handleShowWarningBanner,
  };
};
