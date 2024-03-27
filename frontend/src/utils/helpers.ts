/**
 * offsetTimezoneDate
 * We tend to deal with dates as strings, but since the database stores them as dates as UTC, this helper function
 * helps us offset those dates to match (loosely) timezones. This keeps dates consistent.
 * This isn't exact science, and could be improved further
 * @param dateString
 * @returns
 */
export const offsetTimezoneDate = (dateString: string): Date => {
  const date = new Date(dateString);
  const offset = date.getTimezoneOffset() * 60000;
  const newDate = new Date(date.getTime() + offset);
  return newDate;
};

export const datePST = (date: Date): string => {
  return new Date(date).toLocaleString('PST', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });
};

export const formatPhone = (value?: string): string | undefined => {
  if (value?.split('').length)
    return value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  else return undefined;
};
