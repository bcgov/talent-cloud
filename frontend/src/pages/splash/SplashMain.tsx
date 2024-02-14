import { BannerType } from "@/common/enums/banner-enum";
import { SplashImage } from "@/components/images";
import { Banner } from "@/components/ui/Banner";

export const SplashMain = ({ content }: { content: any }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5  h-5/6">
      {/* column 1 Start */}
      <div className="col-span-1  lg:col-span-3 flex flex-col items-start justify-start px-4 md:px-12 lg:pl-24 space-y-16 lg:pt-24 text-left">
        <Banner content={content.banner} link={{name:content.bannerLink, url: ''}} type={BannerType.INFO}/>
        <div>
          <span className="text-info pb-8">{content.subtitle}</span>
          <h1 className="font-bold">{content.title}</h1>
        </div>
        <div className="space-y-8">
          <p>{content.description.pt1}</p>
          <p>
            {content.description.pt2}
            <span className="font-bold">{content.description.bold}</span>
            {content.description.pt3}
          </p>
        </div>
        <div className="text-left flex flex-col pt-12">
          <p className="font-bold pb-2">{content.linksHeader}</p>
          {content.links.map((link: any, i: number) => (
            <span key={i.toString()+link.name}>
              •
              <a className="pl-2 text-info underline" href={link.url}>
                {link.name}
              </a>
            </span>
          ))}
        </div>
      </div>
      {/* column 1 End */}

      {/* column 2 Start */}
      <div className="col-span-1 lg:col-span-2 w-full px-0 flex flex-col items-end justify-center h-5/6">
        <SplashImage />
      </div>
      {/* column 2 End */}
    </div>
  );
};
