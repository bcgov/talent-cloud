import { RoleContext } from '@/providers/Role';
import { useContext } from 'react';

export const useRole = () => {
  const {
    role,

    program,

    username,

    route,
  } = useContext(RoleContext);

  return { role, program, username, route };
};
