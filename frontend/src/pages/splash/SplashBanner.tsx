export const SplashBanner = ({ content }: { content: any }) => {
  return (
    <div className="flex items-center justify-center bg-[#292929] border-t-4 border-b-4  border-primaryYellow h-auto py-6 px-4 sm:px-12">
      <p className="text-white font-normal lg:px-32 2xl:px-64">{content}</p>
    </div>
    
  );
};
