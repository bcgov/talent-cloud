import { useEffect, useState } from 'react';

import type { CaptionProps, DateRange } from 'react-day-picker';
import { DayPicker } from 'react-day-picker';
import {
  ButtonGroup,
  Button,
  Dialog,
  DialogBody,
  Input,
} from '@material-tailwind/react';
import dayjs from 'dayjs';
import { calendarClass } from '@/components/filters/classes';
import { DatePickerHeader } from '@/components/filters/date-picker/DatePickerHeader';
import type { AvailabilityRange } from '../dashboard';
import { AvailabilityType } from '@/common';
import { offsetTimezoneDate } from '@/utils';

const SchedulerPopUp = ({
  editedFrom,
  editedTo,
  editedAvailabilityType,
  editedDeploymentCode,
  editMode,
  onSave,
}: {
  editedFrom?: string;
  editedTo?: string;
  editedAvailabilityType?: AvailabilityType;
  editedDeploymentCode?: string;
  editMode: boolean;
  onSave: (dates: AvailabilityRange) => void;
}) => {
  const [range, setRange] = useState<DateRange | undefined>({
    from: editedFrom ? offsetTimezoneDate(editedFrom) : new Date(),
    to: editedTo ? offsetTimezoneDate(editedTo) : new Date(),
  });
  const [selectedStatus, setSelectedStatus] = useState<AvailabilityType>(
    editedAvailabilityType ?? AvailabilityType.AVAILABLE,
  );
  const [deploymentCode, setDeploymentCode] = useState(editedDeploymentCode ?? '');
  const [fromInput, setFromInput] = useState(
    editedFrom ?? dayjs().format('YYYY-MM-DD'),
  );
  const [fromError, setFromError] = useState(false);
  const [toInput, setToInput] = useState(editedTo ?? dayjs().format('YYYY-MM-DD'));
  const [toError, setToError] = useState(false);
  const [confirmModal, setConfirmModal] = useState<'DELETE' | 'EDIT' | null>(null);

  const BUTTON_GROUP_SELECTED_CLASS =
    'bg-primaryBlue text-white capitalize hover:bg-primaryBlue';
  const BUTTON_GROUP_UNSELECTED_CLASS = 'capitalize hover:bg-white';

  const saveDates = () => {
    const fromDay = dayjs(range?.from);
    const toDay = dayjs(range?.to ?? range?.from);
    const availabilityRange: AvailabilityRange = {
      from: fromDay.format('YYYY-MM-DD'),
      to: toDay.format('YYYY-MM-DD'),
      type: selectedStatus,
    };
    if (deploymentCode.length) {
      availabilityRange.deploymentCode = deploymentCode;
    }
    if (dayjs(editedFrom).isBefore(fromDay, 'date')) {
      availabilityRange.removeFrom = editedFrom;
    }
    if (dayjs(editedTo).isAfter(toDay, 'date')) {
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
      type: AvailabilityType.NOT_INDICATED,
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
    } else if (confirmModal === 'EDIT') {
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

  const EditConfirmContent = () => (
    <div className="py-4 px-4">
      <p className="font-bold text-lg">Update availability in Calendar?</p>
      <p className="pt-2">
        Modifying availability within a currently selected date range resets the
        entire selection. This action replaces previous availability once changes are
        saved.
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
          Confirm Update
        </Button>
      </div>
    </div>
  );

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

  return (
    <div className="grid grid-cols-2">
      <div className="">
        <div>
          <span className="text-sm text-black font-bold">
            Task No. / Resource Request No.
          </span>
          <Input
            variant="static"
            label="Task No. / Resource Request No."
            placeholder="Use for deployments only"
            crossOrigin={''}
            labelProps={{
              className: 'hidden',
            }}
            defaultValue={deploymentCode}
            onBlur={(codeInput) => setDeploymentCode(codeInput.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 pt-4 gap-8">
          <div>
            <span className="text-sm text-black font-bold">Start Date</span>
            <Input
              variant="static"
              value={fromInput}
              onChange={(e) => setFromInput(e.target.value)}
              onBlur={(e) => fromToOnBlur(e.target.value, 'from')}
              crossOrigin={''}
              error={fromError}
              containerProps={{
                className: 'min-w-px',
              }}
            />
          </div>
          <div>
            <span className="text-sm text-black font-bold">End Date</span>
            <Input
              variant="static"
              value={toInput}
              onChange={(e) => setToInput(e.target.value)}
              onBlur={(e) => fromToOnBlur(e.target.value, 'to')}
              error={toError}
              crossOrigin={''}
              containerProps={{
                className: 'min-w-px',
              }}
              labelProps={{
                className: 'hidden',
              }}
            />
          </div>
        </div>
        <div className="pt-6">
          <ButtonGroup
            placeholder={''}
            fullWidth={true}
            ripple={false}
            variant="text"
            className="border-2 border-gray-50 divide-gray-50"
          >
            <Button
              placeholder={''}
              className={
                selectedStatus === AvailabilityType.AVAILABLE
                  ? BUTTON_GROUP_SELECTED_CLASS
                  : BUTTON_GROUP_UNSELECTED_CLASS
              }
              onClick={() => setSelectedStatus(AvailabilityType.AVAILABLE)}
            >
              Available
            </Button>
            <Button
              placeholder={''}
              className={
                selectedStatus === AvailabilityType.UNAVAILABLE
                  ? BUTTON_GROUP_SELECTED_CLASS
                  : BUTTON_GROUP_UNSELECTED_CLASS
              }
              onClick={() => setSelectedStatus(AvailabilityType.UNAVAILABLE)}
            >
              Unvailable
            </Button>
            <Button
              placeholder={''}
              className={
                selectedStatus === AvailabilityType.DEPLOYED
                  ? BUTTON_GROUP_SELECTED_CLASS
                  : BUTTON_GROUP_UNSELECTED_CLASS
              }
              onClick={() => setSelectedStatus(AvailabilityType.DEPLOYED)}
            >
              Deployed
            </Button>
          </ButtonGroup>
        </div>
        <div className="pt-6 flex flex-row w-full gap-4">
          {editMode && (
            <div className="basis-1/2">
              <Button
                placeholder={''}
                className="w-full"
                variant="text"
                onClick={() => {
                  setConfirmModal('DELETE');
                }}
                disabled={fromError || toError}
              >
                Delete Availability
              </Button>
            </div>
          )}
          <div className={editMode ? 'basis-1/2' : 'basis-full'}>
            <Button
              placeholder={''}
              className="w-full bg-primaryBlue"
              onClick={() => {
                setConfirmModal('EDIT');
              }}
              disabled={fromError || toError}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <DayPicker
          mode="range"
          selected={range}
          onSelect={setRange}
          showOutsideDays
          defaultMonth={editedFrom ? offsetTimezoneDate(editedFrom) : new Date()}
          captionLayout="dropdown-buttons"
          className="border-0 w-[275px]"
          classNames={calendarClass}
          components={{
            Caption: (props: CaptionProps) => (
              <DatePickerHeader
                {...props}
                hideResetButton={true}
                onChange={setRange}
              />
            ),
          }}
        />
      </div>
      <Dialog
        open={!!confirmModal}
        handler={() => {}}
        title={'Confirm'}
        placeholder={''}
        size="sm"
      >
        <DialogBody placeholder={''}>
          {confirmModal === 'DELETE' && <DeleteConfirmContent />}
          {confirmModal === 'EDIT' && <EditConfirmContent />}
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default SchedulerPopUp;
