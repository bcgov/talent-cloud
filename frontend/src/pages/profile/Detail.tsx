import type { ReactElement } from 'react';

const Detail = ({
  title,
  content,
  icon,
}: {
  title?: string;
  content?: string;
  icon?: ReactElement;
}) => {
  return (
    <div className="py-2">
      <div className="flex flex-row items-center space-x-2">
        <p className="subtext-sm">{title}</p>
        {icon}
      </div>
      <p>{content}</p>
    </div>
  );
};

export default Detail;
