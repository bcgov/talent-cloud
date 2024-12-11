//TODO clean up the code
export const SupervisorTable = ({
  rows,
  columns,
}: {
  rows: any[];
  columns: { key: string; label: string }[];
}) => {
  return (
    <table className={`table-fixed w-full`}>
      <thead>
        <tr>
          {columns.map((itm) => (
            <th
              scope="column"
              key={itm.key}
              className={` bg-infoBannerLight flex-col justify-start  items-start text-wrap  text-info text-left h-[64px] `}
            >
              {['program', 'status', 'year'].includes(itm.key) ? (
                <>
                  <div>{itm.label.split(' ')[0]}</div>
                  <div>{itm.label.split(' ')[1]}</div>
                </>
              ) : (
                <div className={'pl-2  self-start justify-start pb-6'}>
                  {itm.label}
                </div>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows?.map((row: any) => (
          <>
            <tr>
              {row.bcws && row.emcr ? (
                <td
                  scope="column"
                  className={`pl-2 text-nowrap truncate max-w-[250px] text-gray-800 pb-[55px]`}
                  key="memberName"
                >
                  {row.memberName}
                </td>
              ) : (
                <td
                  scope="column"
                  className={`pl-2 text-nowrap truncate max-w-[250px] text-gray-800 `}
                  key="memberName"
                >
                  {row.memberName}
                </td>
              )}

              {columns.slice(1, columns.length).map((itm) => (
                <td scope="column" key={itm.key}>
                  <table>
                    {row?.bcws && (
                      <tr
                        className={`py-4  pl-2 text-nowrap truncate max-w-[250px]`}
                      >
                        <td
                          className={`py-4 pl-2  text-nowrap truncate max-w-[250px] text-gray-800`}
                          key={itm.key}
                        >
                          {row.bcws?.[itm.key]}
                        </td>
                      </tr>
                    )}
                    {row?.emcr && (
                      <tr>
                        <td
                          className={`py-4 text-nowrap truncate max-w-[250px] text-gray-800 pl-2`}
                          key={itm.key}
                        >
                          {row?.emcr?.[itm.key]}
                        </td>
                      </tr>
                    )}
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
          </>
        ))}
      </tbody>
    </table>
  );
};
