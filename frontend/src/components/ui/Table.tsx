import type { Cell, Row } from '@/components';
import { Loading, TableBodyCell } from '@/components';
import { renderName } from './helpers';
import type { DashboardColumns } from '@/common';

export const Table = ({
  loading,
  rows,
  columns,
}: {
  loading: boolean;
  rows: any[];
  columns?: DashboardColumns[];
}) => {
  return (
    <table className="table-auto w-full border-collapse border border-slate-500">
      <thead>
        <tr>
          {columns?.map((name: string) => (
            <th
              key={name}
              scope="col"
              className={`px-4 bg-white  border-t-2 border-t-slate-500 text-nowrap  text-dark text-left h-[64px] py-2 border-b-2 border-b-primaryBlue`}
            >
              {renderName(name)}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {loading ? (
          <tr>
            <td colSpan={columns?.length}>
              <Loading />
            </td>
          </tr>
        ) : (
          rows?.map((row: Row, index: number) => (
            <>
              {index !== 0 && (
                <tr>
                  <td
                    className={`border-b-2 border-slate-500`}
                    colSpan={row.cells?.length}
                  ></td>
                </tr>
              )}
              <tr key={row.key} id={row.key}>
                {row.cells.map((itm: Cell) => (
                  <td
                    key={itm.key}
                    scope="row"
                    className={`py-4 px-4 text-nowrap truncate max-w-[250px]`}
                  >
                    <TableBodyCell
                      key={itm.key}
                      cell={itm}
                      id={row.key}
                      status={row.status}
                    />
                  </td>
                ))}
              </tr>
            </>
          ))
        )}
      </tbody>
    </table>
  );
};
