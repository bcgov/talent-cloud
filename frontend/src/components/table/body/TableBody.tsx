import { Fragment } from 'react';
import type { Cell, Row } from '../interface';
import { TableBodyCell } from './TableBodyCell';

export const TableBody = ({ rows, columns }: { rows: Row[]; columns: any[] }) => {
  return (
    <tbody>
      {rows.map((row: Row, index: number) => (
        <Fragment key={row.key}>
          <tr className="hidden"></tr>
          {index !== 0 && (
            <tr>
              <td
                className={`border-b-2 border-slate-500`}
                colSpan={columns.length}
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
      ))}
    </tbody>
  );
};
