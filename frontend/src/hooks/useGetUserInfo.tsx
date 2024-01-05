import { useEffect, useState } from 'react';
import { getUserInfo } from '../services/api-endpoints';

export const useGetUserInfo = () => {
  const [username, setUserName] = useState<string>('');
  const [roles, setRoles] = useState<string[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const {
          data: { username, roles },
        } = await getUserInfo();
        console.log(username, roles);
        setUserName(username);
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
