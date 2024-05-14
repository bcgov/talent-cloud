import { DashboardColumns } from '@/pages/dashboard';

export const renderName = (name: string) => {
  switch (name) {
    case DashboardColumns.SUPERVISOR_APPROVAL:
      return (
        <td>
          {name.split(' ')[0]}
          <br />
          {name.split(' ')[1]}
        </td>
      );

    case DashboardColumns.TRAVEL:
      return (
        <td>
          {name.split(' ')[0]}
          <br />
          <span className="text-nowrap">
            {' '}
            {name.split(' ')[1] + ' ' + name.split(' ')[2]}
          </span>
        </td>
      );

    case DashboardColumns.REMOTE:
      return (
        <td>
          <span>
            {name.split(' ')[0]}
            <br />
            {name.split(' ')[1]}
          </span>
        </td>
      );

    case DashboardColumns.UNION_MEMBERSHIP:
      return (
        <td>
          <span>
            {name.split(' ')[0]}
            <br />
            {name.split(' ')[1]}
          </span>
        </td>
      );

    case DashboardColumns.FUNCTION:
      return (
        <td className="flex flex-col">
          <span className="block">
            {name.split(' ')[0]} {name.split(' ')[1]}
          </span>
          <span className="block">{name.split(' ')[2]}</span>
        </td>
      );

    case DashboardColumns.RESPECTFUL:
      return (
        <td className="flex flex-row  flex-nowrap text-nowrap ">
          {name.split(' ')[0]} <br />
          {name.split(' ')[1]} {name.split(' ')[2]}
        </td>
      );

    case DashboardColumns.WILLINGNESS:
      return (
        <td className="flex flex-row  flex-nowrap text-nowrap ">
          {name.split(' ')[0]} <br />
          {name.split(' ')[1]}
        </td>
      );
    case DashboardColumns.DATE_APPROVED:
      return (
        <td className="flex flex-row  flex-nowrap text-nowrap ">
          {name.split(' ')[0]} <br />
          {name.split(' ')[1]}
        </td>
      );
    default:
      return <td className="flex flex-row  flex-nowrap text-nowrap ">{name}</td>;
  }
};
