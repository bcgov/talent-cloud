import { EmcrLogo } from '@/components/images';

export const SplashFooter = ({ content }: { content: any }) => {
  return (
    <div className="pt-32 lg:px-64  ">
    <div className="bg-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-16">
      <div className="col-span-1 lg:col-span-2 flex flex-col items-start justify-start">
        <EmcrLogo />
        <p className="text text-sm pl-8 w-2/3 pb-16 pt-8 ">{content.tdMessage}</p>
      </div>
      <div className="col-span-1 flex flex-col items-start justify-start pb-12">
        <p className="uppercase font-bold tracking-wide leading-loose">More Info</p>
        <div className="grid grid-cols-2 gap-40">
            <div className="col-span-1 flex flex-col">
        {content.links.slice(0, content.links.length/2+1).map((link: any, i: number) => (
            <a className="py-4" href={link.url}>{link.name}</a>
        ))}
        </div>
        <div className="col-span-1 flex flex-col">
        {content.links.slice(content.links.length/2+1, content.links.length).map((link: any, i: number) => (
            <a className="py-4"  href={link.url}>{link.name}</a>
        ))}
        </div>
        </div>
      </div>
    </div>
    <div className="border border-b-1 border-primaryBlue w-full"></div>
    <div className="py-12 text-sm">© 2024 Government Of British Columbia</div>
    </div>
  );
};
