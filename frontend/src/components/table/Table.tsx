import type { Column, FieldInterface, PageParams, TableData } from '.';
import { TableFooter, TableBody, TableHeader } from '.';
import { Toggle } from '../toggle/Toggle';

export const Table = ({
  title,
  subtitle,
  columns,
  toggle,
  tableData,
  pageParams,
  handlePageParams,
}: {
  title: string;
  subtitle: string;

  columns: Column[];
  toggle?: FieldInterface;
  tableData: TableData;
  pageParams: PageParams;
  handlePageParams: (params: Partial<PageParams>) => void;
}) => {
  return (
    <div className="shadow-lg rounded-md mx-auto my-12 w-auto bg-white border border-gray">
      <div className="flex flex-row items-center justify-between mx-8">
        <div className="flex flex-col py-6">
          <h4 className="text-black">{title}</h4>
          <span className="text-black">{`${tableData.totalRows} ${subtitle}`}</span>
        </div>
        {toggle && (
          <Toggle
            field={toggle}
            handleToggle={(val: boolean) => handlePageParams({ showInactive: val })}
          />
        )}
      </div>
      {/* table-auto will auto resize columns - table fixed looks more consistent */}
      <table className="table-auto mx-auto border-disabledGray w-full">
        <TableHeader columns={columns} />
        <TableBody rows={tableData.rows} />
      </table>
      <TableFooter
        pageParams={pageParams}
        tableData={tableData}
        onChange={handlePageParams}
      />
    </div>
  );
};
