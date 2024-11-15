import { useEffect } from 'react';
import type { AxiosError, AxiosResponse } from 'axios';
import axios from 'axios';
import { useKeycloak } from '@react-keycloak/web';

export const AxiosInstance = axios.create({
  baseURL: `/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

AxiosInstance.interceptors.response.use((response) => response);

export const getGenericError = (error: AxiosError) => error?.response?.data;

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
    const reqInterceptor = AxiosInstance.interceptors.request.use(
      RequestResponseInterceptor,
      RequestErrorInterceptor,
    );

    const resInterceptor = AxiosInstance.interceptors.response.use(
      ResponseInterceptor,
      ResponseErrorInterceptor,
    );

    return () => {
      AxiosInstance.interceptors.request.eject(reqInterceptor);

      AxiosInstance.interceptors.response.eject(resInterceptor);
    };
  }, [keycloak?.token]);

  return {
    AxiosPrivate: AxiosInstance,
  };
};
