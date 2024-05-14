import type { Cell } from '@/components';
import { booleanToString } from '@/components';
import { DashboardColumns } from '@/pages/dashboard/constants';
import {
  getAvailabilityClass,
  getUnionMembershipClass,
  iconClass,
  tableClasses,
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
import {  BcwsRoleName, SectionName } from '@/common/enums/sections.enum';

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
        <td className={tableClasses.default}>
          <Link
            to={`/profile/${id}`}
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
    case DashboardColumns.FUNCTION:
      return (
        <td className={tableClasses.default}>
          <div>
            <div className="text-sm font-bold">{cell.value?.functionName}</div>
            <div className="text-sm">{ExperienceName[cell.value?.experienceType as keyof typeof ExperienceName]}</div>
          </div>
        </td>
      );

    case DashboardColumns.AVAILABILITY:
      return (
        <td className={tableClasses.default}>
          <span className={getAvailabilityClass(cell.value?.availability)}>{cell?.value?.availability}</span>
          <span className="ml-2 text-defaultGray">{cell.value?.days}</span>
        </td>
      );
    case DashboardColumns.TRAVEL:
      return (
        <td className={tableClasses.default}>
          {cell.value ? (
            <span className={tableClasses.row + ' text-success'}>
              <CheckCircleIcon className={iconClass(cell.value)} />
              YES
            </span>
          ) : (
            <span className={tableClasses.row + ' text-error'}>
              <XCircleIcon className={iconClass(cell.value)} />
              NO
            </span>
          )}
        </td>
      );
    case DashboardColumns.ICS:
      return (
        <>
          {cell.value ? (
            <td className={tableClasses.row}>
              <CheckCircleIcon className={iconClass(cell.value)} /><span>YES</span>
            </td>
          ) : (
            <td className={tableClasses.row}>
              <XCircleIcon className={iconClass(cell.value)} /><span>NO</span>
            </td>
          )}

        </>
      );
    case DashboardColumns.ROLE:
      return (
        <td className={tableClasses.default}>
          <div>
            <div className="text-sm font-bold">{BcwsRoleName[cell.value?.role as keyof typeof BcwsRoleName]}</div>
            <div className="text-sm">{SectionName[cell.value?.section as keyof typeof SectionName]}</div>
          </div>
        </td>

      )
    case DashboardColumns.UNION_MEMBERSHIP:
      return <td className={getUnionMembershipClass(cell.value)}>{cell.value}</td>;

    case DashboardColumns.WILLINGNESS:
      return (
        <>
          {cell.value ? (
            <td>
              <span className={tableClasses.row}>
                <CheckCircleIcon className={iconClass(cell.value)} /> Recieved
              </span>
            </td>
          ) : (
            <td>
              <MinusCircleIcon className={iconClass(cell.value)} /> Pending
            </td>
          )}
        </>
      );
    case DashboardColumns.ORIENTATION:
      return (
        <>
          {cell.value ? (
            <td>
              <span className={tableClasses.row}>
                <CheckCircleIcon className={iconClass(cell.value)} /> Completed
              </span>
            </td>
          ) : (
            <td>
              <XCircleIcon className={iconClass(cell.value)} /> Incomplete
            </td>
          )}
        </>
      );
    case DashboardColumns.REMOTE:
      return (
        <>
          {cell.value ? (
            <td>
              <span className={tableClasses.row}>
                <CheckCircleIcon className={iconClass(cell.value)} /> Completed
              </span>
            </td>
          ) : (
            <td>
              <XCircleIcon className={iconClass(cell.value)} /> Incomplete
            </td>
          )}
        </>
      );

    case DashboardColumns.MINISTRY:
      return (


        <td className={tableClasses.default + ' text-center'}>
          {cell.value}
        </td>


      );
    case DashboardColumns.RESPECTFUL:
    case DashboardColumns.PARQ:
      return (
        <>
          {cell.value ? (
            <td>
              <span className={tableClasses.row}>
                <CheckIcon className={iconClass(cell.value)} /> Recieved
              </span>
            </td>
          ) : (
            <td>
              <MinusIcon className={iconClass(cell.value)} /> Pending
            </td>
          )}
        </>
      );
    case DashboardColumns.LOCATION:
      return <td className={tableClasses.default + " text-left"}>{cell.value}</td>;
    default:
      return <td className={tableClasses.default + " text-center"}>{cell.value}</td>;
  }
};
