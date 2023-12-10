import { useEffect, useState } from 'react';
import { getAppHealth, getDBHealth } from '../services/health';

interface Health {
  status?: string;
  info?: string;
  error?: string;
  details?: string;
}

export const useGetHealth = () => {
  const [appHealth, setAppHealth] = useState<Health>();
  const [dbHealth, setDBHealth] = useState<Health>();

  useEffect(() => {
    (async () => {
      try {
        const { data: appHealth } = await getAppHealth();
        const { data: dbHealth } = await getDBHealth();

        setAppHealth({
          status: appHealth?.status,
          error: appHealth?.error,
          details: appHealth?.details,
        });
        setDBHealth({
          status: dbHealth?.status,
          error: dbHealth?.error,
          details: dbHealth?.details,
        });
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return {
    appHealth,
    dbHealth,
  };
};
