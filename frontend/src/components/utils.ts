import { MinistryAcronymName, StatusName } from '../common';

export const setTableDataStyle = (itm: string) => {
  if (Object.keys(StatusName).includes(itm)) {
    return '';
  } else if (Object.keys(MinistryAcronymName).includes(itm)) {
    return 'text-ministry px-6 py-4 whitespace-nowrap';
  } else {
    return 'text-dark px-6 py-4 whitespace-nowrap';
  }
};
