import { useEffect, useState } from 'react';
import { getUserInfo } from '../services/api-endpoints';

export const useGetUserInfo = () => {
  const [username, setUsername] = useState<string>('');
  const [roles, setRoles] = useState<string[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const {
          data: { username, roles },
        } = await getUserInfo();
        setUsername(username);
        setRoles(roles);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return {
    username,
    roles,
  };
};
