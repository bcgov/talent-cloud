import { SchedulerRow } from './SchedulerRow';
import {
  MemberSchedulerControl,
  MemberSchedulerHeader,
  MemberSchedulerKey,
  MemberSchedulerPopUp,
} from './';
import dayjs from 'dayjs';
import useAvailability from '@/hooks/useAvailability';
import { DialogUI } from '@/components/ui';
import { useSchedulerDialog } from '@/hooks/useSchedulerDialog';
import { AvailabilityConfirmation } from '@/hooks/AvailabilityConfirmation';
import { useEffect } from 'react';
import { format } from 'date-fns';

export const MemberScheduler = ({
  personnelId,
  openConfirmAvailability,
  showConfirmAvailability,
  handleShowSuccessConfirmationBanner,
  handleShowConfirmationWarningBanner,
  memberConfirmedUntil,
}: {
  personnelId: string;
  openConfirmAvailability: () => void;
  showConfirmAvailability: boolean;
  handleShowSuccessConfirmationBanner: () => void;
  handleShowConfirmationWarningBanner: (show: boolean) => void;
  memberConfirmedUntil?: Date;
}) => {
  const {
    availability,
    getAvailability,
    saveConfirmedUntil,
    schedulerRows,
    availabilityQuery,
    saveAvailability,
    onChangeAvailabilityQuery,
  } = useAvailability({
    personnelId,
  });

  const {
    handleSchedulerOpen,
    schedulerDialogOpen,
    editCell,
    getEditDialogTitle,
    cellClick,
  } = useSchedulerDialog();

  const handleConfirmAvailability = async (date: Date) => {
    await saveConfirmedUntil(date);
    openConfirmAvailability();
    handleShowSuccessConfirmationBanner();
    getAvailability(availabilityQuery.from, format(date, 'yyyy-MM-dd'));
  };

  useEffect(() => {
    if (!memberConfirmedUntil) {
      handleShowConfirmationWarningBanner(true);
    }
    if (
      memberConfirmedUntil &&
      new Date(memberConfirmedUntil) > new Date(availabilityQuery.to)
    ) {
      handleShowConfirmationWarningBanner(false);
    }
    if (
      memberConfirmedUntil &&
      new Date(memberConfirmedUntil) < new Date(availabilityQuery.to)
    ) {
      handleShowConfirmationWarningBanner(true);
    }
  }, [
    schedulerRows,
    availability,
    availabilityQuery,
    memberConfirmedUntil,
    showConfirmAvailability,
  ]);

  return (
    <>
      <section className="bg-white">
        <MemberSchedulerControl
          onChangeAvailabilityDates={onChangeAvailabilityQuery}
        />
        <MemberSchedulerHeader />

        {schedulerRows &&
          Object.keys(schedulerRows).map((month) => (
            <SchedulerRow
              key={month}
              year={dayjs(schedulerRows[month][0].date).format('YYYY')}
              month={month}
              data={schedulerRows[month]}
              cellClick={(date) => cellClick(date, availability)}
            />
          ))}

        <MemberSchedulerKey />
      </section>
      <DialogUI
        open={schedulerDialogOpen}
        onClose={handleSchedulerOpen}
        handleOpen={handleSchedulerOpen}
        title={getEditDialogTitle()}
        style=""
      >
        <MemberSchedulerPopUp
          editedFrom={editCell?.from}
          editedTo={editCell?.to}
          editedAvailabilityType={editCell?.availabilityType}
          min={editCell?.min}
          max={editCell?.max}
          onCancel={handleSchedulerOpen}
          onSave={(props) => {
            saveAvailability(props);
            handleSchedulerOpen();
          }}
        />
      </DialogUI>
      <DialogUI
        open={showConfirmAvailability}
        onClose={openConfirmAvailability}
        handleOpen={openConfirmAvailability}
        title={'Confirm Availability'}
        style="sm:w-3/4 md:w-1/2 xl:w-1/3"
      >
        <AvailabilityConfirmation
          availabilityQuery={availabilityQuery}
          openConfirmAvailability={openConfirmAvailability}
          handleConfirmAvailability={handleConfirmAvailability}
        />
      </DialogUI>
    </>
  );
};
