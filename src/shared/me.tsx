import { AxiosResponse } from 'axios';
import { http } from './Http';

export let loggedStatusPromise:
  | Promise<
      AxiosResponse<
        {
          resource: {
            id: number;
          };
        },
        any
      >
    >
  | undefined;

export const refreshLoggedStatus = () => {
  loggedStatusPromise = http.get<{ resource: { id: number } }>('/me');
  return loggedStatusPromise;
};

export const fetchLoggedStatus = refreshLoggedStatus;
