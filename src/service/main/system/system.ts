import pcRequest from '@/service'
import { IDataType } from '@/service/types'

export function getPageListData(url: string, queryInfo: any) {
  return pcRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}
// url: /users/id
export function deletePageData(url: string) {
  return pcRequest.delete<IDataType>({
    url: url
  })
}

export function createPageData(url: string, newData: any) {
  return pcRequest.post<IDataType>({
    url: url,
    data: newData
  })
}

export function editPageData(url: string, editData: any) {
  return pcRequest.patch<IDataType>({
    url: url,
    data: editData
  })
}
