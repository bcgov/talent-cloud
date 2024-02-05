import Detail from './Detail';

const MemberDetailsSection = ({
  numColumns,
  title,
  columns,
}: {
  numColumns: number;
  title: string;
  columns: { title: string; content: string }[];
}) => {
  return (
    <div className="py-5">
      <h4 className="font-bold text-info">{title}</h4>
      <div className={`grid grid-cols-${numColumns} pt-4`}>
        {columns.map((column, i) => (
          <div key={i}>
            <Detail title={column.title} content={column.content} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemberDetailsSection;
