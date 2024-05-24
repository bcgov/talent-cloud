import type { ProfileDetail } from './types';

const Detail = ({ title, content }: ProfileDetail) => {
  return (
    <div className="py-2">
      <div className="flex flex-row items-center space-x-2">
        <p className="subtext">{title}</p>
      </div>
      <p>{content}</p>
    </div>
  );
};

export default Detail;
