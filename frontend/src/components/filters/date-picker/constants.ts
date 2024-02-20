export const getMonth = (month: number) => {
  switch (month) {
    case 1:
      return 'January';
    case 2:
      return 'February';
    case 3:
      return 'March';
    case 4:
      return 'April';
    case 5:
      return 'May';
    case 6:
      return 'June';
    case 7:
      return 'July';
    case 8:
      return 'August';
    case 9:
      return 'September';
    case 10:
      return 'October';
    case 11:
      return 'November';
    case 12:
      return 'December';
  }
};

export const months = [
  { label: 'January', value: 0 },
  { label: 'February', value: 1 },
  {
    label: 'March',
    value: 2,
  },
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
