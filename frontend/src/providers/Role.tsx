import type { Role } from '@/common';

import type { Dispatch, ReactElement, SetStateAction } from 'react';

import { createContext, useState } from 'react';
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
  const [route, setRoute] = useState<Route | undefined>(
    (localStorage.getItem('route') as Route) ?? Route.BCWS,
  );

  return (
    <RoleContext.Provider
      value={{
        role,
        setRole,
        username,
        setUsername,
        program,
        setProgram,
        route,
        setRoute,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};
