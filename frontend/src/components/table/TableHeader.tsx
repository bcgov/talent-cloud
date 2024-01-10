import type { Column } from './interface';

export const TableHeader = ({
  columns,
}: {
  columns: { name: string; key: string }[];
}) => {
  return (
    <thead className="bg-header border-b border-bgNav">
      <tr>
        {columns.map(({ name, key }: Column) => (
          <th
            key={key}
            scope="col"
            className="px-6 py-4 
          
          
          text-dark text-left"
          >
            {name}
          </th>
        ))}
      </tr>
    </thead>
  );
};
