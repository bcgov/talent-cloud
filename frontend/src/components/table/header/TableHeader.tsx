import type { Column } from '../interface';
export const TableHeader = ({
  columns,
}: {
  columns: { name: string; key: string }[];
}) => {
  return (
    <thead>
      <tr>
        {columns.map(({ name, key }: Column) => (
          <th
            key={key}
            scope="col"
            className="px-6 py-4 text-dark text-left border-b border-borderBlue whitespace-nowrap w-auto"
          >
            {name}
          </th>
        ))}
      </tr>
    </thead>
  );
};
