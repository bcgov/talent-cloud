import { useState } from 'react';

import type { CaptionProps, DateRange } from 'react-day-picker';
import { DayPicker } from 'react-day-picker';
import { ButtonGroup, Button, Input } from '@material-tailwind/react';
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
  onSave,
}: {
  editedFrom?: string;
  editedTo?: string;
  editedAvailabilityType?: AvailabilityType;
  editedDeploymentCode?: string;
  onSave: (dates: AvailabilityRange) => void;
}) => {
  const [range, setRange] = useState<DateRange | undefined>({
    from: editedFrom ? offsetTimezoneDate(editedFrom) : new Date(),
    to: editedTo ? offsetTimezoneDate(editedTo) : new Date(),
  });
  const [selectedStatus, setSelectedStatus] = useState<AvailabilityType>(
    editedAvailabilityType || AvailabilityType.AVAILABLE,
  );
  const [deploymentCode, setDeploymentCode] = useState(editedDeploymentCode || '');
  const [fromError, setFromError] = useState(false);
  const [toError, setToError] = useState(false);

  const BUTTON_GROUP_SELECTED_CLASS = 'bg-blue text-white capitalize hover:bg-blue';
  const BUTTON_GROUP_UNSELECTED_CLASS = 'capitalize hover:bg-white';

  const saveDates = () => {
    const fromDay = dayjs(range?.from);
    const toDay = dayjs(range?.to);
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

  // Setting the errors in from / to values when needed
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

  return (
    <div className="grid grid-cols-2">
      <div className="">
        <div>
          <span className="text-sm text-black font-bold">Activation Code</span>
          <Input
            variant="static"
            label="Activation Code"
            placeholder="If not a deployment, type 'available' or 'unavailable'"
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
              defaultValue={dayjs(range?.from).format('YYYY-MM-DD')}
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
              defaultValue={dayjs(range?.to).format('YYYY-MM-DD')}
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
        <div className="pt-6">
          <Button
            placeholder={''}
            className="w-full bg-blue"
            onClick={() => {
              saveDates();
            }}
            disabled={fromError || toError}
          >
            Save
          </Button>
        </div>
      </div>
      <div className="flex justify-center">
        <DayPicker
          mode="range"
          selected={range}
          onSelect={setRange}
          showOutsideDays
          captionLayout="dropdown-buttons"
          className="border-0 w-[275px]"
          classNames={calendarClass}
          components={{
            Caption: (props: CaptionProps) => (
              <DatePickerHeader
                {...props}
                startingDate={
                  editedFrom ? offsetTimezoneDate(editedFrom) : undefined
                }
                hideResetButton={true}
                onChange={setRange}
              />
            ),
          }}
        />
      </div>
    </div>
  );
};

export default SchedulerPopUp;
