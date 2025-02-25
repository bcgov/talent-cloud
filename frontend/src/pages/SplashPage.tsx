import { useKeycloak } from '@react-keycloak/web';
import { createCustomLoginUrl } from '@/utils/keycloak';
import { useEffect, useState } from 'react';
import { ButtonTypes } from '@/common';
import { BannerType } from '@/common/enums/banner-enum';
import { Button, PublicLayout } from '@/components';
import { SplashImage } from '@/components/images';
import { Banner } from '@/components/ui/Banner';
import { AxiosPublic } from '@/utils';
import { Routes } from '@/routes';

const SplashPage = () => {
  const { keycloak } = useKeycloak();
  const login = () => {
    window.location.replace(createCustomLoginUrl(keycloak, Routes.Redirect, ''));
  };
  const [formId, setFormId] = useState<string>();
  const [formEnabled, setFormEnabled] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const { data } = await AxiosPublic.get('/form');

      setFormId(data.formId);
      setFormEnabled(data.formEnabled);
    })();
  }, []);

  const content = {
    title: 'Welcome to CORE Team',
    subtitle: 'Coordinated Operation Response in Emergencies',
    description: {
      pt1: 'This is the staffing system (previously known as TEAMS – Temporary Emergency Assignment Management System) that maintains a roster of employees from numerous ministries in the BC Government who have a combination of interest, skills, and experience to work within EMCR operation centres and BCWS fire centres to support communities in emergency management and wildfire response across the province.',
    },
    login: {
      title: 'Login',
      description: 'Use your IDIR to access the CORE member database.',
    },
  };

  return (
    <PublicLayout>
      <div className="grid pt-40 lg:pt-16 grid-cols-1 px-6 lg:grid-cols-2 xl:grid-cols-3 sm:px-8 md:px-12  lg:px-0 2xl:px-64">
        <div className="col-span-1  xl:col-span-2 flex flex-col items-start justify-start text-left lg:py-24 lg:px-16 xl:pl-40 xl:pr-64 2xl:px-64">
          <div>
            {/* Update env vars to change form url and to enable/disable form*/}
            {formId && formEnabled ? (
              <Banner
                type={BannerType.INFO}
                content={
                  <>
                    <span className="font-bold">CORE</span>
                    {` (Coordinated Operation Response in Emergencies) applications, formerly known as TEAMS, are now open for ${new Date().getFullYear()}. Access intake form `}
                    <a
                      href={Routes.IntakeForm}
                    >
                      <span className="font-bold">here.</span>
                    </a>
                  </>
                }
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
            <div className="pt-16 lg:pt-24">
              <span className="text-info lg:mt-32">{content.subtitle}</span>
              <h1 className="font-bold pt-8 pb-16">{content.title}</h1>
            </div>
            <div>
              <p className="leading-loose">{content.description.pt1}</p>
            </div>
          </div>
          {/* Small Screen Login in Section */}
          <div className="flex py-24 lg:hidden">
            <div className="bg-[#013366]  rounded-md border-l-4 h-[300px] border-primaryYellow  pt-6 px-6 space-y-6 ">
              <h3 className="text-white">Login</h3>
              <p className="text-white">{content.login.description}</p>
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
            <p className="text-white">{content.login.description}</p>
            <Button
              id={'login-button-main'}
              variant={ButtonTypes.SECONDARY_LIGHT}
              text={'Log In'}
              onClick={login}
            />
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default SplashPage;
