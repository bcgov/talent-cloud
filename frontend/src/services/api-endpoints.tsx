import type { AxiosResponse } from 'axios';
import { AxiosPrivate } from '../utils';

export const getUserInfo = async (): Promise<AxiosResponse> => {
  return await AxiosPrivate.get('/auth/userInfo');
};
