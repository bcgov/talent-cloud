import { useKeycloak } from '@react-keycloak/web';

import Routes from '@/routes/constants';
import { createCustomLoginUrl } from '@/utils/keycloak';




export default () => {
  const { keycloak } = useKeycloak();
  
    window.location.replace(createCustomLoginUrl(keycloak, Routes.Dashboard, ''));

  return (
    <div className="mx-auto pt-32 pb-24 h-screen flex flex-col items-center justify-center">
      
    </div>
  );
};
