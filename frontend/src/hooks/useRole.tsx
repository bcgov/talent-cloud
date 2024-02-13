import { RoleContext } from '@/providers/Role';
import { useContext } from 'react';

export const useRole = () => {
  const { role, username } = useContext(RoleContext);
  return { role, username };
};
