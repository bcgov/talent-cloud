export const MemberSchedulerKey = () => {
  return (
    <div className="flex flex-row gap-12 px-4 py-6">
      <div className="flex items-center">
        {/* Change to green if not member view */}
        <span className="px-4 py-1 bg-dark-300 text-sm">Available</span>
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
