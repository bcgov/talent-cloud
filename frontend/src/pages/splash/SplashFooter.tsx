import { BcGovLogo } from '@/components/images';

export const SplashFooter = ({ content }: { content: any }) => {
  return (
    <div className=" w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 pl-6 lg:pt-16 sm:pt-8 sm:px-6 lg:px-32 xl:px-64">
      {/* column 1 start */}
      <div className="col-span-1 md:col-span-2 flex flex-col items-start justify-start pt-4">
        <BcGovLogo />
        <p className="lg:w-2/3 pb-8 pt-8 md:pr-24 lg:pr-8">
          {content.tdMessage}
          <a className="underline" href={content.contactLink.url}>
            {content.contactLink.name}
          </a>
          or
          <a className="underline" href={content.serviceCentreLink.url}>
            {content.serviceCentreLink.name}
          </a>
        </p>
      </div>
      {/* column 1 End */}
      {/* column 2 Start */}
      <div className="col-span-1 flex flex-col items-start justify-start pb-12 sm:pt-8">
        <p className="uppercase font-bold tracking-wide pb-4">More Info</p>
        <div className="grid grid-cols-2 w-full gap-16 sm:gap-8">
          <div className="col-span-1 flex flex-col">
            {content.links
              .slice(0, content.links.length / 2 + 1)
              .map((link: any, i: number) => (
                <a
                  key={i.toString() + link.name}
                  className="py-2 underline"
                  href={link.url}
                >
                  {link.name}
                </a>
              ))}
          </div>
          <div className="col-span-1 flex flex-col">
            {content.links
              .slice(content.links.length / 2 + 1, content.links.length)
              .map((link: any, i: number) => (
                <a
                  key={i.toString() + link.name}
                  className="py-2 underline"
                  href={link.url}
                >
                  {link.name}
                </a>
              ))}
          </div>
        </div>
      </div>

      <div className="col-span-1 sm:col-span-2 border border-b-1 border-primaryBlue w-full mx-0 sm:ml-0 md:col-span-3"></div>
      <div className="col-span-1 sm:col-span-2 md:col-span-3 pt-6 pb-24">
        © 2024 Government Of British Columbia
      </div>
    </div>
  );
};
