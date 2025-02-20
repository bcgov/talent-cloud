// react
import { useState } from 'react';

// hooks
import { useRecommitmentCycle } from '@/hooks/useRecommitment';
import { useRoleContext } from '@/providers';
import { useTable } from '@/hooks';

// common
import { Filters, Role } from '@/common';
import { Status } from '@/common';
import { ActiveRecommitmentStatusFilter, InactiveRecommitmentStatusFilter  } from '@/common/enums/recommitment-status';

// ui
import {
  DialogUI,
  Table,
  TableFooterNav,
  TableFooterPageSelect,
  Tabs,
} from '@/components';
import { DashboardFilters } from './DashboardFilters';
import { MemberStatusGuide } from './MemberStatusGuide';
import { RecommitmentDashBanner } from '@/components/profile/banners/RecommitmentDashBanner';
import { StatusFilter } from '@/components/filters/StatusFilter';
import { button as buttonClass } from '@/components/ui/classes';

// icons
import { QuestionMarkCircleIcon } from '@heroicons/react/24/solid';

const Dashboard = () => {
  const { recommitmentCycle, isRecommitmentCycleOpen } = useRecommitmentCycle();
  const [showDescriptionsModal, setShowDescriptionsModal] = useState(false);
  const { program, roles } = useRoleContext();

  const {
    totalRows,
    rowsPerPage,
    currentPage,
    tabs,
    rows,
    columns,
    loading,
    setLoading,
    searchParams,
    setSearchParams,
    resetParams,
    handleChangeSearch,
    searchInputValue,
  } = useTable(program);

  return (
    <>
      <div className="xl:px-32 xl:pt-8 pb-24">
        {recommitmentCycle && (
          <RecommitmentDashBanner
            recommitment={recommitmentCycle}
            isRecommitmentCycleOpen={isRecommitmentCycleOpen ?? false}
          />
        )}
        <h1 className="pt-16 text-left font-bold">Personnel</h1>
        <DashboardFilters
          searchParams={searchParams}
          setSearchParams={setSearchParams}
          program={program}
          resetParams={resetParams}
          handleChangeSearch={handleChangeSearch}
          searchInputValue={searchInputValue}
        />
        <div className="overflow-x-scroll border border-slate-500 rounded-md">
          <div className="mt-2  bg-white w-full">
            <div className="text-left py-8  caption-top bg-white">
              <h4 className="font-bold px-4">Search Results</h4>
            </div>
            <div className="flex flex-row items-center w-full justify-between pr-6">
              {roles && roles.includes(Role.COORDINATOR) && (
                <Tabs
                  tabs={tabs}
                  changeTab={(value: unknown) => {
                    searchParams.delete(Filters.AVAILABLE_STATUS);
                    searchParams.set(Filters.STATUS, value as Status);
                    setSearchParams({ ...Object.fromEntries(searchParams) });
                    !loading && setLoading(true);
                  }}
                />
              )}
              {roles && roles.includes(Role.COORDINATOR) && (
                <button
                  onClick={() => setShowDescriptionsModal(!showDescriptionsModal)}
                  className={buttonClass.tertiaryButton}
                >
                  <span className="flex flex-row items-center justify-center space-x-2 font-bold">
                    {' '}
                    <QuestionMarkCircleIcon className="w-6" />
                    <p className="font-bold text-white">Member Status Guide</p>
                  </span>
                </button>
              )}
            </div>
            {searchParams.get(Filters.STATUS) !== Status.PENDING && (
              <StatusFilter
                statusFilter={searchParams.get(Filters.STATUS) && searchParams.get(Filters.STATUS) === Status.ACTIVE ? ActiveRecommitmentStatusFilter : InactiveRecommitmentStatusFilter}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
            )}
            <Table rows={rows} columns={columns} loading={loading} auto={true} />

            <div className="flex flex-row justify-between p-4">
              <TableFooterPageSelect
                totalRows={totalRows}
                rowsPerPage={rowsPerPage}
                handleChangeNumRows={(e: React.ChangeEvent<any>) => {
                  searchParams.set(Filters.ROWS, e.target.value);
                  setSearchParams({ ...Object.fromEntries(searchParams) });
                }}
              />

              <TableFooterNav
                totalRows={totalRows}
                rowsPerPage={rowsPerPage}
                currentPage={currentPage}
                handleChangePage={(page: number) => {
                  searchParams.set(Filters.PAGE, page.toString());
                  setSearchParams({ ...Object.fromEntries(searchParams) });
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <DialogUI
        open={showDescriptionsModal}
        onClose={() => setShowDescriptionsModal(!showDescriptionsModal)}
        handleOpen={() => setShowDescriptionsModal(!showDescriptionsModal)}
        title={'Member Status Guide'}
      >
        <MemberStatusGuide />
      </DialogUI>
    </>
  );
};

export default Dashboard;
