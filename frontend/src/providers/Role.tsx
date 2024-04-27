import { Program, Role } from '@/common';
import type { ReactElement } from 'react';
import { createContext, useState } from 'react';
export type User = {
  role: Role;
  program: Program;
  username: string;
};

export type Ctx = {
  user: User;
  setUser: (user: User) => void;
};

const defaultUserValue = {
  role: Role.LOGISTICS,
  program: Program.EMCR,
  username: '',
};

export const RoleContext = createContext<Ctx>({
  user: defaultUserValue,
  setUser: () => {},
});

export const RoleProvider = ({ children }: { children: ReactElement }) => {
  const [user, setUser] = useState<User>(defaultUserValue);

  return (
    <RoleContext.Provider value={{ user, setUser }}>{children}</RoleContext.Provider>
  );
};
