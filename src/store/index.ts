import { createStore, Store, useStore as useVuexStore } from 'vuex'
//createStore接收一个泛型，这个泛型决定state的类型
import { IRootState, IStoreType } from './types'
import login from './login/login'
import system from './main/system/system'
import dashboard from './main/analysis/dashboard'

import { getPageListData } from '@/service/main/system/system'

const store = createStore<IRootState>({
  state: () => {
    return {
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
    },
    changEntireMenu(state, list) {
      state.entireMenu = list
    }
  },
  getters: {},
  actions: {
    async getInitialDataAction({ commit }) {
      //1.请求部门、角色和菜单数据
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = departmentResult.data

      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleResult.data

      const menuResult = await getPageListData('/menu/list', {
        offset: 0,
        size: 1000
      })
      const { list: menuList } = menuResult.data
      //2.保存数据
      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roleList)
      commit('changEntireMenu', menuList)
    }
  },
  modules: {
    login,
    system,
    dashboard
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
  // 异步请求，当login模块没有获取到token时，直接请求部门角色信息是没有权限的
  //所以应该将请求放在login模块中
  // store.dispatch('getInitialDataAction')
}

export function useStore(): Store<IStoreType> {
  // return useVuexStore<IStoreType>()
  // 相当于自动根据返回值类型传入泛型
  return useVuexStore()
}

export default store
