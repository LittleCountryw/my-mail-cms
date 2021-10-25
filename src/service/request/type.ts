import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface PCRequestInterceptors<T = AxiosResponse> {
  //这个接口中有四个函数，分别对应着请求拦截成功，请求拦截失败，响应拦截成功，响应拦截失败
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (err: any) => any
}

export interface PCRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: PCRequestInterceptors<T>
  showLoading?: boolean
}
