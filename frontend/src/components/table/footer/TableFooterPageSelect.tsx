export const TableFooterPageSelect = ({
  totalRows,
  rowsPerPage,
  handleChangeNumRows,
}: {
  totalRows?: number;
  rowsPerPage: number;
  handleChangeNumRows: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => {
  const options = [25, 50, 100];
  return (
    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div className="flex flex-row items-center space-x-4">
        <select
          className="form-select py-1"
          onChange={handleChangeNumRows}
          aria-label="select page size"
          name="rows"
        >
          <option>{rowsPerPage}</option>
          {options.map(
            (option) =>
              option !== rowsPerPage && (
                <option key={option} className="pr-4" value={option}>
                  {option}
                </option>
              ),
          )}
        </select>
        <p className="text-black">{totalRows} total rows</p>
      </div>
    </div>
  );
};
