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
    redirectUri: `${window.location.origin}${route}`,
  });
  const fullLoginUrl = loginUrl + `&idps_to_show=${idpHint || idps.join(',')}`;

  return fullLoginUrl;
};

export const logout = (kc: Keycloak, route: string) => {
  window.location.href = `https://logon7.gov.bc.ca/clp-cgi/logoff.cgi?retnow=1&returl=${encodeURIComponent(
    `${import.meta.env.VITE_KEYCLOAK_AUTH_URL}/realms/${
      import.meta.env.VITE_KEYCLOAK_REALM
    }/protocol/openid-connect/logout?post_logout_redirect_uri=` +
      `${window.location.origin}${route}` +
      '&id_token_hint=' +
      kc.idToken,
  )}`;
};
