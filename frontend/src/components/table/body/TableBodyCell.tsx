import { Button, type Cell } from '@/components';
import { ButtonTypes, DashboardColumns } from '@/common';
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
import type { TravelPreference } from '../../../common/enums/travel-preference.enum';
import { TravelPreferenceText } from '../../../common/enums/travel-preference.enum';

export const TableBodyCell = ({
  cell,
  id,
  status,
}: {
  cell: Cell;
  id: string;
  status?: Status;
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
          {status && status === Status.NEW && (
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
    case DashboardColumns.TRAVEL_PREFERENCE:
      return (
        <>
          {cell?.value && (
            <span className={tableClass.rowClass}>
              {TravelPreferenceText[cell.value as keyof typeof TravelPreference]}
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
              <CheckCircleIcon className={pendingIconClass(cell.value)} /> Received
            </span>
          ) : (
            <span className={tableClass.rowClass}>
              <MinusCircleIcon className={pendingIconClass(cell.value)} /> Pending
            </span>
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
            <span className={tableClass.rowClass}>
              <XCircleIcon className={pendingIconClass(cell.value)} /> Incomplete
            </span>
          )}
        </>
      );
    case DashboardColumns.RESPECTFUL:
    case DashboardColumns.PARQ:
      return (
        <>
          {cell.value ? (
            <span className={tableClass.rowClass}>
              <CheckIcon className={pendingIconClass(cell.value)} /> Received
            </span>
          ) : (
            <span className={tableClass.rowClass}>
              <MinusIcon className={pendingIconClass(cell.value)} /> Pending
            </span>
          )}
        </>
      );
    case 'Approval':
      return (
        <div className="relative flex flex-row items-center space-x-4">
          <select
            onChange={(e) => cell.handleChange && cell?.handleChange(e)}
            value={cell.value}
            className="rounded-md"
          >
            {cell?.options?.map((itm) => <option key={itm}>{itm}</option>)}
          </select>
          {cell.value}
        </div>
      );
    case 'Submit':
      return (
        <Button
          variant={ButtonTypes.TERTIARY}
          text={'Submit'}
          onClick={cell.onClick}
        />
      );
    case DashboardColumns.LOCATION:
      return <span className="text-sm text-dark-600">{cell.value}</span>;
    case DashboardColumns.REGION:
      return <span className="text-sm text-dark-710">{cell.value}</span>;
    case DashboardColumns.FIRE_CENTRE:
      return <span className="text-sm text-dark-710">{cell.value}</span>;
    case DashboardColumns.DATE_APPROVED:
      return <span className="text-sm text-dark-710">{cell.value}</span>;
    default:
      return (
        <span className={`${tableClass.rowClass} + text-left `}>{cell.value}</span>
      );
  }
};
