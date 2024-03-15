import type { AxiosError } from 'axios';
import axios from 'axios';

export const AxiosPublic = axios.create({
  baseURL: `/api/v1`,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
  },
});

AxiosPublic.interceptors.response.use((response) => response);

export const getGenericError = (error: AxiosError) => error?.response?.data;
