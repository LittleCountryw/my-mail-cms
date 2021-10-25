<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="users"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>
    <page-modal
      :modalConfig="modalConfigRef"
      ref="PageModalRef"
      :defaultInfo="defaultInfo"
      pageName="users"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'

export default defineComponent({
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  name: 'user',
  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()

    //pageModal相关hook逻辑(可以在页面中修改modalConfig的一些配置，然后再将修改过的modalConfig返回绑定)
    //1.处理密码的逻辑
    const newCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = false
    }
    const editCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = true
    }

    //2.动态添加部门和角色列表（注意：修改的是自己页面的config，所以写在自己的页面逻辑中，而不是写在公共的pageModal组件中）
    const store = useStore()
    // 由于setup只执行一次，如果不包括在computed，watch或直接在模板中引用，vuex数据发生变化时，也不会引起页面的刷新
    // 这种情况下我们要将其包裹在computed中，当vuex数据发生改变，computed重新执行，引用处重新刷新
    const modalConfigRef = computed(() => {
      const departmentItem = modalConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )
      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return { title: item.name, value: item.id }
      })
      const roleItem = modalConfig.formItems.find(
        (item) => item.field === 'roleId'
      )
      roleItem!.options = store.state.entireRole.map((item) => {
        return { title: item.name, value: item.id }
      })
      return modalConfig
    })

    const [PageModalRef, defaultInfo, handleNewData, handleEditData] =
      usePageModal(newCallback, editCallback)
    return {
      searchFormConfig,
      contentTableConfig,
      modalConfigRef,
      pageContentRef,
      PageModalRef,
      handleResetClick,
      handleQueryClick,
      handleNewData,
      handleEditData,
      defaultInfo
    }
  }
})
</script>

<style scoped></style>
