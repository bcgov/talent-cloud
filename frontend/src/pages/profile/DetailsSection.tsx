import { ReactElement } from 'react';
import Detail from './Detail';

const DetailsSection = ({
  title,
  columns,
}: {
  title: string;
  columns: { title?: string; content?: string | ReactElement }[];
}) => {
  return (
    <div className="py-5 px-16">
      <h5 className="font-bold text-info">{title}</h5>
      <div className={'grid grid-cols-4'}>
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
