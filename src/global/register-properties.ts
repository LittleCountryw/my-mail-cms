import type { App } from 'vue'
import { formatUtcString } from '@/utils/date-format'

//注册全局属性
export default function registerProperties(app: App) {
  app.config.globalProperties.$filters = {
    formatTime(value: string, format?: string) {
      return formatUtcString(value, format)
    }
  }
}
