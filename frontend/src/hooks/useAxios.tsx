import { useEffect } from 'react';
import type { AxiosError, AxiosResponse } from 'axios';
import axios from 'axios';
import { useKeycloak } from '@react-keycloak/web';

export const AxiosPrivate = axios.create({
  baseURL: `/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const useAxios = () => {
  const { keycloak } = useKeycloak();

  const RequestResponseInterceptor = (config: any) => {
    if (keycloak?.token) {
      config.headers = {
        Authorization: `Bearer ${keycloak.token}`,
        // rest of the headers...
      };
    }
    return config;
  };

  const RequestErrorInterceptor = async (error: AxiosError) => Promise.reject(error);

  const ResponseInterceptor = async (response: AxiosResponse) => {
    return response;
  };

  const ResponseErrorInterceptor = async (error: AxiosError) => {
    return Promise.reject(error);
  };

  useEffect(() => {
    const reqInterceptor = AxiosPrivate.interceptors.request.use(
      RequestResponseInterceptor,
      RequestErrorInterceptor,
    );

    const resInterceptor = AxiosPrivate.interceptors.response.use(
      ResponseInterceptor,
      ResponseErrorInterceptor,
    );

    return () => {
      AxiosPrivate.interceptors.request.eject(reqInterceptor);

      AxiosPrivate.interceptors.response.eject(resInterceptor);
    };
  }, [keycloak?.token]);

  return {
    AxiosPrivate,
  };
};
