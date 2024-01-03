import axios, { AxiosError } from 'axios';
import store from 'store';
import { APP_URL } from '../common';

export const AxiosPublic = axios.create({
  baseURL: `${APP_URL}/api`,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
  },
});

export const AxiosPrivate = axios.create({
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
  },
  baseURL: `${APP_URL}/api`,
});

AxiosPublic.interceptors.response.use((response) => response);
AxiosPrivate.interceptors.response.use((response) => response);
AxiosPrivate.interceptors.request.use((config) => {
  const token = store.get('TOKEN');

  if (token) {
    // Provide fallback to access token if present
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

export const getGenericError = (error: AxiosError) => error?.response?.data;
