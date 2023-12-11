import { ReactKeycloakProvider } from '@react-keycloak/web';
import Keycloak from 'keycloak-js';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import store from 'store';
import { ProtectedRoutes } from './ProtectedRoutes';
import { KeycloakVars } from '../common';
import { Loading } from '../components';
import { Dashboard, Login, NotFound, AppHealth, Profile } from '../pages';

export const AppRoutes = () => {
  const authClient = new Keycloak({
    realm: KeycloakVars.REALM,
    url: KeycloakVars.URL,
    clientId: KeycloakVars.CLIENT_ID,
  });

  const handleTokens = (tokens: any) => {
    store.set('TOKENS', tokens);
  };

  return (
    <ReactKeycloakProvider
      authClient={authClient}
      autoRefreshToken={true}
      onTokens={handleTokens}
      LoadingComponent={<Loading />}
    >
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<AppHealth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ReactKeycloakProvider>
  );
};
