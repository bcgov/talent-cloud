import { Loading, TableFooterNav, TableFooterPageSelect } from '@/components';
import { Transition } from '@headlessui/react';
import { useSupervisorDashboard } from '@/hooks/useSupervisorDashboard';
import { SupervisorDashboardHeaderBanner } from './SupervisorDashboardHeader';
import { BannerType } from '@/common/enums/banner-enum';
import { useRecommitmentCycle } from '@/hooks/useRecommitment';
import { datePST } from '@/utils';
import { SupervisorTable } from './SupervisorTable';
import { Banner } from '@/components/ui/Banner';

const SupervisorDashboard = () => {
  const {
    totalRows,
    currentPage,
    rowsPerPage,
    rows,
    loading,
    handleChangePage,
    columns,
    showSuccessMessage,
    showWarningBanner,
    handleShowSuccessBanner,
    handleShowWarningBanner,
  } = useSupervisorDashboard();

  const { recommitmentCycle } = useRecommitmentCycle();

  if (loading) return <Loading />;

  return (
    <div className="xl:px-32">
      {recommitmentCycle && (
        <SupervisorDashboardHeaderBanner
          recommitmentDate={datePST(new Date(recommitmentCycle.endDate)) ?? ''}
          recommitmentYear={recommitmentCycle?.year ?? ''}
        />
      )}

      <Transition
        show={showSuccessMessage}
        appear={true}
        enter="ease-in-out duration-300"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="ease-in-out duration-300"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="pt-12">
          <Banner
            onClose={() => handleShowSuccessBanner(false)}
            title={'Supervisor Decision for Recommitment Successfully Submitted'}
            content={
              'Thank you for your submission. Your employee and their coordinator will be notified. If approved, You’ll be informed if they are called for deployment to provide approval.'
            }
            type={BannerType.SUCCESS}
          />
        </div>
      </Transition>

      <Transition
        show={showWarningBanner}
        appear={true}
        enter="ease-in duration-300"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="ease-out duration-300"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="pt-12">
          <Banner
            onClose={() => handleShowWarningBanner(false)}
            content={
              'Approved (“YES”) recommitment requests cannot be undone. If you have previously declined a recommitment request and wish to change your decision, please do so within the next 5 days.'
            }
            title={'Approval Action Cannot be Undone'}
            type={BannerType.WARNING}
          />
        </div>
      </Transition>

      <div className="w-full py-4 pt-16">
        <h6 className="font-bold text-left ">Pending Member List</h6>
      </div>
      <SupervisorTable rows={rows} columns={columns} />

      <div className="flex flex-row justify-between p-4 w-full">
        <TableFooterPageSelect
          options={[5, 10, 15]}
          totalRows={totalRows}
          rowsPerPage={rowsPerPage}
          handleChangeNumRows={(e: React.ChangeEvent<any>) =>
            handleChangePage('rows', e.target.value)
          }
        />

        <TableFooterNav
          totalRows={totalRows}
          rowsPerPage={rowsPerPage}
          currentPage={currentPage}
          handleChangePage={(page: number) =>
            handleChangePage('page', page.toString())
          }
        />
      </div>
    </div>
  );
};

export default SupervisorDashboard;
