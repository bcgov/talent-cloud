import { useEffect, useState } from 'react';
import { getAppHealth } from '../services/health';

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
    })();
  }, []);

  return {
    appHealth,
    dbHealth,
  };
};
