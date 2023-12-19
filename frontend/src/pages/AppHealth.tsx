import { Button, ButtonTypes } from '../components';
import { useGetHealth } from '../hooks';
import { logout } from '../services/keycloak';

//TODO remove - this is just for development
const AppHealth = () => {
  const { appHealth, dbHealth, authRoutes, roles } = useGetHealth();

  return (
    <div className="flex flex-col justify-around h-auto">
      <div className="py-16">
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-lg">
          INFO
        </h1>
        <h3 className="mt-4 text-xl font-bold tracking-tight text-gray-900 sm:text-lg">
          Api Health
        </h3>
        {appHealth?.status && (
          <div>
            <p>
              Status:{' '}
              <span className="text-base font-semibold text-indigo-600">
                {appHealth?.status.toString()}
              </span>
            </p>
          </div>
        )}
        <h3 className="mt-4 text-xl font-bold tracking-tight text-gray-900 sm:text-lg">
          DB Health
        </h3>
        {dbHealth?.status && (
          <div>
            <p>
              Status:{' '}
              <span className="text-base font-semibold text-indigo-600">
                {dbHealth?.status.toString()}
              </span>
            </p>
          </div>
        )}

        <h3 className="mt-4 text-xl font-bold tracking-tight text-gray-900 sm:text-lg">
          Auth Routes:
        </h3>
        {authRoutes && (
          <div>
            <p>
              Has access:{' '}
              <span className="text-base font-semibold text-indigo-600">
                {authRoutes ? 'true' : 'false'}
              </span>
            </p>
          </div>
        )}

        <h3 className="mt-4 text-xl font-bold tracking-tight text-gray-900 sm:text-lg">
          Roles:
        </h3>

        <div>
          {roles.length > 0 ? (
            roles.map((itm, index) => (
              <p key={index}>
                role:{' '}
                <span className="text-base font-semibold text-indigo-600">
                  {itm}
                </span>
              </p>
            ))
          ) : (
            <p>
              role:{' '}
              <span className="text-base font-semibold text-indigo-600">n/a</span>
            </p>
          )}
        </div>
      </div>
      <div>
        <Button
          text="Logout"
          onClick={logout}
          type={ButtonTypes.PRIMARY}
          disabled={false}
        />
      </div>
    </div>
  );
};

export default AppHealth;
