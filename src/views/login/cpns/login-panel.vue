<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" v-model="currentTab" stretch>
      <el-tab-pane name="account">
        <!-- 通过具名slot自定义标签名内容 -->
        <template #label>
          <span><i class="el-icon-user-solid"></i>账号登录</span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>

      <el-tab-pane name="phone">
        <template #label>
          <span><i class="el-icon-mobile-phone"></i>手机登录</span>
        </template>
        <login-phone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>

    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button type="primary" class="login-btn" @click="handleLoginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'
export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone
  },
  setup() {
    // 在单选的checkbox上使用v-model时,绑定值的内容是true/false
    const isKeepPassword = ref(true)

    //父组件只起到搭建结构和通知子组件登录按钮点击,
    //校验及真正的登录逻辑由子组件的方法来实现，
    //所以可以在父组件中监听按钮点击然后调用子组件中的登录方法

    //使用ref获取组件实例的方法
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()
    const currentTab = ref('account')

    const handleLoginClick = () => {
      if (currentTab.value === 'account') {
        accountRef.value?.loginAction(isKeepPassword.value)
      } else {
        // phoneRef.value?.loginAction()
        console.log('phoneRef调用loginAction')
      }
    }
    return {
      isKeepPassword,
      accountRef,
      phoneRef,
      currentTab,
      handleLoginClick
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  margin-bottom: 150px;
  width: 320px;
}
.title {
  text-align: center;
}
.account-control {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
.login-btn {
  width: 100%;
  margin-top: 10px;
}
</style>
