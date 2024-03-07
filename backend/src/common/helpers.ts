/**
 *
 * @param date Used when calling new Date() on the backend to query for availability events saved with a PST date string
 * @returns Date as PST date
 */
export const datePST = (date: Date): Date => {
  return new Date(date.toLocaleString('en-US', { timeZone: 'PST' }));
};
