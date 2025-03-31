// react
import { useState } from 'react';

// hooks
import { useRecommitmentCycle } from '@/hooks/useRecommitment';
import { useRoleContext } from '@/providers';
import { useTable } from '@/hooks';

// common
import { ButtonTypes, Filters, Program, Role } from '@/common';
import { Status } from '@/common';
import {
  ActiveRecommitmentStatusFilter,
  InactiveRecommitmentStatusFilter,
} from '@/common/enums/recommitment-status';

// ui
import {
  Button,
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
import { useExportToCSV } from '@/hooks/useExportToCSV';

const DownloadModal = ({
  program,
  onClose,
}: {
  program: Program;
  onClose: () => void;
}) => {
  const [downloadName, setDownloadName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { csvExport } = useExportToCSV();

  const downloadClick = async () => {
    setSubmitting(true);
    try {
      const csvReceipt = await csvExport(program);
      const url = window.URL.createObjectURL(new Blob([csvReceipt]));
      const link = document.createElement('a');
      link.href = url;
      link.download =
        program?.toString().toUpperCase() + ' - ' + downloadName + '.csv';
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (e) {
      console.log(e);
    } finally {
      setSubmitting(false);
      setDownloadName('');
      onClose();
    }
  };

  return (
    <div className="max-w-3xl px-8 pb-8 flex flex-col itmes-center justify-between space-y-8">
      <div>Export all active and inactive members, as well as applicants pending approval, to a CSV file.</div>

      <input
        disabled={submitting}
        id="memberDownload"
        type="text"
        placeholder="Enter a filename for your CSV download..."
        value={submitting ? 'Please wait...' : downloadName}
        onChange={(e) => setDownloadName(e.target.value)}
      />
      <div className="flex flex-row items-start justify-right space-x-2 pt-4">
      <Button
          variant={ButtonTypes.SECONDARY}
          text={'Cancel'}
          disabled={submitting}
          onClick={onClose}
        />
        <Button
          loading={submitting}
          variant={ButtonTypes.SOLID}
          text={'Download CSV'}
          disabled={!downloadName || submitting}
          onClick={downloadClick}
        />
      </div>
    </div>
  );
};
const Dashboard = () => {
  const { recommitmentCycle, isRecommitmentCycleOpen } = useRecommitmentCycle();
  const [showDescriptionsModal, setShowDescriptionsModal] = useState(false);
  const { program, roles } = useRoleContext();
  const { csvExport } = useExportToCSV();
  const [ dlButtonText, setDlButtonText ] = useState('Downloading All Members');
  const [ dlDisabled, setDlDisabled ] = useState(false);

  const [showDownloadModal, setShowDownloadModal] = useState(false);

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
                  // disabled={dlDisabled}
                  onClick={() => setShowDownloadModal(true)}
                  className={buttonClass.secondaryButton}
                >
                  <p className="font-bold text-black ">Export All</p>
                </button>
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
                statusFilter={
                  searchParams.get(Filters.STATUS) &&
                  searchParams.get(Filters.STATUS) === Status.ACTIVE
                    ? ActiveRecommitmentStatusFilter
                    : InactiveRecommitmentStatusFilter
                }
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
      {program && (
        <DialogUI
          open={showDownloadModal}
          onClose={() => setShowDownloadModal(!showDownloadModal)}
          handleOpen={() => setShowDownloadModal(!showDownloadModal)}
          title={'Export All'}
        >
          <DownloadModal
            program={program}
            onClose={() => setShowDownloadModal(!showDownloadModal)}
          />
        </DialogUI>
      )}
    </>
  );
};

export default Dashboard;