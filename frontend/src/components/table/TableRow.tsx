import { TableCell } from './TableCell';
import { rowClass } from './classes';
import type { Cell, Row } from './interface';

export const TableRow = ({ row }: { row: Row }) => {
  return (
    <tr className={row.active ? rowClass + 'bg-white' : rowClass + 'bg-inactive'}>
      {row.cells.map((itm: Cell) => (
        <TableCell key={itm.key} itm={itm} />
      ))}
    </tr>
  );
};
