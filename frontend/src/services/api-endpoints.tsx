import { AxiosInstance } from '@/hooks/useAxios';


export const getKeycloakInfo = async (): Promise<{
  data: { authUrl: string; client: string; realm: string };
}> => {
  return AxiosInstance.get('/keycloak');
};


