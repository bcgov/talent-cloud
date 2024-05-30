import Detail from './Detail';
import type { ProfileDetail } from './types';

const DetailsSection = ({
  title,
  columns,
}: {
  title: string;
  columns: ProfileDetail[];
}) => {
  return (
    <div className="py-5 px-16">
      <h5 className="font-bold text-info">{title}</h5>
      <div className={'grid lg:grid-cols-4 gap-y-2'}>
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
