import type { AxiosResponse } from 'axios';
import { AxiosPrivate, AxiosPublic } from '../utils';

export const getUserInfo = async (): Promise<AxiosResponse> => {
  return AxiosPrivate.get('/auth/userInfo');
};

export const getKeycloakInfo = async (): Promise<{
  data: { authUrl: string; client: string; realm: string };
}> => {
  return AxiosPublic.get('/keycloak');
};
