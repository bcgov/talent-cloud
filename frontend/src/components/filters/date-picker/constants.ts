export const months = [
  { label: 'January', value: 0 },
  { label: 'February', value: 1 },
  { label: 'March', value: 2 },
  { label: 'April', value: 3 },
  { label: 'May', value: 4 },
  { label: 'June', value: 5 },
  { label: 'July', value: 6 },
  { label: 'August', value: 7 },
  { label: 'September', value: 8 },
  { label: 'October', value: 9 },
  { label: 'November', value: 10 },
  { label: 'December', value: 11 },
];

export const years = () => {
  const yearsArray = [];
  const today = new Date();
  const currentYear = today.getFullYear();
  for (let i = 0; i < 10; i++) {
    yearsArray.push({
      label: currentYear + i,
      value: currentYear + i,
    });
  }
  return yearsArray;
};
