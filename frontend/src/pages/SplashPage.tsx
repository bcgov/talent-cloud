import { useKeycloak } from '@react-keycloak/web';
import { createCustomLoginUrl } from '@/utils/keycloak';
import { ButtonTypes } from '@/common';
import { BannerType } from '@/common/enums/banner-enum';
import { Button, PublicLayout } from '@/components';
import { SplashImage } from '@/components/images';
import { Banner } from '@/components/ui/Banner';
import { Routes } from '@/routes';
import { useNavigate } from 'react-router';

const SplashPage = () => {
  const { keycloak } = useKeycloak();
  const login = () => {
    window.location.replace(createCustomLoginUrl(keycloak, Routes.Redirect, ''));
  };

  const navigate = useNavigate();
  const content = {
    title: 'Welcome to CORE Team',
    subtitle: 'Coordinated Operation Response in Emergencies',
    description: {
      pt1: 'This is the staffing system that maintains a roster of employees from numerous ministries in the BC Government who have a combination of interest, skills, and experience to work within Emergency Management and Climate Readiness (EMCR) operation centres and BC Wildfire Service (BCWS) centres to support communities in emergency management and wildfire response across the province.',
    },
    login: {
      title: 'Login',
      description: 'Use your IDIR to access the CORE Team application.',
    },
  };

  return (
    <PublicLayout>
      <div className="grid pt-40 lg:pt-16 grid-cols-1 px-6 lg:grid-cols-2 xl:grid-cols-3 sm:px-8 md:px-12  lg:px-0 2xl:px-64">
        <div className="col-span-1  xl:col-span-2 flex flex-col items-start justify-start text-left lg:py-24 lg:px-16 xl:pl-40 xl:pr-64 2xl:px-64">
          <div>
            <Banner
              type={BannerType.INFO}
              content={
                <>
                  <span className="font-bold">CORE</span>
                  {`(Coordinated Operation Response in Emergencies) applications, formerly known as TEAMS, are now open for ${new Date().getFullYear()}. Access intake form `}
                  <a href={Routes.IntakeForm}>
                    <span className="font-bold">here.</span>
                  </a>
                </>
              }
            />

            <div className="pt-16 lg:pt-24">
              <span className="text-info lg:mt-32">{content.subtitle}</span>
              <h1 className="font-bold pt-8 pb-16">{content.title}</h1>
            </div>
            <div className="flex flex-col gap-16">
              <p className="leading-loose">{content.description.pt1}</p>
              <div>
                <p className="font-bold">
                  To learn more about each CORE Team program stream, visit:{' '}
                </p>
                <ul className="list-disc list-inside text-primaryBlue">
                  <li>
                    <a
                      href="https://intranet.gov.bc.ca/emcr/employees-workplace/hr/core-team"
                      className="underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      EMCR CORE Team program stream intranet page{' '}
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://intranet.gov.bc.ca/bcws/core-team"
                      className="underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      BCWS CORE Team program stream intranet page{' '}
                    </a>
                  </li>
                </ul>
              </div>
              <div className="w-full drop-shadow-md rounded-md">
                <div className="w-full bg-grayBackground px-[24px] py-[12px]">
                  <p className="font-bold text-lg">Contact Information</p>
                </div>
                <div className="w-full bg-white pt-[16px] pb-[24px] px-[24px] flex flex-col gap-[16px]">
                  <div>
                    <p className="font-bold">EMCR CORE Team:</p>
                    <a
                      className="text-primaryBlue underline"
                      href="mailto:EMCR.CORETeam@gov.bc.ca"
                    >
                      EMCR.CORETeam@gov.bc.ca
                    </a>
                  </div>
                  <div>
                    <p className="font-bold">BCWS CORE Team:</p>
                    <a
                      className="text-primaryBlue underline"
                      href="mailto:BCWS.CORETeam@gov.bc.ca"
                    >
                      EMCR.CORETeam@gov.bc.ca
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Small Screen Login in Section */}
          <div className="flex py-24 lg:hidden">
            <div className="bg-[#013366]  rounded-md border-l-4 h-[300px] border-primaryYellow  pt-6 px-6 space-y-6 ">
              <h3 className="text-white">Login</h3>
              <p className="text-white">{content.login.description}</p>
              <Button
                id={'login-button-mobile'}
                variant={ButtonTypes.SOLID_SECONDARY}
                text={'Log In'}
                onClick={login}
              />
              <button
                type={'button'}
                onClick={() => navigate(Routes.IntakeForm)}
                className={
                  'text-white text-xs text-decoration-underline underline whitespace-nowrap'
                }
              >
                <div className="flex flex-row gap-2 items-center">
                  Not a member yet? Apply now
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="hidden col-span-1 w-full px-0 lg:flex relative">
          <SplashImage />

          <div className="absolute inset-0 top-1/3 bg-[#013366] opacity-80 rounded-md h-[200px] mr-24"></div>
          <div className="absolute inset-0 top-1/3  border-l-4 h-[200px] border-primaryYellow  pt-6 px-6 space-y-6 mr-24">
            <h3 className="font-normal text-white">Login</h3>
            <p className="text-white">{content.login.description}</p>
            <div className="flex flex-row space-x-4">
              <Button
                id={'login-button-main'}
                variant={ButtonTypes.SOLID_SECONDARY}
                text={'Log In'}
                onClick={login}
              />
              <button
                type={'button'}
                onClick={() => navigate(Routes.IntakeForm)}
                className={
                  'text-white text-xs text-decoration-underline underline whitespace-nowrap'
                }
              >
                <div className="flex flex-row gap-2 items-center">
                  Not a member yet? Apply now
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};

export default SplashPage;
