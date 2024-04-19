import { useState } from 'react';
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
import {
  BUTTON_GROUP_SELECTED_CLASS,
  BUTTON_GROUP_UNSELECTED_CLASS,
  calendarClass,
} from '@/components/filters/classes';
import { DatePickerHeader } from '@/components/filters/date-picker/DatePickerHeader';
import type { AvailabilityInterface, AvailabilityRange } from '../dashboard';
import { AvailabilityType } from '@/common';
import { EditConfirmContent } from '@/components/filters/EditConfirmationModal';
import { DeleteConfirmContent } from './DeleteConfirmationModal';
import { offsetTimezoneDate } from '@/utils';

const SchedulerPopUp = ({
  cell,
  editMode,
  onSave,
  onDelete,
}: {
  cell?: AvailabilityInterface;
  editMode: boolean;
  onSave: (availabilityRange: AvailabilityRange) => void;
  onDelete: (availabilityRange: AvailabilityRange) => void;
}) => {
  const [range, setRange] = useState<DateRange | undefined>({
    from: cell?.groupStartDate
      ? offsetTimezoneDate(cell.groupStartDate)
      : new Date(),

    to: cell?.groupEndDate ? offsetTimezoneDate(cell.groupEndDate) : new Date(),
  });
  const [selectedStatus, setSelectedStatus] = useState<AvailabilityType>(
    cell?.availabilityType ?? AvailabilityType.AVAILABLE,
  );
  const [deploymentCode, setDeploymentCode] = useState(cell?.deploymentCode ?? '');
  const [fromInput, setFromInput] = useState(
    cell?.groupStartDate ?? dayjs().format('YYYY-MM-DD'),
  );
  const [toInput, setToInput] = useState(
    cell?.groupEndDate ?? dayjs().format('YYYY-MM-DD'),
  );
  const [fromError, setFromError] = useState(false);
  const [toError, setToError] = useState(false);
  const [confirmModal, setConfirmModal] = useState<'DELETE' | 'EDIT' | null>(null);

  const saveDates = () => {
    const fromDay = dayjs(range?.from);
    const toDay = dayjs(range?.to ?? range?.from);
    const availabilityRange: AvailabilityRange = {
      from: fromDay.format('YYYY-MM-DD'),
      to: toDay.format('YYYY-MM-DD'),
      type: selectedStatus,
      deploymentCode: deploymentCode ?? '',
    };

    if (selectedStatus === cell?.availabilityType) {
      onDelete({
        from: dayjs(cell.groupStartDate).format('YYYY-MM-DD'),
        to: dayjs(range?.from).format('YYYY-MM-DD'),
        type: AvailabilityType.NOT_INDICATED,
      });
      onDelete({
        from: dayjs(range?.to).format('YYYY-MM-DD'),
        to: dayjs(cell.groupEndDate).format('YYYY-MM-DD'),
        type: AvailabilityType.NOT_INDICATED,
      });
    }
    onSave(availabilityRange);
  };

  const deleteDates = () => {
    if (!cell?.groupStartDate || !cell?.groupEndDate) {
      // Logic is off if this case happens, as delete should only be clickable if this is an edit
      return;
    }
    const availabilityRange: AvailabilityRange = {
      from: cell.groupStartDate,
      to: cell.groupEndDate,
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

  const onChangeDatePicker = (dates: DateRange | undefined) => {
    setRange({ to: dates?.to, from: dates?.from });
    setFromInput(dates?.from ? dayjs(dates?.from).format('YYYY-MM-DD') : '');
    setToInput(dates?.to ? dayjs(dates?.to).format('YYYY-MM-DD') : '');
  };

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
          onSelect={onChangeDatePicker}
          showOutsideDays
          defaultMonth={
            cell?.groupStartDate
              ? offsetTimezoneDate(cell?.groupStartDate)
              : new Date()
          }
          captionLayout="dropdown-buttons"
          className="border-0 w-[275px]"
          classNames={calendarClass}
          components={{
            Caption: (props: CaptionProps) => (
              <DatePickerHeader
                {...props}
                hideResetButton={true}
                onChange={onChangeDatePicker}
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
          {confirmModal === 'DELETE' && (
            <DeleteConfirmContent
              confirmAction={confirmAction}
              handleConfirmModal={() => setConfirmModal(null)}
            />
          )}
          {confirmModal === 'EDIT' && (
            <EditConfirmContent
              confirmAction={confirmAction}
              handleConfirmModal={() => setConfirmModal(null)}
            />
          )}
        </DialogBody>
      </Dialog>
    </div>
  );
};

export default SchedulerPopUp;
