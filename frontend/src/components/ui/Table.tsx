import type { Cell, Row } from '@/components';
import { Loading, TableBodyCell } from '@/components';
import { useRecommitmentCycle } from '@/hooks/useRecommitment';
import { Fragment, type ReactElement } from 'react';

export const Table = ({
  loading,
  rows,
  columns,
  auto,
}: {
  loading: boolean;
  rows: any[];
  columns?: any[];
  auto?: boolean;
}) => {
  const { isRecommitmentCycleOpen } = useRecommitmentCycle();
  return (
    <table
      className={`${auto ? 'table-auto ' : 'table-fixed '} w-full border-collapse border border-slate-500`}
    >
      <thead>
        <tr>
          {columns?.map((col: ReactElement, index: number) => (
            <th
              key={index}
              scope="col"
              className={`px-2 bg-white  border-t-2 border-t-slate-500 text-nowrap  text-dark text-left h-[64px] py-2 border-b-2 border-b-primaryBlue`}
            >
              {col.props.children}
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
            <Fragment key={index}>
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
                  <Fragment key={itm.key}>
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
                        recommitmentStatus={row?.recommitmentStatus}
                        isRecommitmentCycleOpen={isRecommitmentCycleOpen}
                      />
                    </td>
                    {itm.nested && itm.nested.length > 0 && (
                      <table className="bg-red-200">
                        {itm.nested.map((nestedRow) => (
                          <tr key={nestedRow.key} id={nestedRow.key}>
                            {nestedRow?.cells.map((cell) => (
                              <td
                                key={cell.key}
                                scope="row"
                                className={`py-4 px-4 text-nowrap truncate max-w-[250px]`}
                              >
                                <TableBodyCell
                                  key={cell.key}
                                  cell={cell}
                                  id={nestedRow.key}
                                />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </table>
                    )}
                  </Fragment>
                ))}
              </tr>
            </Fragment>
          ))
        )}
      </tbody>
    </table>
  );
};
