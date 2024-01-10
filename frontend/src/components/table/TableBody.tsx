import { TableRow } from './TableRow';
import type { Row } from './interface';

export const TableBody = ({ rows }: { rows: Row[] }) => {
  return (
    <tbody className="h-full  overflow-x-auto">
      {rows.map((row: Row) => (
        <TableRow key={row.key} row={row} />
      ))}
    </tbody>
  );
};
