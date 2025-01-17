export const MemberSchedulerHeader = () => {
  return (
    <div className="pt-2">
      <div className="grid grid-cols-32">
        <div className="bg-white text-xs text-linkBlue">Mos</div>
        {[...Array(32).keys()].slice(1).map((dayOfMonth) => {
          return (
            <div className="bg-white text-xs text-linkBlue pl-2" key={dayOfMonth}>
              {dayOfMonth}
            </div>
          );
        })}
      </div>
    </div>
  );
};
