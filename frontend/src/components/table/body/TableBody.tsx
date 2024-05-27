import type { Cell, Row } from '../interface';
import { TableBodyCell } from './TableBodyCell';

export const TableBody = ({ row, index }: { row: Row; index: number }) => {
  return (
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
    </>
  );
};
