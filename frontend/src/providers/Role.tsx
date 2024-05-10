import type { Role } from '@/common';

import type { Dispatch, ReactElement, SetStateAction } from 'react';

import { createContext, useState } from 'react';
export enum Program {
  BCWS = 'bcws',
  EMCR = 'emcr',
  ADMIN = 'admin',
}
export const RoleContext = createContext<{
  role: Role | undefined;
  setRole: (role: Role | undefined) => void;
  program: Program | undefined;
  setProgram: (program: Program | undefined) => void;
  route: Program | undefined;
  setRoute: Dispatch<SetStateAction<Program | undefined>>;
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
  const [route, setRoute] = useState<Program | undefined>(
    (localStorage.getItem('route') as Program) ?? Program.BCWS,
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
