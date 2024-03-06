import type { Cell } from '@/components';
import { PersonnelStatus, booleanToString } from '@/components';
import { DashboardColumns } from '@/pages/dashboard/constants';
import { iconClass } from '@/components/table/classes';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { Status } from '@/common';

export const TableBodyCell = ({
  cell,
  id,
  status,
}: {
  cell: Cell;
  id: string;
  status: Status;
}) => {
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
    case DashboardColumns.NAME:
      return (
        <td className={cell.className}>
          {status !== Status.ACTIVE && <PersonnelStatus status={status} />}
          <Link
            to={`/profile/${id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-blue-900"
          >
            {cell.value}
          </Link>
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
    case DashboardColumns.AVAILABILITY:
      return (
        <td className={cell.className}>
          {cell.value.availability}{' '}
          <span className="text-textGray">{cell.value.days ?? ''}</span>
        </td>
      );
    default:
      return <td className={cell.className}>{cell.value}</td>;
  }
};
