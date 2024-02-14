import Detail from './Detail';

const DetailsSection = ({
  numColumns,
  title,
  columns,
}: {
  numColumns: number;
  title: string;
  columns: { title: string; content: string }[] | undefined;
}) => {
  return (
    <div className="py-5">
      <h4 className="font-bold text-info">{title}</h4>
      <div
        className={`grid ${numColumns === 2 ? 'grid-cols-2' : 'grid-cols-3'} pt-4`}
      >
        {columns?.map((column) => (
          <div key={column.title}>
            <Detail title={column.title} content={column.content} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailsSection;
