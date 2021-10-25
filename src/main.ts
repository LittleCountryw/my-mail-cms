import 'normalize.css'
import './assets/css/index.less'

import { createApp } from 'vue'

import App from './App.vue'

import router from './router'
import store from './store'
import { setupStore } from './store'

// import './service/axios.demo'
// import pcRequest from './service'

const app = createApp(App)

// 全局引入element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.use(ElementPlus)

//按需引入 element-plus
import { globalRegister } from './global'
app.use(globalRegister)

app.use(store)

setupStore()
//注意：这里app.use(router)和setupStore()的顺序不能调换
//原因是在执行app.use(router)时会执行其中的install方法
//install方法会获取当前的path并根据当前路径去进行匹配
//当时当前我们没有动态添加路由，所以会匹配到not-found组件

//而将setupStore执行放在前面则提前注册了动态路由，可以解决问题
//路由守卫是在发生回调时执行的函数，由于已经执行了setupStore所以可以正常打印所有注册的领域
//但是由于app.use(router)的匹配错误，to匹配的组件其实是不正确的
app.use(router)

app.mount('#app')

/*
interface DataType {
  data: any
  returnCode: string
  success: boolean
}

pcRequest
  .get<DataType>({
    url: '/home/multidata',
    method: 'GET',
    interceptors: {
      requestInterceptor: (config) => {
        console.log('单独请求的config')
        return config
      },
      responseInterceptor: (res) => {
        console.log('单独响应的res')
        return res
      }
    }
    // showLoading: false
  })
  .then((res) => {
    console.log(res.data)
    console.log(res.returnCode)
    console.log(res.success)
  }) */

/* pcRequest.request({
  url: '/home/multidata',
  method: 'GET'
}) */

console.log(process.env.VUE_APP_BASE_URL)
