import type { Cell } from '@/components';
import { DashboardColumns } from '@/pages/dashboard/constants';
import {
  getAvailabilityClass,
  getUnionMembershipClass,
  iconClass,
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
import { ExperienceName } from '@/common/enums/experience.enum';
import { BcwsRoleName, SectionName } from '@/common/enums/sections.enum';

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
        <>
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
        </>
      );
    case DashboardColumns.FUNCTION:
      return (
        <div>
          <div className="text-sm font-bold">{cell.value?.functionName}</div>
          <div className="text-sm">
            {
              ExperienceName[
                cell.value?.experienceType as keyof typeof ExperienceName
              ]
            }
          </div>
        </div>
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
            <span className={`${tableClass.rowClass} text-success`}>
              <CheckCircleIcon className={iconClass(cell.value)} />
              YES
            </span>
          ) : (
            <span className={`${tableClass.rowClass} text-error`}>
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
    case DashboardColumns.ROLE:
      return (
        <>
          <div className="text-sm font-bold">
            {BcwsRoleName[cell.value?.role as keyof typeof BcwsRoleName]}
          </div>
          <div className="text-sm">
            {SectionName[cell.value?.section as keyof typeof SectionName]}
          </div>
        </>
      );
    case DashboardColumns.UNION_MEMBERSHIP:
      return (
        <>
          <span className={getUnionMembershipClass(cell.value)}>{cell.value}</span>
        </>
      );

    case DashboardColumns.WILLINGNESS:
      return (
        <>
          {cell.value ? (
            <span className={tableClass.rowClass}>
              <CheckCircleIcon className={iconClass(cell.value)} /> Recieved
            </span>
          ) : (
            <>
              <MinusCircleIcon className={iconClass(cell.value)} /> Pending
            </>
          )}
        </>
      );
    case DashboardColumns.ORIENTATION:
      return (
        <>
          {cell.value ? (
            <span className={tableClass.rowClass}>
              <CheckCircleIcon className={iconClass(cell.value)} /> Completed
            </span>
          ) : (
            <>
              <XCircleIcon className={iconClass(cell.value)} /> Incomplete
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
              <CheckIcon className={iconClass(cell.value)} /> Recieved
            </span>
          ) : (
            <>
              <MinusIcon className={iconClass(cell.value)} /> Pending
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
      return <span className={tableClass.rowClass}>{cell.value}</span>;
  }
};
