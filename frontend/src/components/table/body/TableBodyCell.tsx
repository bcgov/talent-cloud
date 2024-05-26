import type { Cell } from '@/components';
import { DashboardColumns } from '@/pages/dashboard/constants';
import {
  getAvailabilityClass,
  getUnionMembershipClass,
  iconClass,
  pendingIconClass,
  tableClass,
} from '@/components/table/classes';
import {
  CheckCircleIcon,
  XCircleIcon,
  MinusCircleIcon,
  MinusIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { Status, StatusNames } from '@/common';

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
    case DashboardColumns.NAME:
      return (
        <span>
          <Link
            to={`/profile/${id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline text-blue-900 truncate"
          >
            {cell.value}
          </Link>
          {status === Status.NEW && (
            <span className="bg-warningBannerLight px-2 rounded-full ml-2">
              {StatusNames.NEW}
            </span>
          )}
        </span>
      );
    case DashboardColumns.AVAILABILITY:
      return (
        <>
          <span className={getAvailabilityClass(cell.value?.availability)}>
            {cell?.value?.availability}
          </span>
          <span className="ml-2 text-defaultGray">{cell.value?.days}</span>
        </>
      );
    case DashboardColumns.TRAVEL:
      return (
        <>
          {cell.value ? (
            <span className={tableClass.rowClass}>
              <CheckCircleIcon className={iconClass(cell.value)} />
              YES
            </span>
          ) : (
            <span className={tableClass.rowClass}>
              <XCircleIcon className={iconClass(cell.value)} />
              NO
            </span>
          )}
        </>
      );
    case DashboardColumns.ICS:
      return (
        <>
          {cell.value ? (
            <span className={tableClass.rowClass}>
              <CheckCircleIcon className={iconClass(cell.value)} />
              <span>YES</span>
            </span>
          ) : (
            <span className={tableClass.rowClass}>
              <XCircleIcon className={iconClass(cell.value)} />
              <span>NO</span>
            </span>
          )}
        </>
      );

    case DashboardColumns.UNION_MEMBERSHIP:
      return (
        <>
          <div className="max-w-40">
            <span className={getUnionMembershipClass(cell.value)}>{cell.value}</span>
          </div>
        </>
      );

    case DashboardColumns.WILLINGNESS:
      return (
        <>
          {cell.value ? (
            <span className={tableClass.rowClass}>
              <CheckCircleIcon className={pendingIconClass(cell.value)} /> Recieved
            </span>
          ) : (
            <>
              <MinusCircleIcon className={pendingIconClass(cell.value)} /> Pending
            </>
          )}
        </>
      );
    case DashboardColumns.ORIENTATION:
      return (
        <>
          {cell.value ? (
            <span className={tableClass.rowClass}>
              <CheckCircleIcon className={pendingIconClass(cell.value)} /> Completed
            </span>
          ) : (
            <>
              <XCircleIcon className={pendingIconClass(cell.value)} /> Incomplete
            </>
          )}
        </>
      );
    case DashboardColumns.REMOTE:
      return (
        <>
          {cell.value ? (
            <span className={tableClass.rowClass}>Yes</span>
          ) : (
            <span className={tableClass.rowClass}>No</span>
          )}
        </>
      );
    case DashboardColumns.RESPECTFUL:
    case DashboardColumns.PARQ:
      return (
        <>
          {cell.value ? (
            <span className={tableClass.rowClass}>
              <CheckIcon className={pendingIconClass(cell.value)} /> Recieved
            </span>
          ) : (
            <>
              <MinusIcon className={pendingIconClass(cell.value)} /> Pending
            </>
          )}
        </>
      );

    case DashboardColumns.LOCATION:
      return <span className="text-sm text-dark-600">{cell.value}</span>;
    case DashboardColumns.REGION:
      return <span className="text-sm text-dark-700">{cell.value}</span>;
    case DashboardColumns.FIRE_CENTRE:
      return <span className="text-sm text-dark-700">{cell.value}</span>;
    case DashboardColumns.DATE_APPROVED:
      return <span className="text-sm text-dark-700">{cell.value}</span>;
    default:
      return (
        <span className={`${tableClass.rowClass} + text-left `}>{cell.value}</span>
      );
  }
};
