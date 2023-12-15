import { JwtPayload } from 'jsonwebtoken';

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
  resource_access: {
    'local-client': {
      roles: ['coordinator'];
    };
    account: { roles: Role[] };
  };
  scope: string;
  sid: string;
  email_verified: boolean;
  preferred_username: string;
  name: string;
  given_name: string;
  family_name: string;
  email: string;
}

export enum Role {
  Manage_Account = 'manage-account',
  Manage_Account_Links = 'manage-account-links',
  View_Profile = 'view-profile',
  Coordinator = 'coordinator',
}
