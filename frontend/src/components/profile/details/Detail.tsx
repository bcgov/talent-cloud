import type { ProfileDetail } from '@/pages/profile/types';

export const Detail = ({ title, content }: ProfileDetail) => {
  return (
    <div className="py-2">
      <div className="flex flex-row items-center space-x-2">
        <p className="subtext">{title}</p>
      </div>
      <p>{content}</p>
    </div>
  );
};
