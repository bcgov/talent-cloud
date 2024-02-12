export const PersonnelStatus = ({
  active,
  reviewed,
}: {
  active: boolean;
  reviewed: boolean;
}) => {
  if (!reviewed) {
    return <span className="bg-infoBannerLight px-2 rounded-full mr-2">New</span>;
  }
  if (active) {
    return (
      <span className="bg-successBannerLight px-2 rounded-full mr-2">Active</span>
    );
  } else {
    return (
      <span className="bg-warningBannerLight px-2 rounded-full mr-2">Inactive</span>
    );
  }
};
