import Keycloak from 'keycloak-js';
import store from 'store';
import { KeycloakVars } from '../common';

const _kc = new Keycloak({
  realm: KeycloakVars.REALM,
  url: KeycloakVars.URL,
  clientId: KeycloakVars.CLIENT_ID,
});
// since we have to perform logout at siteminder, we cannot use keycloak-js logout method so manually triggering logout through a function
// if using post_logout_redirect_uri, then either client_id or id_token_hint has to be included and post_logout_redirect_uri need to match
// one of valid post logout redirect uris in the client configuration

const logout = () => {
  store.remove('TOKEN');
  window.location.href = `https://logon7.gov.bc.ca/clp-cgi/logoff.cgi?retnow=1&returl=${encodeURIComponent(
    `${process.env.REACT_APP_SSO_AUTH_SERVER_URL}/realms/${process.env.REACT_APP_SSO_REALM}/protocol/openid-connect/logout?post_logout_redirect_uri=` +
      process.env.REACT_APP_SSO_REDIRECT_URI +
      '&id_token_hint=' +
      _kc.idToken,
  )}`;
};

export { _kc, logout };
