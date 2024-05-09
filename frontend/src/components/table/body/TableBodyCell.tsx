import type { Cell } from '@/components';
import { booleanToString } from '@/components';
import { DashboardColumns } from '@/pages/dashboard/constants';
import { iconClass } from '@/components/table/classes';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { Status, StatusNames } from '@/common';
import { RoleContext } from '@/providers';
import { useContext } from 'react';

export const TableBodyCell = ({
  cell,
  id,
  status,
}: {
  cell: Cell;
  id: string;
  status: Status;
}) => {
  const { route } = useContext(RoleContext)
  switch (cell.columnName) {
    case DashboardColumns.NAME:
      return (
        <td className={cell.className}>
          <Link
            to={`/${route}/profile/${id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-blue-900"
          >
            {cell.value}
          </Link>
          {status === Status.NEW && (
            <span className="bg-warningBannerLight px-2 rounded-full ml-2">
              {StatusNames.NEW}
            </span>
          )}
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
          <span className="text-defaultGray">{cell.value.days ?? ''}</span>
        </td>
      );
    case DashboardColumns.TRAVEL:
    case DashboardColumns.ICS:
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
    default:
      return <td className={cell.className}>{cell.value}</td>;
  }
};
