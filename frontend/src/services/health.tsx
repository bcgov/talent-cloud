import { AxiosResponse } from 'axios';
import { AxiosPublic } from '../utils';

export const getAppHealth = async (): Promise<AxiosResponse> => {
  return await AxiosPublic.get('/health/app');
};

export const getDBHealth = async (): Promise<AxiosResponse> => {
  return await AxiosPublic.get('/health/db');
};
