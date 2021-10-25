import PCRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

import localCache from '@/utils/cache'

//需求一：创建多个axios实例，每个具有不同的BASE_URL
//这样封装的好处是，可以在这里new多个PCRequest,
//调用PCRequest中的构造方法，创造多个具有不同BASE_URL的实例
//因为一个axios实例只有一个BASE_URL

/*
const pcRequest2 = new PCRequest({
  baseURL: BASE_URL2,
  timeout: TIME_OUT2
})
*/

//需求二：不同的axios实例有不同的拦截器，所以我们希望在创建实例时，同时传入这个实例拥有的拦截器
//但是，当config的类型是AxiosRequestConfig时，里面是没有拦截器函数这个属性的
//所以我们需要一个新的类型，这个类型既能接收原有的AxiosRequestConfig，还具备拦截器函数这个属性
const pcRequest = new PCRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      //1.携带token的拦截,给每个请求的header加入token
      const token = localCache.getCache('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      console.log('请求成功的拦截')
      return config
    },
    requestInterceptorCatch: (err) => {
      console.log('请求失败的拦截')
      return err
    },
    responseInterceptor: (res) => {
      console.log('响应成功的拦截')
      return res
    },
    responseInterceptorCatch: (err) => {
      console.log('响应失败的拦截')
      return err
    }
  }
})

export default pcRequest
