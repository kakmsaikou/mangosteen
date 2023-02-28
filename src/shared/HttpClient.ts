import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
type JSONValue = string | number | null | boolean | JSONValue[] | { [key: string]: JSONValue };

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
    return this.instance.request<R>({ ...config, url, method: 'GET', params: query });
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
    return this.instance.request<R>({ ...config, url, method: 'PATCH', data });
  }
  // delete
  delete<R = unknown>(
    url: string,
    query?: Record<string, string>,
    config?: Omit<AxiosRequestConfig, 'url' | 'method' | 'params'>
  ) {
    return this.instance.request<R>({ ...config, url, method: 'DELETE', params: query });
  }
}

export const http = new Http('/api/v1');
