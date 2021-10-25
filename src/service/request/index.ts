import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { PCRequestInterceptors, PCRequestConfig } from './type'

import { ElLoading } from 'element-plus'
import type { ILoadingInstance } from 'element-plus/lib/components/loading/src/loading.type'

const DEAFULT_LOADING = true

//用类对axios进行封装
class PCRequest {
  instance: AxiosInstance
  interceptors?: PCRequestInterceptors
  showLoading: boolean
  loading?: ILoadingInstance

  constructor(config: PCRequestConfig) {
    //由于PCRequestConfig继承了AxiosRequestConfig，所以相当于多态可以正常调用
    this.instance = axios.create(config)

    //保存基本信息
    this.interceptors = config.interceptors
    this.showLoading = config.showLoading ?? DEAFULT_LOADING

    //1.从config中取出的拦截器是对应实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
    //2.添加所有实例都有的拦截器
    //请求拦截器顺序：后面写的会先执行
    //响应拦截器顺序：前面写的会先执行
    this.instance.interceptors.request.use(
      (config) => {
        console.log('所有实例都有的拦截器:请求成功拦截')
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }
        return config
      },
      (err) => {
        console.log('所有实例都有的拦截器:请求失败拦截')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        console.log('所有实例都有的拦截器:响应成功拦截')
        //服务器有两种返回错误信息的方式
        //2.处于响应成功状态，但是在返回数据中有returnCode，通过其标识到底成功/失败

        //将loading移除
        this.loading?.close()

        const data = res.data
        if (data.returnCode === '1001') {
          console.log('请求失败')
        } else {
          return res.data
        }
      },
      (err) => {
        console.log('所有实例都有的拦截器:响应失败拦截')

        //将loading移除
        this.loading?.close()

        //服务器有两种返回错误信息的方式
        //1.处于响应失败状态，返回HttpErrorCode，
        //通过判断不同的HttpErrorCode来显示不同的错误信息
        if (err.response.status === 404) {
          console.log('404错误')
        }
        return err
      }
    )
  }

  //应该让调用者拿到返回值进行操作，所以可以返回一个promise，让调用者在then里进行处理

  //Promise的泛型T代表promise成功之后resolve的值，resolve(value)
  //即返回给调用处的值，那么我们可以在调用时，告诉request函数这次返回什么类型的值

  request<T>(config: PCRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      //1.单个请求对请求的config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors?.requestInterceptor(config)
      }

      //2.判断是否需要显示loading
      //默认每个实例都有的请求拦截会展示根据showLoading的值展示Loading样式
      //在发送请求时，判断config的showLoading来决定是否修改类中showLoading的值
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        //request的第二个参数会传到返回的Promise<R>中，而Promise的泛型类型又会决定res的类型
        //所以then中res的类型也是T
        //request<T = any, R = AxiosResponse<T>> (config: AxiosRequestConfig): Promise<R>;
        .request<any, T>(config)
        .then((res) => {
          //1.单个请求响应的处理
          if (config.interceptors?.responseInterceptor) {
            //本来responseInterceptor的类型定义中要求参数是一个AxiosResponse
            //但是现在我们将类型改为了T,会出现类型不匹配现象
            //现在我们想做到的是给responseInterceptor一个泛型，
            //根据传递过去的类型决定函数参数的类型

            //那么首先responseInterceptor?: (res: T) => T改成这样
            //T是由PCRequestInterceptors<T = AxiosResponse>接口决定的
            //PCRequestInterceptors又作为PCRequestConfig的一个属性，所以PCRequestConfig<T = AxiosResponse>
            //在request函数中通过config: PCRequestConfig<T>给PCRequestConfig传递T，又传给interceptors?: PCRequestInterceptors<T>
            //最后传给函数esponseInterceptor?: (res: T) => T

            //当在非request中，如对应实例的拦截器中responseInterceptor类型还是axiosResponse

            res = config.interceptors?.responseInterceptor(res)
          }
          //2.将showLoading设置为true，这样不会影响下一个请求
          this.showLoading = DEAFULT_LOADING

          //3.将结果resolve出去
          //request的返回值自动推导出是AxiosResponse<any>，但是其实这个推导是错误的，
          //因为我们在响应拦截中已经对res取了data所以这里的类型就是T

          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T>(config: PCRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: PCRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: PCRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: PCRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default PCRequest
