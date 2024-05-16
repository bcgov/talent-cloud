import Detail from './Detail';

const DetailsSection = ({
  numColumns,
  title,
  columns,
}: {
  numColumns: number;
  title: string;
  columns: { title: string; content: string | JSX.Element }[] | undefined;
}) => {
  return (
    <div className="py-5">
      <h5 className="font-bold text-info">{title}</h5>
      <div
        className={`grid ${numColumns === 2 ? 'grid grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 lg:grid-cols-3'} pt-4`}
      >
        {columns?.map((column) => (
          <div key={column.title} className="col-span-1">
            <Detail title={column.title} content={column.content} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailsSection;
