import type { ProfileDetail } from '@/pages/profile/types';
import { Detail } from './Detail';

const DetailsSection = ({
  title,
  columns,
}: {
  title?: string;
  columns: ProfileDetail[];
}) => {
  return (
    <div className="pt-5 pb-16 px-1">
      {title && <h5 className="font-bold text-info">{title}</h5>}
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
