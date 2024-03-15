import { AxiosPublic } from '@/utils';

export const getKeycloakInfo = async (): Promise<{
  data: { authUrl: string; client: string; realm: string };
}> => {
  return AxiosPublic.get('/keycloak');
};
