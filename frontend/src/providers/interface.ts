import {Program, Role } from "@/common";
import { Route } from ".";

export interface User {
  program?: Program;
  //TODO Change to Program
  route?: Route;
  role?: Role;
  username?: string;
  idir?: string;
  member?: boolean;
  supervisor?: boolean;
}

