import * as echarts from 'echarts'
import chinaMapData from '../data/china.json'

//注册中国地图
echarts.registerMap('china', chinaMapData)

export default function (el: HTMLElement) {
  const echartInstance = echarts.init(el)

  const setOptions = (options: echarts.EChartsOption) => {
    echartInstance.setOption(options)
  }

  //监听页面大小改变,同时对echart进行缩放
  window.addEventListener('resize', () => {
    echartInstance.resize()
  })

  //当侧边栏发生变化时，要手动调用resize方法???
  const updateSize = () => {
    echartInstance.resize()
  }

  return {
    echartInstance,
    setOptions,
    updateSize
  }
}
