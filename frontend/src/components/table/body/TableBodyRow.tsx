import type { Cell, Row } from '@/components';
import { TableBodyCell } from './TableBodyCell';
import { rowClass } from '@/styles/tableStyles';

export const TableBodyRow = ({ row }: { row: Row }) => {
  return (
    <tr
      key={row.key}
      className={row.active ? rowClass + ' bg-white' : rowClass + ' bg-inactive'}
    >
      {row.cells.map((itm: Cell) => (
        <TableBodyCell key={itm.key} itm={itm} />
      ))}
    </tr>
  );
};
