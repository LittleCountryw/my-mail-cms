<template>
  <div class="login-phone">
    <el-form>
      <el-form-item label="手机号" prop="num">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <div class="get-code">
          <el-input></el-input>
          <el-button type="primary" class="get-btn">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style scoped>
.get-code {
  display: flex;
}
.get-btn {
  margin-left: 8px;
}
</style>
