import type { App } from 'vue'

// import registerElement from './register-element'
import registerProperties from './register-properties'

export function globalRegister(app: App): void {
  //以函数的方式注册插件
  // app.use(registerElement)
  app.use(registerProperties)
}
