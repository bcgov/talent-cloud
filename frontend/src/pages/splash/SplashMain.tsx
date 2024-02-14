import { ButtonTypes } from '@/common';
import { BannerType } from '@/common/enums/banner-enum';
import { Button } from '@/components';
import { SplashImage } from '@/components/images';
import { Banner } from '@/components/ui/Banner';
import { Routes } from '@/routes';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import {  useNavigate } from 'react-router';

export const SplashMain = ({ content }: { content: any }) => {
  const nav = useNavigate();

  return (
    <div className="grid pt-24 lg:pt-6 grid-cols-1 px-6 lg:px-0 lg:grid-cols-3 2xl:px-64">
      {/* column 1 Start */}
      <div className="col-span-1  lg:col-span-2 flex flex-col items-start justify-start md:px-12 lg:px-32 space-y-16 md:space-y-8 lg:pt-12 text-left">
        <Banner
          type={BannerType.INFO}
          content={content.banner}
          link={{
            name: 'here ',
            url: content.bannerLink.url,
          }}
        />

        <span className="text-info">{content.subtitle}</span>
        <h1 className="font-bold">{content.title}</h1>

        <p>{content.description.pt1}</p>
        <p>
          {content.description.pt2}
          <span className="font-bold">{content.description.bold}</span>
          {content.description.pt3}
        </p>

        <div className="text-left flex flex-col py-12 lg:py-0">
          <p className="font-bold pb-2">{content.linksHeader}</p>
          {content.links.map((link: any, i: number) => (
            <span key={i.toString() + link.name}>
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
      <div className="hidden col-span-1 w-full px-0 lg:flex flex-col items-end justify-start">
        <div className="relative max-w-xl mx-auto">
          <div className="object-cover ">
            <SplashImage />
          </div>

          <div className="absolute inset-0 top-1/3 bg-[#013366] opacity-60 rounded-md h-[300px] mr-24"></div>
          <div className="absolute inset-0 top-1/3  border-l-4 h-[300px] border-primaryYellow  pt-6 px-6 space-y-6 mr-24">
            <h3 className="text-white">Login</h3>
            <p className="text-white">
              Use your IDIR to access the TEAMS member database.
            </p>
            <Button
              type={ButtonTypes.PRIMARY}
              text={'Log In'}
              onClick={() => nav(Routes.Login)}
            />
            <a className="text-white flex flex-row nowrap" href="/">
              Don’t have an IDIR{' '}
              <span>
                <ChevronRightIcon className="h-6 w-6" />
              </span>
            </a>
          </div>
        </div>
      </div>
      {/* column 2 End */}
    </div>
  );
};
