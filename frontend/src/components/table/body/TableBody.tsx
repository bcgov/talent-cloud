import { TableBodyRow } from './TableBodyRow';
import type { Row } from '../interface';

export const TableBody = ({ rows }: { rows: Row[] }) => {
  return (
    <tbody className="h-full w-auto overflow-x-auto border-gray">
      {rows.map((row: Row) => (
        <TableBodyRow key={row.key} row={row} />
      ))}
    </tbody>
  );
};
