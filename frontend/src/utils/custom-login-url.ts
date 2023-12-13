import Keycloak from 'keycloak-js';

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
