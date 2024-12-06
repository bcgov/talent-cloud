import { useState, useEffect } from 'react';
import { type Personnel } from '@/common';
import { useAxios } from './useAxios';
import { useSearchParams } from 'react-router-dom';

export const useSupervisorDashboard = () => {
  const { AxiosPrivate } = useAxios();
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [showSuccessMessage, setShowSuccessBanner] = useState(false);
  const [showWarningBanner, setShowWarningBanner] = useState(true);
  const handleCloseSuccessBanner = () => {
    setShowSuccessBanner(false);
  };
  const handleCloseWarningBanner = () => {
    setShowWarningBanner(false);
  };
  const [searchParamsUrl, setSearchUrlParams] = useSearchParams({
    rows: '0',
    page: '1',
  });
  const handleChangePage = (key: string, value: any) => {
    setSearchUrlParams((prev: URLSearchParams) => ({
      ...Object.fromEntries([...prev]),
      [key]: value,
    }));
  };
  const [rows, setRows] = useState<Personnel[]>([]);

  const handleChange = async (key: string, value: string) => {
    try {
      setRows((prev) => ({
        ...prev,
        rows: prev.map((row: any) => ({
          ...row,
          cells: row.cells.map((cell: any) => {
            if (cell.key === key) {
              return {
                ...cell,
                value,
              };
            }
            return cell;
          }),
        })),
      }));
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (rowId: string, value: string) => {
    try {
      const res = await AxiosPrivate.patch(`/supervisor/personnel/${rowId}`, {
        supervisorApproval: value,
      });
      res && setShowSuccessBanner(true);
    } catch (e) {
      console.log(e);
    }
  };
  const getData = async () => {
    try {
      setLoading(true);
      const {
        data: { personnel, count },
      } = await AxiosPrivate.get(`/supervisor/personnel`);
      setCount(count);

      setRows(() =>
        personnel.map(({ id, ...personnel }: Personnel) => ({
          key: id,
          cells: [
            {
              key: 'Member Name',
              value: `${personnel.firstName} ${personnel.lastName}`,
              columnName: 'Member Name',
            },
            {
              key: 'Employee ID',
              value: personnel?.employeeId,
              columnName: 'Employee ID',
            },
            {
              key: 'Year',
              value: personnel.recommitment?.recommitmentCycleId?.year,
              columnName: 'Year',
            },
            {
              key: 'programType',
              value:
                personnel.bcws && !personnel.emcr
                  ? 'BCWS'
                  : personnel.emcr && !personnel.bcws
                    ? 'EMCR'
                    : 'BCWS and EMCR',
              columnName: 'Program Type',
            },
            {
              key: 'Supervisor Approval',
              value: '',
              columnName: 'Supervisor Approval',
              handleChange,
              options: ['Approve', 'Deny'],
            },
            {
              key: 'Submit',
              value: 'Submit',
              columnName: 'Submit',
              handleChange: handleSubmit,
            },
          ],
        })),
      );
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return {
    totalRows: count,
    currentPage: parseInt(searchParamsUrl.get('page') ?? '1'),
    rowsPerPage: parseInt(searchParamsUrl.get('rows') ?? '25'),
    rows,
    loading,
    columns: [
      'Member Name',
      'Employee ID',
      'Year',
      'Program Type',
      'Supervisor Approval',
      '',
    ],
    nestedColumns: [''],
    setLoading: (loading: boolean) => setLoading(loading),
    handleChangePage,
    showSuccessMessage,
    showWarningBanner,
    handleCloseSuccessBanner,
    handleCloseWarningBanner,
  };
};
