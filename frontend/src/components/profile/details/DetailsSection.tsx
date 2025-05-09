import type { ReactElement } from 'react';
import type { ProfileDetail } from '@/pages/profile/types';
import { Detail } from './Detail';

const DetailsSection = ({
  title,
  columns,
  tooltipClicked,
  tooltipClosed,
}: {
  columns: ProfileDetail[];
  tooltipClicked?: (tooltip: { title: string; content: ReactElement }) => void;
  tooltipClosed?: () => void;
  title?: string;
}) => {
  return (
    <>
      {title && <h5 className="font-bold text-info">{title}</h5>}
      <div className={'grid lg:grid-cols-4 gap-y-2'}>
        {columns?.map((column) => (
          <div key={column.title} className="col-span-1">
            <Detail
              title={column.title}
              content={column.content}
              tooltipIcon={column.tooltipIcon}
              tooltipTitle={column.tooltipTitle}
              tooltipContent={column.tooltipContent}
              tooltipClicked={tooltipClicked}
              tooltipClosed={tooltipClosed}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default DetailsSection;
