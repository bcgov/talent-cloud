export const TableHeader = ({ columns }: { columns: string[] }) => {
  return (
    <thead className="bg-header border-b border-bgNav">
      <tr>
        {columns.map((itm: string, index: number) => (
          <th
            key={`${itm + index.toString}`}
            scope="col"
            className="px-6 py-4 text-dark text-left"
          >
            {itm}
          </th>
        ))}
      </tr>
    </thead>
  );
};
