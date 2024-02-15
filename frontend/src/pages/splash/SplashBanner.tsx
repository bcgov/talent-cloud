export const SplashBanner = ({ content }: { content: any }) => {
  return (
    <div className="flex items-center justify-center bg-[#292929] border-t-4 border-b-4  border-primaryYellow h-auto py-6">
      <p className="text-white font-normal px-6 sm:px-8 md:px-16 lg:px-32 xl:px-64">{content}</p>
    </div>
  );
};
