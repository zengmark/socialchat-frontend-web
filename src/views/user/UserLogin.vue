<template>
  <div class="login-container">
    <a-card class="login-card">
      <h2 class="title">用户登录</h2>
      <form @submit.prevent="submitLogin">
        <!-- 账号 -->
        <div class="form-item">
          <label>账号</label>
          <a-input v-model="form.username" placeholder="请输入账号" @blur="validateUsername" />
          <p class="error" v-if="errors.username">{{ errors.username }}</p>
        </div>

        <!-- 密码 -->
        <div class="form-item">
          <label>密码</label>
          <a-input-password v-model="form.password" placeholder="请输入密码" @blur="validatePassword" />
          <p class="error" v-if="errors.password">{{ errors.password }}</p>
        </div>

        <!-- 登录按钮 -->
        <div class="actions">
          <a-button type="primary" size="large" html-type="submit">登录</a-button>
        </div>

        <!-- 提示信息 -->
        <p class="register-hint">
          如果还没有账号，请创建一个<a @click="goToRegister">新账号</a>
        </p>
      </form>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Message } from '@arco-design/web-vue';

// 路由实例
const router = useRouter();

// 表单数据
const form = ref({
  username: '',
  password: '',
});

// 错误信息
const errors = ref({
  username: '',
  password: '',
});

// 验证函数
const validateUsername = () => {
  errors.value.username = form.value.username ? '' : '账号不能为空';
};

const validatePassword = () => {
  errors.value.password = form.value.password ? '' : '密码不能为空';
};

// 提交表单
const submitLogin = () => {
  // 验证所有字段
  validateUsername();
  validatePassword();

  // 检查是否存在错误
  const hasErrors = Object.values(errors.value).some((error) => error !== '');

  if (hasErrors) {
    Message.error('表单信息填写错误，请重新填写');
    return;
  }

  // 模拟登录逻辑
  Message.success('登录成功！');
  // TODO: 登录成功后的跳转逻辑
};

// 跳转到注册页面
const goToRegister = () => {
  router.push('/register');
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
}

.login-card {
  width: 380px;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

.form-item {
  margin-bottom: 16px;
}

.form-item label {
  display: block;
  font-weight: bold;
  margin-bottom: 6px;
  font-size: 14px;
}

a-input,
a-input-password {
  width: 100%;
  height: 40px;
  padding: 0 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

a-input:focus,
a-input-password:focus {
  border-color: #40a9ff;
  box-shadow: 0 0 5px rgba(24, 144, 255, 0.3);
  outline: none;
}

.error {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}

.actions {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.register-hint {
  text-align: center;
  margin-top: 10px;
  font-size: 14px;
  color: #666;
}

.register-hint a {
  color: #40a9ff;
  text-decoration: underline;
  cursor: pointer;
}
</style>