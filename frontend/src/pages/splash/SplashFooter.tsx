import { EmcrLogo } from '@/components/images';

export const SplashFooter = ({ content }: { content: any }) => {
  return (
    <div className="pt-32 lg:px-32">
    <div className="bg-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-16">
      <div className="col-span-1 lg:col-span-2 flex flex-col items-start justify-start">
        <EmcrLogo />
        <p className="text text-sm pl-8 pr-48 py-16">{content.tdMessage}</p>
      </div>
      <div className="col-span-1 flex flex-col items-start justify-start">
        <p className="uppercase font-bold tracking-wide">More Info</p>
      </div>
    </div>
    <div className="border border-b-2 border-primaryBlue w-full"></div>
    <div className="py-12 text-sm">© 2024 Government Of British Columbia</div>
    </div>
  );
};
