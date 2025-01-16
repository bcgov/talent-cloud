import type { ProfileDetail } from '@/pages/profile/types';
import { QuestionIcon } from '../../ui/Icons';

export const Detail = ({ title, content, tooltipContent, tooltipTitle, tooltipClicked }: ProfileDetail) => {
  return (
    <div className="py-2">
      <div className="flex flex-row items-center space-x-1">
        <p className="subtext">{title}</p>
        {tooltipContent && tooltipTitle && tooltipClicked && (
          <button onClick={() => tooltipClicked({ title: tooltipTitle, content: tooltipContent })}>
            <QuestionIcon />
          </button>
        )}
      </div>
      <p>{content}</p>
    </div>
  );
};
