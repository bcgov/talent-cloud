const Detail = () => {
  return (
    <div className="py-2">
      <h5>Date Joined</h5>
      <h4>June 17, 2020</h4>
    </div>
  );
};

const MemberDetailsSection = () => {
  return (
    <div className="py-7">
      <h4 className="font-bold text-info">General Information</h4>
      <div className="flex flex-row">
        <div className="basis-1/3">
          <Detail />
        </div>
        <div className="basis-1/3">
          <Detail />
        </div>
        <div className="basis-1/3">
          <Detail />
        </div>
      </div>
    </div>
  );
};

export default MemberDetailsSection;
