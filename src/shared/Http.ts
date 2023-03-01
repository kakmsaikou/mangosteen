import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { mockSession, mockTagIndex } from '../mock/mock';

type JSONValue =
  | string
  | number
  | null
  | boolean
  | JSONValue[]
  | { [key: string]: JSONValue };

export class Http {
  instance: AxiosInstance;
  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
    });
  }
  // CRUD
  // retrieve
  get<R = unknown>(
    url: string,
    query?: Record<string, string>,
    config?: Omit<AxiosRequestConfig, 'url' | 'method' | 'params'>
  ) {
    return this.instance.request<R>({
      ...config,
      url,
      method: 'GET',
      params: query,
    });
  }
  // create
  post<R = unknown>(
    url: string,
    data?: Record<string, JSONValue>,
    config?: Omit<AxiosRequestConfig, 'url' | 'method' | 'data'>
  ) {
    return this.instance.request<R>({ ...config, url, method: 'POST', data });
  }
  // update
  patch<R = unknown>(
    url: string,
    data?: Record<string, JSONValue>,
    config?: Omit<AxiosRequestConfig, 'url' | 'method' | 'data'>
  ) {
    return this.instance.request<R>({
      ...config,
      url,
      method: 'PATCH',
      data,
    });
  }
  // delete
  delete<R = unknown>(
    url: string,
    query?: Record<string, string>,
    config?: Omit<AxiosRequestConfig, 'url' | 'method' | 'params'>
  ) {
    return this.instance.request<R>({
      ...config,
      url,
      method: 'DELETE',
      params: query,
    });
  }
}

const mock = (response: AxiosResponse) => {
  if (
    location.hostname !== 'localhost' &&
    location.hostname !== '127.0.0.1' &&
    location.hostname !== '192.168.3.57'
  ) {
    return false;
  }
  switch (response.config?.params?._mock) {
    case 'tagIndex':
      [response.status, response.data] = mockTagIndex(response.config);
      return true;
    case 'session':
      [response.status, response.data] = mockSession(response.config);
      return true;
  }
  return false;
};

export const http = new Http('/api/v1');

http.instance.interceptors.request.use(config => {
  const jwt = localStorage.getItem('jwt');
  if (jwt) {
    config.headers!.Authorization = `Bearer ${jwt}`;
  }
  return config;
});

http.instance.interceptors.response.use(
  response => {
    // 篡改 response
    mock(response);
    return response;
  },
  error => {
    if (mock(error.response)) {
      return error.response;
    } else {
      throw error;
    }
  }
);

http.instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 429) {
        alert('请求太频繁了');
      }
    }
    throw error;
  }
);
