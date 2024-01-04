export const KeycloakVars = {
  URL: process.env.REACT_APP_SSO_AUTH_SERVER_URL ?? 'http://localhost:8080',
  REALM: process.env.REACT_APP_SSO_REALM ?? 'local',
  CLIENT_ID: process.env.REACT_APP_SSO_CLIENT_ID ?? 'local-client',
};

export const APP_URL = process.env.REACT_APP_URL ?? 'http://localhost:3050';

export const APP_NAME = 'Talent Cloud';
