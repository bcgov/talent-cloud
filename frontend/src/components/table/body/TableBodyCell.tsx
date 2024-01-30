import type { Cell } from '@/components';
import { booleanToString } from '@/components';
import { DashboardColumns } from '@/pages/dashboard/constants';
import { iconClass } from '@/components/table/classes';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

export const TableBodyCell = ({ cell }: { cell: Cell }) => {
  switch (cell.columnName) {
    case DashboardColumns.TRAVEL:
      return (
        <td className={cell.className}>
          {cell.value ? (
            <CheckCircleIcon className={iconClass(cell.value)} />
          ) : (
            <XCircleIcon className={iconClass(cell.value)} />
          )}
          {booleanToString(cell.value).toUpperCase()}
        </td>
      );
    case DashboardColumns.REMOTE:
      return <td className={cell.className}> {booleanToString(cell.value)}</td>;
    case DashboardColumns.FUNCTION:
      return (
        <td className={cell.className}>
          {
            <div>
              <div className="text-sm font-bold">{cell.value.split(':')[0]}</div>
              <div className="text-sm">{cell.value.split(':')[1]}</div>
            </div>
          }
        </td>
      );
    default:
      return <td className={cell.className}>{cell.value}</td>;
  }
};
