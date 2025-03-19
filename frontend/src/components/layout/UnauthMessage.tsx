import { logoutUrl } from '@/utils/keycloak';
import { useKeycloak } from '@react-keycloak/web';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { Button } from '../ui/Button';
import { ButtonTypes } from '@/common';
import { useNavigate } from 'react-router';
import { Routes } from '@/routes';

const UnauthMessage = () => {
  const { keycloak } = useKeycloak();

  const keycloakUsername = keycloak?.idTokenParsed?.given_name;

  const title = `Hi ${keycloakUsername},`;
  const p1 =
    'It looks like you are not yet a member of CORE Team. If you would like to become a CORE Team member, please click “Apply to CORE Team”.';
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center  bg-blue-gray-100 lg:py-56">
      <div className="bg-white shadow-md rounded-md py-16 px-8 sm:px-16 lg:px-32 flex flex-col text-left items-start justify-start space-y-8 max-w-[800px]">
        <a
          className="text-md font-bold text-backgroundBlue underline flex flex-row items-center space-x-3"
          href={logoutUrl(keycloak)}
        >
          <ChevronLeftIcon className="h-5 w-5" /> Back
        </a>
        <h3 className="font-bold text-backgroundBlue pb-4">{title}</h3>
        <p>{p1}</p>
        <Button
          variant={ButtonTypes.SOLID}
          text={'Apply to CORE Team'}
          onClick={() => navigate(Routes.IntakeForm)}
        />
      </div>
    </div>
  );
};

export default UnauthMessage;
