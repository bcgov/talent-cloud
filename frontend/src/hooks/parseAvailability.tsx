import type { SchedulerRowItem, Availability } from '@/common';
import { AvailabilityType } from '@/common';
import dayjs from 'dayjs';

export const parseAvailability = (availability: Availability[]) => {
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
  return months;
};
