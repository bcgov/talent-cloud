import { useEffect, useState } from 'react';
import type { DateRange } from 'react-day-picker';
import { Button, Dialog, DialogBody, Input } from '@material-tailwind/react';
import dayjs from 'dayjs';
import { CalendarDaysIcon } from '@heroicons/react/24/solid';
import { Button as DialogButton } from '../../ui';
import type { AvailabilityRange } from '@/common';
import { AvailabilityType, ButtonTypes } from '@/common';
import { offsetTimezoneDate } from '@/utils';

export const MemberSchedulerPopUp = ({
  editedFrom,
  editedTo,
  editedAvailabilityType,
  min,
  max,
  onCancel,
  onSave,
}: {
  editedFrom?: string;
  editedTo?: string;
  editedAvailabilityType?: AvailabilityType | null;
  min?: string;
  max?: string;
  onCancel: () => void;
  onSave: (dates: AvailabilityRange) => void;
}) => {
  const [range, setRange] = useState<DateRange | undefined>({
    from: editedFrom ? offsetTimezoneDate(editedFrom) : undefined,
    to: editedTo ? offsetTimezoneDate(editedTo) : undefined,
  });
  const [fromInput, setFromInput] = useState(
    editedFrom ?? dayjs().format('YYYY-MM-DD'),
  );
  const [fromError, setFromError] = useState(false);
  const [toInput, setToInput] = useState(editedTo ?? dayjs().format('YYYY-MM-DD'));
  const [toError, setToError] = useState(false);
  const [confirmModal, setConfirmModal] = useState<'DELETE' | null>(null);

  const saveDates = () => {
    const fromDay = dayjs(range?.from);
    const toDay = dayjs(range?.to ?? range?.from);
    const availabilityRange: AvailabilityRange = {
      from: fromDay.format('YYYY-MM-DD'),
      to: toDay.format('YYYY-MM-DD'),
      type: AvailabilityType.UNAVAILABLE,
    };
    if (dayjs(editedFrom).isBefore(fromDay, 'date') && editedAvailabilityType) {
      availabilityRange.removeFrom = editedFrom;
    }
    if (dayjs(editedTo).isAfter(toDay, 'date') && editedAvailabilityType) {
      availabilityRange.removeTo = editedTo;
    }
    onSave(availabilityRange);
  };

  const deleteDates = () => {
    if (!editedFrom || !editedTo) {
      // Logic is off if this case happens, as delete should only be clickable if this is an edit
      return;
    }
    const availabilityRange: AvailabilityRange = {
      from: dayjs(editedFrom).format('YYYY-MM-DD'),
      to: dayjs(editedTo).format('YYYY-MM-DD'),
      type: null,
    };
    onSave(availabilityRange);
  };

  const fromToOnBlur = (value: string, key: string) => {
    const day = dayjs(value);
    if (!day.isValid()) {
      key === 'from' ? setFromError(true) : setToError(true);
    } else {
      key === 'from' ? setFromError(false) : setToError(false);
      const date = day.format('YYYY-MM-DD');
      key === 'from'
        ? setRange({ from: offsetTimezoneDate(date), to: range?.to })
        : setRange({ from: range?.from, to: offsetTimezoneDate(date) });
    }
    if (range?.from && range?.to) {
      if (range.from > range.to) {
        setFromError(true);
        setToError(true);
      }
    } else if (!range?.from) {
      setFromError(true);
    } else if (!range?.to) {
      setToError(true);
    }
  };

  const confirmAction = () => {
    setConfirmModal(null);
    if (confirmModal === 'DELETE') {
      deleteDates();
    } else {
      saveDates();
    }
  };

  useEffect(() => {
    if (range) {
      const fromDay = dayjs(range.from);
      const toDay = dayjs(range.to ?? range.from);
      if (fromDay.isAfter(toDay, 'day')) {
        setFromError(true);
        setToError(true);
      } else {
        setFromError(false);
        setToError(false);
        setFromInput(fromDay.format('YYYY-MM-DD'));
        setToInput(toDay.format('YYYY-MM-DD'));
      }
    } else {
      setFromError(true);
      setToError(true);
    }
  }, [range]);

  const DeleteConfirmContent = () => (
    <div className="py-4 px-4">
      <p className="font-bold text-lg">Delete availability from Calendar?</p>
      <p className="pt-2">
        Once an availability is deleted, the selected date range on the calendar will
        be reset to blank. You may need to reconfirm this member&apos;s availability
        for these dates later.
      </p>
      <div className="pt-12 flex justify-end">
        <Button
          aria-label="close"
          variant="text"
          className="text-sm text-primaryBlue underline normal-case cursor-pointer"
          onClick={() => setConfirmModal(null)}
          placeholder={''}
        >
          Cancel
        </Button>
        <Button
          aria-label="confirm"
          onClick={confirmAction}
          placeholder={''}
          className="normal-case bg-primaryBlue cursor-pointer"
        >
          Confirm Delete
        </Button>
      </div>
    </div>
  );

  const SetUnavailability = () => (
    <div className="grid grid-cols-2 gap-4 p-6 min-h-[300px] flex-grow">
      <div className="space-y-2">
        <label
          htmlFor="startDate"
          className="block text-sm font-medium text-gray-700"
        >
          Start Date
        </label>
        <div className="relative">
          <Input
            id="startDate"
            type="date"
            value={fromInput}
            onChange={(e) => {
              setFromInput(e.target.value);
              fromToOnBlur(e.target.value, 'from');
            }}
            min={min ?? editedFrom}
            max={max ?? editedTo}
            error={fromError}
            className="w-full"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
          End Date
        </label>
        <div className="relative">
          <Input
            id="endDate"
            type="date"
            value={toInput}
            onChange={(e) => {
              setToInput(e.target.value);
              fromToOnBlur(e.target.value, 'to');
            }}
            min={min ?? editedFrom}
            max={max ?? editedTo}
            error={toError}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
  const UnavailableForDeployment = () => (
    <div className="p-6 min-h-[200px] min-w-[350px] flex-grow">
      <div className="flex flex-row space-x-1">
        <CalendarDaysIcon className="h-4 w-4" />
        <p className="text-xs">
          {dayjs(editedFrom).format('MMM D')} - {dayjs(editedTo).format('MMM D')}
        </p>
      </div>
      {/* For DEPLOYED, add EMCR / BCWS here after feature is implemented */}
    </div>
  );

  return (
    <div className="flex flex-col">
      {editedAvailabilityType &&
        [AvailabilityType.AVAILABLE, AvailabilityType.NOT_INDICATED].includes(
          editedAvailabilityType,
        ) && <SetUnavailability />}
      {editedAvailabilityType &&
        [AvailabilityType.UNAVAILABLE, AvailabilityType.DEPLOYED].includes(
          editedAvailabilityType,
        ) && <UnavailableForDeployment />}
      <div className="flex flex-row space-x-6 py-4 justify-end px-8 border-t-2 border-defaultGray">
        <DialogButton
          variant={ButtonTypes.PRIMARY}
          type="button"
          onClick={onCancel}
          text={
            editedAvailabilityType === AvailabilityType.DEPLOYED ? 'Close' : 'Cancel'
          }
        />
        {editedAvailabilityType === AvailabilityType.UNAVAILABLE && (
          <DialogButton
            variant={ButtonTypes.PRIMARY}
            type="button"
            onClick={() => setConfirmModal('DELETE')}
            text="Delete"
          />
        )}
        {editedAvailabilityType &&
          [AvailabilityType.AVAILABLE, AvailabilityType.NOT_INDICATED].includes(
            editedAvailabilityType,
          ) && (
            <DialogButton
              variant={ButtonTypes.TERTIARY}
              type="button"
              onClick={confirmAction}
              text="Save"
            />
          )}
      </div>
      <Dialog open={!!confirmModal} handler={() => {}} title={'Confirm'} size="sm">
        <DialogBody>
          {confirmModal === 'DELETE' && <DeleteConfirmContent />}
        </DialogBody>
      </Dialog>
    </div>
  );
};
