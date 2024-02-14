export const SplashBanner = ({ content }: { content: any }) => {
  return (
    <div className="relative">
    <div className="flex items-center justify-center bg-[#292929] border-t-4 border-b-4  border-primaryYellow h-32 absolute">
      <p className="text-white text-xs font-normal lg:px-56">{content}</p>
    </div>
    </div>
  );
};
