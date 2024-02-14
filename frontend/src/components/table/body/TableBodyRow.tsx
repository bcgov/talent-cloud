import type { Cell, Row } from '@/components';
import { TableBodyCell } from './TableBodyCell';
import { rowClass } from '@/components/table/classes';
import { Status } from '@/common';

export const TableBodyRow = ({ row }: { row: Row }) => {
  return (
    <tr
      key={row.key}
      className={
        row.status !== Status.ACTIVE
          ? rowClass + ' bg-inactive'
          : rowClass + ' bg-white'
      }
    >
      {row.cells.map((itm: Cell) => (
        <TableBodyCell key={itm.key} cell={itm} id={row.key} status={row.status} />
      ))}
    </tr>
  );
};
