export const TableFooterPageSelect = ({
  totalRows,
  rowsPerPage,
  handleChangeNumRows,
  options = [25, 50, 100],
}: {
  totalRows?: number;
  rowsPerPage: number;
  handleChangeNumRows: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options?: number[];
}) => {
  return (
    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div className="flex flex-row items-center space-x-4">
        <select
          className="py-2 rounded-md text-sm border-1 border-gray-400 outline-none"
          onChange={handleChangeNumRows}
          aria-label="select page size"
          name="rows"
        >
          <option>{rowsPerPage}</option>
          {options.map(
            (option) =>
              option !== rowsPerPage && (
                <option key={option} className="pr-1" value={option}>
                  {option}
                </option>
              ),
          )}
        </select>
        <p className="text-dark-800">{totalRows} total rows</p>
      </div>
    </div>
  );
};
