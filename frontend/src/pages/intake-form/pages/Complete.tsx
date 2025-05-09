// router
import { Routes } from '@/routes';

// types
import { ButtonTypes } from '@/common';

// ui
import { Button } from '@/components';
import { createCustomLoginUrl } from '@/utils/keycloak';
import { useKeycloak } from '@react-keycloak/web';

export const Complete = () => {
  const { keycloak } = useKeycloak();
  return (
    <div className="mt-4">
  
        <p className="mb-2">
          You can go to your dashboard to view and make changes to your profile by
          clicking “Go to My Dashboard”.
        </p>
        <Button
          variant={ButtonTypes.SOLID}
          text={'Dashboard'}
          onClick={() =>
            window.location.replace(
              createCustomLoginUrl(keycloak, Routes.MemberProfile, ''),
            )
          }
        />
      </div>
  
  );
};
