import { Fragment } from 'react';

export const SupervisorTable = ({
  rows,
  columns,
}: {
  rows: { key: string; memberName: string; programs: any[] }[];
  columns: { key: string; label: string }[];
}) => {
  return (
    <table className={`md:table-fixed lg:table-auto w-full overflow-x-hidden`}>
      <thead>
        <tr>
          {columns.map((itm, index) => (
            <th
              scope="column"
              key={itm.key}
              className={
                ` bg-infoBannerLight flex-col justify-start  items-start align-text-top text-left py-1 text-wrap  text-info px-4 ` +
                (index === columns.length - 1 ? ' xl:pr-40' : '')
              }
            >
              {['program', 'status', 'year'].includes(itm.key) ? (
                <>
                  <div>{itm.label.split(' ')[0]}</div>
                  <div>{itm.label.split(' ')[1]}</div>
                </>
              ) : (
                <div>{itm.label}</div>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows?.map((row: { key: string; memberName: string; programs: any[] }) => (
          <Fragment key={row.key}>
            <tr>
              <td
                scope="column"
                className={` text-nowrap truncate  text-gray-800  xl:pr-24 pl-4`}
                key="memberName"
              >
                {row.memberName}
              </td>

              {columns.slice(1, columns.length).map((itm, index) => (
                <td
                  scope="column"
                  key={itm.key}
                  className={
                    index !== columns.length - 2 || index !== columns.length - 3
                      ? ' xl:pr-24'
                      : ' xl:w-32'
                  }
                >
                  <table>
                    {...row.programs.map((item, index) => (
                      <tr className={`py-4   text-nowrap truncate px-4`} key={index}>
                        <td
                          className={`py-4   text-nowrap truncate  text-gray-800 px-4`}
                          key={itm.key}
                        >
                          {item[itm.key]}
                        </td>
                      </tr>
                    ))}
                  </table>
                </td>
              ))}
            </tr>
            <tr>
              <td
                className={`border-b-2 border-slate-500`}
                colSpan={columns?.length}
              ></td>
            </tr>
          </Fragment>
        ))}
      </tbody>
    </table>
  );
};
