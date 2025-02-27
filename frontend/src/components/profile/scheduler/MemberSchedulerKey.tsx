export const MemberSchedulerKey = () => {
  return (
    <div className="flex flex-row gap-12 px-4 pb-6 pt-24">
      <div className="flex items-center">
        <span className="px-4 py-1 bg-gray-100 text-sm">
          Available (Not Confirmed)
        </span>
      </div>

      <div className="flex items-center">
        <span className="px-4 py-1 border-l-4 border-l-green-700 bg-sprout-100 text-sm">
          Available (Confirmed)
        </span>
      </div>

      <div className="flex items-center">
        <span className="px-4 py-1 bg-red-50 border-l-4 border-red-500 text-sm">
          Unavailable
        </span>
      </div>

      <div className="flex items-center">
        <span className="px-4 py-1 bg-blue-50 border-l-4 border-blue-500 text-sm">
          Deployment
        </span>
      </div>
    </div>
  );
};
