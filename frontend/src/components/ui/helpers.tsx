import { DashboardColumns } from '@/pages/dashboard';

export const renderName = (name: string) => {
  switch (name) {
    case DashboardColumns.NAME:
      return <div className="w-56">{name}</div>;
    case DashboardColumns.SUPERVISOR_APPROVAL:
      return (
        <>
          {name.split(' ')[0]}
          <br />
          {name.split(' ')[1]}
        </>
      );

    case DashboardColumns.UNION_MEMBERSHIP:
      return (
        <span>
          {name.split(' ')[0]}
          <br />
          {name.split(' ')[1]}
        </span>
      );

    case DashboardColumns.FUNCTION:
      return (
        <>
          <span className="block">
            {name.split(' ')[0]} {name.split(' ')[1]}
          </span>
          <span className="block">{name.split(' ')[2]}</span>
        </>
      );

    case DashboardColumns.RESPECTFUL:
      return (
        <>
          {name.split(' ')[0]} <br />
          {name.split(' ')[1]} {name.split(' ')[2]}
        </>
      );

    case DashboardColumns.WILLINGNESS:
      return (
        <>
          {name.split(' ')[0]} <br />
          {name.split(' ')[1]}
        </>
      );
    case DashboardColumns.DATE_APPROVED:
      return (
        <>
          {name.split(' ')[0]} <br />
          {name.split(' ')[1]}
        </>
      );
    default:
      return <td>{name}</td>;
  }
};
