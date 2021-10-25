import { ref } from 'vue'
import PageModal from '@/components/page-modal'

type CallbackFn = (item?: any) => void
export function usePageModal(newCb?: CallbackFn, editCb?: CallbackFn) {
  const PageModalRef = ref<InstanceType<typeof PageModal>>()
  const defaultInfo = ref({})
  const handleNewData = () => {
    defaultInfo.value = {}
    // console.log(PageModalRef.value)
    if (PageModalRef.value) {
      PageModalRef.value.dialogVisible = true
    }
    newCb && newCb()
  }
  const handleEditData = (item: any) => {
    // 将点击行的值传给PageModal，由form进行展示
    // 那么还想把点击行的值传给role,由role中的el-tree来展示
    // 其实可以把传出的defaultValue交给el-tree的，这里采用另一种做法
    defaultInfo.value = { ...item }
    if (PageModalRef.value) {
      PageModalRef.value.dialogVisible = true
    }
    editCb && editCb(item)
  }
  return [PageModalRef, defaultInfo, handleNewData, handleEditData]
}
