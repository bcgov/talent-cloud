import { ButtonTypes } from '@/common';
import { BannerType } from '@/common/enums/banner-enum';
import { Button } from '@/components';
import { SplashImage } from '@/components/images';
import { Banner } from '@/components/ui/Banner';
import { Routes } from '@/routes';
import { createCustomLoginUrl } from '@/utils/keycloak';
import { useKeycloak } from '@react-keycloak/web';

export const SplashMain = ({ content }: { content: any }) => {
  const { keycloak } = useKeycloak();
  const login = () => {
    window.location.replace(createCustomLoginUrl(keycloak, Routes.Dashboard, ''));
  };

  return (
    <div className="grid pt-24 lg:pt-6 grid-cols-1 px-6 lg:grid-cols-2 xl:grid-cols-3 sm:px-8 md:px-16 lg:px-0 lg:pr-0 2xl:px-64">
      <div className="col-span-1  xl:col-span-2 flex flex-col items-start justify-start space-y-16  lg:px-24  xl:px-32 lg:py-24 text-left">
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
        <div className="space-y-12">
          <p>{content.description.pt1}</p>
          <p>
            {content.description.pt2}
            <span className="font-bold">{content.description.bold}</span>
            {content.description.pt3}
          </p>
        </div>
        <div className="flex lg:hidden">
          <div className="bg-[#013366]  rounded-md border-l-4 h-[300px] border-primaryYellow  pt-6 px-6 space-y-6 ">
            <h3 className="text-white">Login</h3>
            <p className="text-white">
              Use your IDIR to access the TEAMS member database.
            </p>
            <Button
              variant={ButtonTypes.SECONDARY_LIGHT}
              text={'Log In'}
              onClick={login}
            />
          </div>
        </div>
      </div>
      <div className="hidden col-span-1 w-full px-0 lg:flex relative">
        <SplashImage />

        <div className="absolute inset-0 top-1/3 bg-[#013366] opacity-60 rounded-md h-[300px] mr-24"></div>
        <div className="absolute inset-0 top-1/3  border-l-4 h-[300px] border-primaryYellow  pt-6 px-6 space-y-6 mr-24">
          <h3 className="text-white">Login</h3>
          <p className="text-white">
            Use your IDIR to access the TEAMS member database.
          </p>
          <Button
            variant={ButtonTypes.SECONDARY_LIGHT}
            text={'Log In'}
            onClick={login}
          />
        </div>
      </div>
    </div>
  );
};
