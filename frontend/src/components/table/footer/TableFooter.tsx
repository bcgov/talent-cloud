import { TableFooterNav } from './TableFooterNav';
import { TableFooterPageSelect } from './TableFooterPageSelect';
import type { PageParams, TableData } from '@/components';

export const TableFooter = ({
  pageParams,
  tableData,
  onChange,
}: {
  pageParams: PageParams;
  tableData: TableData;
  onChange: (pageParams: Partial<PageParams>) => void;
}) => {
  return (
    <div className="w-full flex flex-row  items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <TableFooterPageSelect totalRows={tableData.totalRows} onChange={onChange} />
      <div>
        <TableFooterNav
          pageParams={pageParams}
          onChange={onChange}
          tableData={tableData}
        />
      </div>
    </div>
  );
};
