import type { ReactElement } from 'react';

const Detail = ({
  title,
  content,
  icon,
}: {
  title: string;
  content: string | JSX.Element;
  icon?: ReactElement;
}) => {
  return (
    <div className="py-2">
      <div className="flex flex-row items-center space-x-2">
        <h4>{title}</h4>
        {icon}
      </div>
      <p>{content}</p>
    </div>
  );
};

export default Detail;
