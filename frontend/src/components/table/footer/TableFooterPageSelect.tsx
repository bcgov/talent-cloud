import type { ChangeEvent } from 'react';
import type { PageParams } from '../interface';

export const TableFooterPageSelect = ({
  totalRows,
  onChange,
}: {
  totalRows: number;
  onChange: (pageParams: Partial<PageParams>) => void;
}) => {
  return (
    <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div className="flex flex-row items-center space-x-4">
        <select
          className="form-select py-1"
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            onChange({ rowsPerPage: parseInt(e.target.value) })
          }
          aria-label="select page size"
          name="rows"
        >
          <option className="pr-4" value={25}>
            25
          </option>
          <option className="pr-4" value={50}>
            50
          </option>
          <option className="pr-4" value={100}>
            100
          </option>
        </select>
        <p className="text-black">{totalRows} total rows</p>
      </div>
    </div>
  );
};
