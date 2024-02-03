import { useKeycloak } from '@react-keycloak/web';
import { Button } from '@/components';
import Routes from '@/routes/constants';
import { createCustomLoginUrl } from '@/utils/keycloak';
import { ButtonTypes } from '@/common';
import {EmcrLogoVertical}  from '@/components/images';


export default () => {
  const { keycloak } = useKeycloak();
  const login = () =>
    window.location.replace(createCustomLoginUrl(keycloak, Routes.Dashboard, ''));

  return (
    <div className="mx-auto pt-32 pb-24 h-screen flex flex-col items-center justify-center">
      <div className="w-full md:w-1/2 lg:w-1/4">
        <div className="card-pf">
          <div className="flex flex-col justify-between items-center text-center pt-8">
            
              <EmcrLogoVertical />
            
            <h1 className="kc-page-title">Authenticate With:</h1>
            <div className="py-4 w-full flex row items-center justify-center">
              <Button type={ButtonTypes.PRIMARY} text="IDIR" onClick={login} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
