import type { Role } from '@/common';
import { AxiosPrivate } from '@/hooks/useAxios';

import type { Dispatch, ReactElement, SetStateAction } from 'react';

import { createContext, useEffect, useMemo, useState } from 'react';
export enum Program {
  BCWS = 'bcws',
  EMCR = 'emcr',
  ADMIN = 'admin',
}
export enum Route {
  BCWS = 'bcws',
  EMCR = 'emcr',
}
export const RoleContext = createContext<{
  role: Role | undefined;
  setRole: (role: Role | undefined) => void;
  program: Program | undefined;
  setProgram: (program: Program | undefined) => void;
  route: Route | undefined;
  setRoute: Dispatch<SetStateAction<Route | undefined>>;
  username: string;
  setUsername: (username: string) => void;
}>({
  role: undefined,
  program: undefined,
  username: '',
  setRole: () => {},
  setProgram: () => {},
  setUsername: () => {},
  route: undefined,
  setRoute: () => {},
});

export const RoleProvider = ({ children }: { children: ReactElement }) => {
  const [role, setRole] = useState<Role>();
  const [username, setUsername] = useState<string>('');
  const [program, setProgram] = useState<Program>();
  const [route, setRoute] = useState<Route | undefined>();

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { username, role, program },
        } = await AxiosPrivate.get('/auth/userInfo');
        setUsername(username);
        setRole(role);
        setProgram(program);
        setRoute(program);
      } catch (e: unknown) {
        console.log(e);
      }
    })();
  }, []);

  const value = useMemo(
    () => ({
      role,
      setRole,
      program,
      setProgram,
      username,
      setUsername,
      route,
      setRoute,
    }),
    [role, program, username, route],
  );
  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
};
