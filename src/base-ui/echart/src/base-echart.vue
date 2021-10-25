<template>
  <div class="base-echart">
    <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, withDefaults, watchEffect } from 'vue'
import { EChartsOption } from 'echarts'
import useEchart from '../hooks/useEchart'

const echartDivRef = ref<HTMLElement>()

// 直接使用defineProps(),只能使用js类型，如果想用ts则传泛型
// defineProps({
//   name: String
// })

// 用withDefaults函数设置默认值，第一个参数放defineProps(类型),第二个参数放默认值
const props = withDefaults(
  defineProps<{
    options: EChartsOption
    width?: string
    height?: string
  }>(),
  {
    width: '100%',
    height: '360px'
  }
)

onMounted(() => {
  const { setOptions } = useEchart(echartDivRef.value!)

  watchEffect(() => {
    setOptions(props.options)
  })
})
</script>

<style scoped></style>
