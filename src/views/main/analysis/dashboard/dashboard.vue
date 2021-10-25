<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <pc-card title="分类商品数量(饼图)">
          <pie-echart :pieData="categoryGoodsCount"></pie-echart>
        </pc-card>
      </el-col>
      <el-col :span="10">
        <pc-card title="不同城市商品销量">
          <map-echart :mapData="addressGoodsSale"></map-echart>
        </pc-card>
      </el-col>
      <el-col :span="7">
        <pc-card title="分类商品数量(玫瑰图)">
          <rose-echart :roseData="categoryGoodsCount"></rose-echart>
        </pc-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="content-row">
      <el-col :span="12">
        <pc-card title="分类商品的销量">
          <line-echart v-bind="categoryGoodsSale"></line-echart>
        </pc-card>
      </el-col>
      <el-col :span="12">
        <pc-card title="分类商品的收藏">
          <bar-echart v-bind="categoryGoodsFavor"></bar-echart>
        </pc-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import PcCard from '@/base-ui/card'
import {
  PieEchart,
  RoseEchart,
  LineEchart,
  BarEchart,
  MapEchart
} from '@/components/page-echarts'

export default defineComponent({
  name: 'dashboard',
  components: {
    PcCard,
    PieEchart,
    RoseEchart,
    LineEchart,
    BarEchart,
    MapEchart
  },
  setup() {
    //请求数据
    const store = useStore()
    store.dispatch('dashboard/getDashboardDataAction')

    //获取数据
    const categoryGoodsCount = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item: any) => {
        return { name: item.name, value: item.goodsCount }
      })
    })

    const categoryGoodsSale = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      store.state.dashboard.categoryGoodsSale.forEach((item) => {
        xLabels.push(item.name)
        values.push(item.goodsCount)
      })
      return { xLabels, values }
    })

    const categoryGoodsFavor = computed(() => {
      const xLabels: string[] = []
      const values: any[] = []
      store.state.dashboard.categoryGoodsFavor.forEach((item) => {
        xLabels.push(item.name)
        values.push(item.goodsFavor)
      })
      return { xLabels, values }
    })

    const addressGoodsSale = computed(() => {
      return store.state.dashboard.addressGoodsSale.map((item: any) => {
        return { name: item.address, value: item.count }
      })
    })

    return {
      categoryGoodsCount,
      categoryGoodsSale,
      categoryGoodsFavor,
      addressGoodsSale
    }
  }
})
</script>

<style scoped>
.content-row {
  margin-top: 20px;
}
</style>
