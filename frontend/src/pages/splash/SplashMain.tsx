import { ButtonTypes } from '@/common';
import { BannerType } from '@/common/enums/banner-enum';
import { headerLink } from '@/common/links';
import { Button } from '@/components';
import { BcGovLogoHorizontal, SplashImage } from '@/components/images';
import { Banner } from '@/components/ui/Banner';
import { Routes } from '@/routes';
import { AxiosPublic } from '@/utils';
import { createCustomLoginUrl } from '@/utils/keycloak';
import { useKeycloak } from '@react-keycloak/web';
import { useEffect, useState } from 'react';

export const SplashMain = ({ content }: { content: any }) => {
  const { keycloak } = useKeycloak();
  const login = () => {
    window.location.replace(createCustomLoginUrl(keycloak, Routes.Dashboard, ''));
  };
  const [formId, setFormId] = useState<string>();
  const [formEnabled, setFormEnabled] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const { data } = await AxiosPublic.get('/form-info');

      setFormId(data.formId);
      setFormEnabled(data.formEnabled);
    })();
  }, []);

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
      <div className="grid pt-24 lg:pt-6 grid-cols-1 px-6 lg:grid-cols-2 xl:grid-cols-3 sm:px-8 md:pl-12 md:pr-0  xl:pl-32 2xl:px-64">
        <div className="col-span-1  xl:col-span-2 flex flex-col items-start justify-start   lg:py-24 text-left">
          <div className="lg:pr-12 xl:pr-32">
            {/* Update env vars to change form url and to enable/disable form*/}
            {formId && formEnabled ? (
              <Banner
                type={BannerType.INFO}
                content={
                  <>
                    <span className="font-bold mr-2">CORE</span>
                    <span className="pb-12">{`(Coordinated Operation Response in Emergencies) applications, formerly known as TEAMS, are now open for ${new Date().getFullYear()}. Access intake form `}</span>
                  </>
                }
                link={{
                  name: 'here ',
                  url: `https://submit.digital.gov.bc.ca/app/form/submit?f=${import.meta.env.VITE_FORM_ID}`,
                }}
              />
            ) : (
              <Banner
                type={BannerType.INFO}
                content={
                  <>
                    <span className="font-bold mr-2">CORE</span>
                    {`(Coordinated Operation Response in Emergencies) applications, formerly known as TEAMS, are not yet open for ${new Date().getFullYear()}. Please stay tuned. Details coming soon.`}
                  </>
                }
              />
            )}
            <div className="pt-16">
              <span className="text-info lg:mt-32">{content.subtitle}</span>
              <h1 className="font-bold pt-8 pb-16">{content.title}</h1>
            </div>
            <div>
              <p>{content.description.pt1}</p>
            </div>
          </div>
          {/* Small Screen Login in Section */}
          <div className="flex py-24 lg:hidden">
            <div className="bg-[#013366]  rounded-md border-l-4 h-[300px] border-primaryYellow  pt-6 px-6 space-y-6 ">
              <h3 className="text-white">Login</h3>
              <p className="text-white">
                Use your IDIR to access the CORE member database.
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
              Use your IDIR to access the CORE member database.
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
