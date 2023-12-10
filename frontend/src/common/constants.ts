export enum RoutePaths {
  DASHBOARD = '/dashboard',
  HOME = '/',
  PROFILE = '/profile',
  WILDCARD = '*',
}

export enum ButtonTypes {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}
export enum LinkTypes {
  PHONE = 'phone',
  EXTERNAL = 'external',
  INTERNAL = 'internal',
}

export const KeycloakVars = {
  URL: process.env.REACT_APP_KEYCLOAK_URL ?? 'http://localhost:8080',
  REALM: process.env.REACT_APP_KEYCLOAK_REALM ?? 'local',
  CLIENT_ID: process.env.REACT_APP_KEYCLOAK_CLIENT ?? 'local-client',
};

export const APP_URL = process.env.REACT_APP_URL ?? 'http://localhost:3050';
