import { Loading } from '../ui';
import type { FieldInterface } from '../form';
import { Toggle } from '../form/components/Toggle';
import type { Column } from '.';
import { TableFilters, TableFooter, TableBody, TableHeader } from '.';
import useTable from '@/hooks/useTable';

export const Table = ({
  title,
  subtitle,
  fields,
  columns,
  toggle,
}: {
  title: string;
  subtitle: string;
  fields: FieldInterface[];
  columns: Column[];
  toggle?: FieldInterface;
}) => {
  const {
    filterValues,
    pageParams,
    tableData,
    handleChange,
    handlePageParams,
    onSubmit,
    onClear,
  } = useTable();

  return (
    <>
      {!tableData ? (
        <Loading />
      ) : (
        <>
          <TableFilters
            fields={fields}
            handleChange={handleChange}
            onSubmit={onSubmit}
            onClear={onClear}
            filterValues={filterValues}
          />
          <div className="shadow-lg rounded-md mx-auto my-12 w-auto bg-white border border-gray">
            <div className="flex flex-row items-center justify-between mx-8">
              <div className="flex flex-col py-6">
                <h4 className="text-black">{title}</h4>
                <p className="text-black">{`${tableData.totalRows} ${subtitle}`}</p>
              </div>
              {toggle && (
                <Toggle
                  field={toggle}
                  handleToggle={(val: boolean) =>
                    handlePageParams({ showInactive: val })
                  }
                />
              )}
            </div>
            {/* table-auto will auto resize columns - table fixed looks more consistent */}
            <table className="table-auto mx-auto border-disabledGray">
              <TableHeader columns={columns} />
              <TableBody rows={tableData.rows} />
            </table>
            <TableFooter
              pageParams={pageParams}
              tableData={tableData}
              onChange={handlePageParams}
            />
          </div>
        </>
      )}
    </>
  );
};
