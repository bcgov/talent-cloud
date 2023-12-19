import { useEffect, useState } from 'react';
import { getAppHealth, getRole, getAuth } from '../services/health';

interface Health {
  status?: string;
  info?: string;
  error?: string;
  details?: string;
}
//TODO - remove this later - just used in development for testting routes
export const useGetHealth = () => {
  const [appHealth, setAppHealth] = useState<Health>();
  const [dbHealth, setDBHealth] = useState<Health>();
  const [authRoutes, setAuthRoutes] = useState<boolean>(false);
  const [roles, setRoles] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { db, api },
        } = await getAppHealth();

        setAppHealth({
          status: api?.status,
          error: api?.error,
          details: api?.details,
        });
        setDBHealth({
          status: db?.status,
          error: db?.error,
          details: db?.details,
        });
      } catch (e) {
        console.log(e);
      }

      try {
        const { data } = await getAuth();

        setAuthRoutes(data.authenticated);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return {
    appHealth,
    dbHealth,
    roles,
    authRoutes,
  };
};
