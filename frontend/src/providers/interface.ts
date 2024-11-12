import {Program, Role, Status } from "@/common";

export interface User {
  program?: Program;
  role?: Role;
  status?: Status;
  username: string;
  idir: string;
  loading: boolean;
}

