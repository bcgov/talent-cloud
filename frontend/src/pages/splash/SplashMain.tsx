import { ButtonTypes } from '@/common';
import { BannerType } from '@/common/enums/banner-enum';
import { headerLink } from '@/common/links';
import { Button } from '@/components';
import { BcGovLogoHorizontal, SplashImage } from '@/components/images';
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
    <div>
      <header className="relative w-full border-b z-40 py-0">
        <div className="w-full md:flex justify-start md:justify-between items-start md:items-center fixed top-0 mt-0 bg-white border-b border-[#D9D9D9] shadow-sm lg:px-24 py-0">
          <div className="lg:flex">
            <a
              href={headerLink}
              className="py-0 my-0"
              target={'_blank'}
              rel={'noopener noreferrer'}
            >
              <BcGovLogoHorizontal />
            </a>
          </div>
        </div>
      </header>
      <div className="grid pt-24 lg:pt-6 grid-cols-1 px-6 lg:grid-cols-2 xl:grid-cols-3 sm:px-8 md:px-16 lg:px-0 lg:pr-0 2xl:px-64">
        <div className="col-span-1  xl:col-span-2 flex flex-col items-start justify-start space-y-16  lg:px-24  xl:px-32 lg:py-24 text-left">
          {/* TODO - uncomment when we want to allow access to the form*/}
          {/* <Banner
            type={BannerType.INFO}
            content={content.banner}
            link={{
              name: 'here ',
              url: `https://submit.digital.gov.bc.ca/app/form/submit?f=${process.env.FORM_ID}`
            }}
          /> */}
          <Banner
            type={BannerType.INFO}
            content="TEAMS applications are not yet open for 2024. Please stay tuned. Details coming soon."
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
                id={'login-button-mobile'}
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
              id={'login-button-main'}
              variant={ButtonTypes.SECONDARY_LIGHT}
              text={'Log In'}
              onClick={login}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
