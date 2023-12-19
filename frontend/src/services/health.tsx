import { AxiosResponse } from 'axios';
import { AxiosPrivate, AxiosPublic } from '../utils';

export const getAppHealth = async (): Promise<AxiosResponse> => {
  return await AxiosPublic.get('/health');
};

export const getAuth = async (): Promise<AxiosResponse> => {
  return await AxiosPrivate.get('/auth');
};
