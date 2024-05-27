import { Fragment } from 'react';
import type { Cell, Row } from '../interface';
import { TableBodyCell } from './TableBodyCell';
import { Loading } from '@/components/ui';

export const TableBody = ({
  rows,
  columns,
  loading,
}: {
  rows: Row[];
  columns?: any[];
  loading: boolean;
}) => {
  return (
    <tbody>
      {loading ? (
        <tr>
          <td colSpan={columns?.length}>
            <div className="w-full py-64 flex flex-row justify-center items-center">
              <Loading height="[1/4]" />
            </div>
          </td>
        </tr>
      ) : (
        rows.map((row: Row, index: number) => (
          <Fragment key={row.key}>
            <tr className="hidden"></tr>
            {index !== 0 && (
              <tr>
                <td
                  className={`border-b-2 border-slate-500`}
                  colSpan={columns?.length}
                ></td>
              </tr>
            )}
            <tr key={row.key} id={row.key}>
              {row.cells.map((itm: Cell) => (
                <td
                  key={itm.key}
                  scope="row"
                  className="py-4 px-4 text-nowrap truncate max-w-[250px]"
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
          </Fragment>
        ))
      )}
    </tbody>
  );
};
