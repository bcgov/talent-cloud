import { statusDescriptions } from './constants';

export const MemberStatusGuide = () => {
  return (
    <div className="max-w-3xl px-8 pb-8">
      <div className="flex flex-row items-start justify-start space-x-2 pt-4">
        <div className="w-1/4">
          <p className="text-blue-800 font-bold pt-4 text-left text-sm">
            {statusDescriptions.sectionOne.headers[0]}
          </p>
        </div>
        <div className="w-1/3">
          <p className="text-blue-800 font-bold pt-4 text-left text-sm">
            {statusDescriptions.sectionOne.headers[1]}
          </p>
        </div>
      </div>

      {statusDescriptions.sectionOne.rows.map((item, index) => (
        <div
          key={index}
          className="flex flex-row items-start justify-start space-x-2 py-4"
        >
          <div className=" w-1/4">
            <p className="font-bold text-xs">{item.title}</p>
          </div>
          <div className="w-2/3">
            <p className="text-xs">{item.description}</p>
          </div>
        </div>
      ))}

      <div className="flex flex-row items-start justify-start space-x-2 py-4">
        <div className="w-1/4">
          <p className="text-blue-800 font-bold pt-4 text-left text-sm">
            {statusDescriptions.sectionTwo.headers[0]}
          </p>
        </div>
        <div className="w-1/6">
          <p className="text-blue-800 font-bold pt-4 text-left text-sm">
            {statusDescriptions.sectionTwo.headers[1]}
          </p>
        </div>
        <div className="w-1/2">
          <p className="text-blue-800 font-bold pt-4 text-left text-sm">
            {statusDescriptions.sectionTwo.headers[2]}
          </p>
        </div>
      </div>

      {statusDescriptions.sectionTwo.rows.map((item, index) => (
        <div
          key={index}
          className="flex flex-row items-start justify-start space-x-2 py-4"
        >
          <div className="w-1/4">
            <p className="font-bold text-xs">{item.title}</p>
          </div>
          <div className="w-1/6">
            <p
              className={
                item.type === 'Active'
                  ? 'text-green-700 text-xs'
                  : 'text-red-600 text-xs'
              }
            >
              {item.type}
            </p>
          </div>
          <div className="w-1/2">
            <p className="text-xs">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
