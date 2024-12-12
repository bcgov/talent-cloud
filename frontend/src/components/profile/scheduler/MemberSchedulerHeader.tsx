export const MemberSchedulerHeader = () => {
  return (
    <div>
      <div className="grid grid-cols-32">
        <div className="bg-white text-xs text-blue-800">Mos</div>
        {[...Array(32).keys()].slice(1).map((dayOfMonth) => {
          return (
            <div className="bg-white text-xs text-blue-800 pl-2" key={dayOfMonth}>
              {dayOfMonth}
            </div>
          );
        })}
      </div>
    </div>
  );
};
