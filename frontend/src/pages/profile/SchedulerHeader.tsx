const SchedulerHeader = () => {
  return (
    <div>
      <div className="flex flex-row gap-24 py-6">
        <span className="text-sm text-calGreenTwo">A = Available</span>
        <span className="text-sm text-calRedTwo">U = Unavailable</span>
        <span className="text-sm text-calBlueTwo">D = Deployed</span>
      </div>
      <div className="grid grid-cols-32">
        <div className="bg-white text-xs text-linkBlue">Month</div>
        {[...Array(32).keys()].slice(1).map(dayOfMonth => {
          return (
            <div className="bg-white text-xs text-linkBlue pl-2">{dayOfMonth}</div>
          );
        })}
      </div>
    </div>
  );
}

export default SchedulerHeader;