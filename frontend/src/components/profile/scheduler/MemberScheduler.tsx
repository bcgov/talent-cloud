import { useEffect, useState } from 'react';
import { SchedulerRow } from './SchedulerRow';
import {
  MemberSchedulerControl,
  MemberSchedulerHeader,
  MemberSchedulerKey,
  MemberSchedulerPopUp,
} from './';
import type { AvailabilityRange, SchedulerRowItem } from '@/common';
import dayjs from 'dayjs';
import { AvailabilityType } from '@/common';
import useAvailability from '@/hooks/useAvailability';
import { DialogUI } from '@/components/ui';

export const MemberScheduler = ({ memberId }: { memberId: string }) => {
  const [schedulerDialogOpen, setSchedulerDialogOpen] = useState(false);

  const [schedulerRows, setSchedulerRows] = useState<{
    [key: string]: SchedulerRowItem[];
  }>({});

  const [editCell, setEditCell] = useState<{
    from?: string;
    to?: string;
    availabilityType?: AvailabilityType | null;
    deploymentCode?: string;
    min?: string;
    max?: string;
  }>();

  const openSchedulerDialog = (
    from?: string,
    to?: string,
    availabilityType?: AvailabilityType | null,
    deploymentCode?: string,
    min?: string,
    max?: string,
  ) => {
    if (!schedulerDialogOpen) {
      // Account for parameters
      setEditCell({ from, to, availabilityType, deploymentCode, min, max });
    } else {
      setEditCell(undefined);
    }
    setSchedulerDialogOpen(!schedulerDialogOpen);
  };

  const { availability, getAvailability, saveAvailability } = useAvailability({
    personnelId: memberId,
  });
  const [availabilityQuery, setAvailabilityQuery] = useState<{
    from: string;
    to: string;
  }>({
    from: dayjs().startOf('month').format('YYYY-MM-DD'),
    to: dayjs().endOf('month').format('YYYY-MM-DD'),
  });

  const handleSchedulerOpen = () => setSchedulerDialogOpen(!schedulerDialogOpen);

  const onChangeAvailabilityQuery = (from: string, to: string) => {
    setAvailabilityQuery({ from, to });
    getAvailability(from, to);
  };

  const saveAvailabilityDates = async (dates: AvailabilityRange) => {
    await saveAvailability(dates);
    setSchedulerDialogOpen(false);
    getAvailability(availabilityQuery.from, availabilityQuery.to);
  };
  useEffect(() => {
    // Rough code to parse backend response into cell items
    const months: { [key: string]: SchedulerRowItem[] } = {};
    // Dates where a new status starts
    const startDates: {
      [key: string]: { status: AvailabilityType; numDays: number };
    } = {};
    let count = 0;
    let lastStatus = '';
    let startDay = '';

    availability.forEach((availDay) => {
      const day = dayjs(availDay.date);
      const month = day.format('MMM');
      if (
        availDay.availabilityType === lastStatus &&
        availDay.availabilityType !== AvailabilityType.AVAILABLE
      ) {
        count++;
      } else if (availDay.availabilityType === AvailabilityType.AVAILABLE) {
        // This is a break in the group of days with one status, so we set numDays and reset
        if (startDates[startDay]) {
          startDates[startDay].numDays = count;
        }
        count = 0;
        lastStatus = '';
        startDay = '';
      } else {
        // For a new status, we close out the last one, and start anew
        if (startDates[startDay]) {
          startDates[startDay].numDays = count;
        }
        startDates[availDay.date] = {
          status: availDay.availabilityType ?? AvailabilityType.AVAILABLE,
          numDays: 1,
        };
        count = 1;
        lastStatus = availDay.availabilityType ?? AvailabilityType.AVAILABLE;
        startDay = availDay.date;
      }

      if (months[month]) {
        months[month].push({
          date: availDay.date,
          status: availDay.availabilityType,
          actualStart: availDay.actualStartDate,
          actualEnd: availDay.actualEndDate,
        });
      } else {
        months[month] = [
          {
            date: availDay.date,
            status: availDay.availabilityType,
            actualStart: availDay.actualStartDate,
            actualEnd: availDay.actualEndDate,
          },
        ];
      }
    });
    if (startDates[startDay]) {
      const lastDay = availability[availability.length - 1];
      if (lastDay.actualEndDate) {
        const difference = dayjs(lastDay.actualEndDate).diff(startDay, 'days');
        startDates[startDay].numDays = difference + 1;
      } else {
        startDates[startDay].numDays = count;
      }
    }

    // For each start date, tell our `months` object which days are starters and how many days
    // This allows us to render the border and the text
    Object.keys(startDates).forEach((startDate) => {
      const date = dayjs(startDate);
      const month = date.format('MMM');
      const schedulerItems = months[month];
      const index = schedulerItems.findIndex(
        (i) => dayjs(i.date).format('D') === date.format('D'),
      );
      schedulerItems[index] = {
        ...schedulerItems[index],
        start: true,
        numDays: startDates[startDate].numDays,
      };
    });
    setSchedulerRows(months);
  }, [availability]);

  const cellClick = (date: string) => {
    const statusIndex = availability.findIndex((s) => s.date === date);
    if (statusIndex > -1) {
      const status = availability[statusIndex];
      // For all elements before (including this one), find the first break in availability type
      const elementsBefore = availability.slice(0, statusIndex + 1).reverse();
      const lastBreakIndex = elementsBefore.findIndex(
        (s) => s.availabilityType !== status.availabilityType,
      );
      const firstDateStatus =
        lastBreakIndex > -1 ? elementsBefore[lastBreakIndex - 1] : status;

      // For all elements after (including this one), find the next break in availability type
      const elementsAfter = availability.slice(statusIndex);
      const nextBreakIndex = elementsAfter.findIndex(
        (s) => s.availabilityType !== status.availabilityType,
      );
      const lastDateStatus =
        nextBreakIndex > -1 ? elementsAfter[nextBreakIndex - 1] : status;

      const firstDate = firstDateStatus.actualStartDate ?? firstDateStatus.date;
      const lastDate = firstDateStatus.actualEndDate ?? lastDateStatus.date;
      const availabilityType = status.availabilityType;

      if (status.availabilityType === AvailabilityType.AVAILABLE) {
        // Use actualStartDate / actualEndDate if it exists
        const min = lastBreakIndex > -1 ? firstDate : undefined;
        const max = nextBreakIndex > -1 ? lastDate : undefined;
        openSchedulerDialog(
          status.date,
          status.date,
          availabilityType,
          undefined,
          min,
          max,
        );
      } else {
        // Use actualStartDate / actualEndDate if it exists
        const deploymentCode = status.deploymentCode;
        openSchedulerDialog(firstDate, lastDate, availabilityType, deploymentCode);
      }
    }
  };

  const getEditDialogTitle = () => {
    switch (editCell?.availabilityType) {
      case AvailabilityType.UNAVAILABLE:
        return 'Unavailable for Deployment';
      case AvailabilityType.DEPLOYED:
        return `Deployment: ${editCell.deploymentCode}`;
      default:
        return 'Set Unavailability';
    }
  };

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
              cellClick={cellClick}
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
          onSave={saveAvailabilityDates}
        />
      </DialogUI>
    </>
  );
};
