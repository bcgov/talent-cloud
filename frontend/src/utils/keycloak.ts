import type Keycloak from 'keycloak-js';

/***
 * @description used to create custom login url for keycloak, intended purpose was to add idps_to_show
 * param to display only specific idps
 * @param kcInstance current instance of keycloak being used
 * @param route custom route portion of redirect
 * @param idpHint keycloak idp hint
 */
export const createCustomLoginUrl = (
  kcInstance: Keycloak,
  route: string,
  idpHint: string,
) => {
  const idps = ['idir'];

  const loginUrl = kcInstance.createLoginUrl({
    idpHint,
    redirectUri: `${window.location}${route}`,
  });
  const fullLoginUrl = loginUrl + `&idps_to_show=${idpHint || idps.join(',')}`;

  return fullLoginUrl;
};

export const logoutUrl = (keycloak: Keycloak) =>
  `https://logon7.gov.bc.ca/clp-cgi/logoff.cgi?retnow=1&returl=${encodeURIComponent(
    `${keycloak.authServerUrl}/realms/${keycloak.realm}/protocol/openid-connect/logout?post_logout_redirect_uri=` +
      `${window.location}` +
      '&id_token_hint=' +
      keycloak.idToken,
  )}`;
