import type { AvailabilityInterface } from '../dashboard';
import { AvailabilityType } from '@/common';
import {
  SCHEDULER_AVAILABLE_CLASS,
  SCHEDULER_AVAILABLE_START_CLASS,
  SCHEDULER_AVAILABLE_TEXT_CLASS,
  SCHEDULER_DEPLOYED_CLASS,
  SCHEDULER_DEPLOYED_START_CLASS,
  SCHEDULER_DEPLOYED_TEXT_CLASS,
  SCHEDULER_NOT_INDICATED_CLASS,
  SCHEDULER_NO_DATE_CLASS,
  SCHEDULER_UNAVAILABLE_CLASS,
  SCHEDULER_UNAVAILABLE_START_CLASS,
  SCHEDULER_UNAVAILABLE_TEXT_CLASS,
} from '@/utils';
import { Cell } from './SchedulerCell';
import { differenceInDays } from 'date-fns';
import { offsetTimezoneDate } from '@/utils';

const SchedulerRow = ({
  month,
  data,
  cellClick,
}: {
  month: string;
  data: AvailabilityInterface[];
  cellClick: (availability: AvailabilityInterface) => void;
}) => {
  return (
    <div className="grid grid-cols-32 border border-cyan-950">
      <div className="h-20 border-l border-cyan-950 bg-white text-xs font-bold pl-1 pt-2">
        {month}
      </div>
      {[...Array(32).keys()].slice(1).map((dayOfMonth, index) => {
        const availability: AvailabilityInterface = data[index];
        const availabilityType = availability?.availabilityType;
        const truncate = availability?.groupEndDate
          ? differenceInDays(
              offsetTimezoneDate(availability?.groupEndDate),
              offsetTimezoneDate(availability.date),
            ) < 2
          : false;
        if (!availability) {
          return (
            <Cell
              truncate={truncate}
              availability={availability}
              cellClass={SCHEDULER_NO_DATE_CLASS}
              key={dayOfMonth}
            />
          );
        }
        switch (availabilityType) {
          case AvailabilityType.DEPLOYED:
            return (
              <Cell
                availability={availability}
                cellClass={SCHEDULER_DEPLOYED_CLASS}
                startClass={SCHEDULER_DEPLOYED_START_CLASS}
                textClass={SCHEDULER_DEPLOYED_TEXT_CLASS}
                key={dayOfMonth}
                truncate={truncate}
                cellClick={() => cellClick(availability)}
              />
            );
          case AvailabilityType.AVAILABLE:
            return (
              <Cell
                availability={availability}
                cellClass={SCHEDULER_AVAILABLE_CLASS}
                startClass={SCHEDULER_AVAILABLE_START_CLASS}
                textClass={SCHEDULER_AVAILABLE_TEXT_CLASS}
                key={dayOfMonth}
                truncate={truncate}
                cellClick={() => cellClick(availability)}
              />
            );
          case AvailabilityType.UNAVAILABLE:
            return (
              <Cell
                availability={availability}
                cellClass={SCHEDULER_UNAVAILABLE_CLASS}
                startClass={SCHEDULER_UNAVAILABLE_START_CLASS}
                textClass={SCHEDULER_UNAVAILABLE_TEXT_CLASS}
                truncate={truncate}
                key={dayOfMonth}
                cellClick={() => cellClick(availability)}
              />
            );
          default:
            return (
              <Cell
                cellClass={SCHEDULER_NOT_INDICATED_CLASS}
                key={dayOfMonth}
                truncate={truncate}
                availability={{
                  ...availability,
                  availabilityType: AvailabilityType.NOT_INDICATED,
                }}
                cellClick={() => cellClick(availability)}
              />
            );
        }
      })}
    </div>
  );
};

export default SchedulerRow;
