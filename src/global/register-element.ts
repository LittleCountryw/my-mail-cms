import { App } from 'vue'
import { ElAlert, ElForm, ElInput, ElButton, ElTabs } from 'element-plus'
const { ElTabPane } = ElTabs
const components = [ElAlert, ElForm, ElInput, ElButton, ElTabs]

export default function (app: App): void {
  for (const component of components) {
    app.component(component.name, component)
  }
}
