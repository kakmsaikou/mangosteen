import { AxiosResponse } from 'axios';
import { http } from './Http';

export let loggedStatusPromise:| Promise<AxiosResponse<Resource<User>>| undefined>

export const refreshLoggedStatus = () => {
  loggedStatusPromise = http.get<Resource<User>>('/me');
  return loggedStatusPromise;
};

export const fetchLoggedStatus = refreshLoggedStatus;
