import dayjs from 'dayjs';
import type { DateRange } from 'react-day-picker';

export const getDateDisplay = (value: DateRange | undefined) => {
  const displayToday = dayjs(new Date()).format('YYYY-MM-DD');
  const displayTo = value?.to && dayjs(value.to).format('YYYY-MM-DD');
  const displayFrom = value?.from && dayjs(value.from).format('YYYY-MM-DD');

  // If no date is selected, display "Today"
  if (!displayFrom && !displayTo) {
    return `${displayToday} (Today)`;
  }
  // If from date equals today, and from date is selected, but to date is not, display "today"
  if (displayFrom === displayToday && !displayTo) {
    return `${displayToday} (Today)`;
  }
  // If from date does not equal today, and from date is selected, but to date is not, display "From date"
  if (displayFrom !== displayToday && !displayTo) {
    return `${displayFrom}`;
  }
  // If from date equals today, and to date equals today, display "Today"
  if (displayFrom === displayTo && displayTo === displayToday) {
    return `${displayToday} (Today)`;
  }
  // If from date equals to date, but they not equal today, display the single selected date
  if (displayFrom === displayTo && displayTo != displayToday) {
    return `${displayFrom}`;
  }
  // otherwise, if from date does not equal today, and from date does not equal to date, and we have both from and to dates, display the range
  return `${displayFrom} - ${displayTo}`;
};
