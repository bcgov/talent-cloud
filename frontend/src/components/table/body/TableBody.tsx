import type { Cell, Row } from '../interface';
import { TableBodyCell } from './TableBodyCell';

export const TableBody = ({ rows }: { rows: Row[] }) => {
  return (
    <tbody className="overflow-x-auto overflow-y-scroll border-gray">
      {rows.map((row: Row) => (
        <tr key={row.key}>
          {row.cells.map((itm: Cell) => (
            <TableBodyCell
              key={itm.key}
              cell={itm}
              id={row.key}
              status={row.status}
            />
          ))}
        </tr>
      ))}
    </tbody>
  );
};
