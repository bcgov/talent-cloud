import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { booleanToString, iconClass } from './utils';
import type { Cell } from './interface';
import { DashboardColumns } from './interface';

export const TableCell = ({ itm }: { itm: Cell }) => {
  if (itm.columnName === DashboardColumns.TRAVEL) {
    return (
      <td className={itm.className}>
        {itm.value ? (
          <CheckCircleIcon className={iconClass(itm.value)} />
        ) : (
          <XCircleIcon className={iconClass(itm.value)} />
        )}
        {booleanToString(itm.value)}
      </td>
    );
  } else if (itm.columnName === DashboardColumns.REMOTE) {
    return <td className={itm.className}> {booleanToString(itm.value)}</td>;
  } else {
    return <td className={itm.className}>{itm.value}</td>;
  }
};
