import { Loading, Table, TableFooterNav, TableFooterPageSelect } from '@/components';
import { Transition } from '@headlessui/react';
import { useSupervisorDashboard } from '@/hooks/useSupervisorDashboard';
import { SupervisorDashboardHeaderBanner } from './SupervisorDashboardHeader';
import { BannerType } from '@/common/enums/banner-enum';
import { Banner } from '@/components/ui/Banner';
import { useRecommitmentCycle } from '@/hooks/useRecommitment';
import { datePST } from '@/utils';

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
    handleCloseSuccessBanner,
    handleCloseWarningBanner,
  } = useSupervisorDashboard();

  const { recommitmentCycle } = useRecommitmentCycle();

  if (loading) return <Loading />;

  return (
    <div className="xl:px-64">
      {recommitmentCycle && (
        <SupervisorDashboardHeaderBanner
          recommitmentDate={datePST(new Date(recommitmentCycle.endDate)) ?? ''}
          recommitmentYear={recommitmentCycle?.year ?? ''}
        />
      )}

      <div className="py-12">
        <Transition
          show={showSuccessMessage}
          appear={true}
          enter="ease-out duration-100"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
          // as={Banner}
          onClick={handleCloseSuccessBanner}
        >
          <div>
            <Banner
              onClose={handleCloseSuccessBanner}
              title={'Supervisor Approval for Recommitment Successfully Submitted'}
              content={
                'Thank you for approving [LAST, First]’s recommitment to [PROG]. Your employee and their coordinator will be notified. You’ll be informed if they are called for deployment to provide approval. For questions, contact us at [CORE email address].'
              }
              type={BannerType.SUCCESS}
            />
          </div>
        </Transition>

        <Transition
          show={showWarningBanner}
          appear={true}
          enter="ease-out duration-100"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
          onClick={handleCloseSuccessBanner}
        >
          <div>
            <Banner
              onClose={handleCloseWarningBanner}
              content={
                'Approved (“YES”) recommitment requests cannot be undone. If you have previously declined a recommitment request and wish to change your decision, please do so within the next 5 days.'
              }
              title={'Approval Action Cannot be Undone'}
              type={BannerType.WARNING}
            />
          </div>
        </Transition>
      </div>
      <div className="w-full py-4">
        <h6 className="font-bold text-left ">Pending Member List</h6>
      </div>
      <Table
        loading={loading}
        rows={rows ?? []}
        columns={columns ?? []}
        auto={false}
      />
      <div className="flex flex-row justify-between p-4 w-full">
        <TableFooterPageSelect
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
