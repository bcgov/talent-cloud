import { JwtPayload } from 'jsonwebtoken';

export enum Role {
  COORDINATOR = 'coordinator',
}

export interface Token extends JwtPayload {
  exp: number;
  iat: number;
  auth_time: number;
  jti: string;
  iss: string;
  aud: string;
  sub: string;
  typ: string;
  azp: string;
  nonce: string;
  session_state: string;
  acr: string;
  'allowed-origins': string[];
  realm_access: {
    roles: string[];
  };
  resource_access: ResourceAccess;
  scope: string;
  sid: string;
  email_verified: boolean;
  preferred_username: string;
  name: string;
  given_name: string;
  family_name: string;
  email: string;
}

interface ResourceAccess {
  account: { roles: Role[] };
  [key: string]: { roles: Role[] };
}
