import { logoutUrl } from '@/utils/keycloak';
import { useKeycloak } from '@react-keycloak/web';

const UnauthMessage = () => {
  const { keycloak } = useKeycloak();

  const title = "Whoops! Looks like you don't have authorized access.";
  const p1 =
    'At this time, only EMCR and BCWS coordinators and logistics roles, CORE teams member, and their supervisors may access this site. Please log out and return to the home page.';
  const p2 =
    'If you believe you should have access to this site, please reach out to your local coordinator or program administrator.';

  return (

      <div className="flex flex-col items-center justify-center  bg-blue-gray-100 lg:py-56">
        <div className="bg-white shadow-md rounded-md py-16 px-8 sm:px-16 lg:px-32 flex flex-col text-left items-start justify-start space-y-8 max-w-[800px]">
          <h3 className="font-bold text-backgroundBlue pb-4">{title}</h3>
          <p>{p1}</p>
          <p>{p2}</p>
          <a
            className="text-md font-bold text-blue700 underline"
            href={logoutUrl(keycloak)}
          >
            Log me out
          </a>
        </div>
      </div>

  );
};

export default UnauthMessage;
