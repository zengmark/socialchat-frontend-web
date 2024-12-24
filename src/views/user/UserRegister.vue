<template>
  <div class="register-container">
    <a-card class="register-card">
      <h2 class="title">用户注册</h2>
      <form @submit.prevent="submitForm">
        <!-- 用户名 -->
        <div class="form-item">
          <label>用户名</label>
          <a-input v-model="form.username" placeholder="请输入用户名" @blur="validateUsername" />
          <p class="error" v-if="errors.username">{{ errors.username }}</p>
        </div>

        <!-- 密码 -->
        <div class="form-item">
          <label>密码</label>
          <a-input-password v-model="form.password" placeholder="请输入密码" @blur="validatePassword" />
          <p class="error" v-if="errors.password">{{ errors.password }}</p>
        </div>

        <!-- 确认密码 -->
        <div class="form-item">
          <label>确认密码</label>
          <a-input-password
              v-model="form.confirmPassword"
              placeholder="请再次输入密码"
              @input="validateConfirmPassword"
          />
          <p class="error" v-if="errors.confirmPassword">{{ errors.confirmPassword }}</p>
        </div>

        <!-- 邮箱 -->
        <div class="form-item">
          <label>邮箱</label>
          <a-input v-model="form.email" placeholder="请输入邮箱" @blur="validateEmail" />
          <p class="error" v-if="errors.email">{{ errors.email }}</p>
        </div>

        <!-- 验证码 -->
        <div class="form-item">
          <label>验证码</label>
          <div class="captcha">
            <a-input v-model="form.code" placeholder="请输入验证码" />
            <a-button
                type="primary"
                :disabled="isCounting"
                @click="sendVerificationCode"
            >
              {{ isCounting ? `${count}s 后重试` : "获取验证码" }}
            </a-button>
          </div>
          <p class="error" v-if="errors.code">{{ errors.code }}</p>
        </div>

        <!-- 操作按钮 -->
        <div class="actions">
          <a-button type="secondary" size="large" @click="goToLogin">返回登录</a-button>
          <a-button type="primary" size="large" html-type="submit">确认注册</a-button>
        </div>
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
  confirmPassword: '',
  email: '',
  code: '',
});

// 错误信息
const errors = ref({
  username: '',
  password: '',
  confirmPassword: '',
  email: '',
  code: '',
});

// 验证码倒计时逻辑
const isCounting = ref(false);
const count = ref(60);
let timer: NodeJS.Timeout | null = null;

// 验证函数
const validateUsername = () => {
  errors.value.username = form.value.username ? '' : '用户名不能为空';
};

const validatePassword = () => {
  errors.value.password = form.value.password
      ? ''
      : '密码不能为空';
};

const validateConfirmPassword = () => {
  if (!form.value.confirmPassword) {
    errors.value.confirmPassword = '请确认密码';
  } else if (form.value.confirmPassword !== form.value.password) {
    errors.value.confirmPassword = '两次输入的密码不一致';
  } else {
    errors.value.confirmPassword = '';
  }
};

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.value.email) {
    errors.value.email = '邮箱不能为空';
  } else if (!emailRegex.test(form.value.email)) {
    errors.value.email = '邮箱格式不正确';
  } else {
    errors.value.email = '';
  }
};

const validateCode = () => {
  errors.value.code = form.value.code ? '' : '验证码不能为空';
};

// 验证码发送逻辑
const sendVerificationCode = () => {
  validateEmail();
  if (errors.value.email) {
    Message.error(errors.value.email);
    return;
  }

  // 模拟验证码发送
  Message.success('验证码已发送至邮箱');
  isCounting.value = true;
  count.value = 60;
  timer = setInterval(() => {
    if (count.value === 0) {
      isCounting.value = false;
      clearInterval(timer!);
    } else {
      count.value -= 1;
    }
  }, 1000);
};

// 提交表单
const submitForm = () => {
  // 验证所有字段
  validateUsername();
  validatePassword();
  validateConfirmPassword();
  validateEmail();
  validateCode();

  // 检查是否存在错误
  const hasErrors = Object.values(errors.value).some((error) => error !== '');

  if (hasErrors) {
    Message.error('表单信息填写错误，请重新填写');
    return;
  }

  // 表单验证通过
  Message.success('注册成功！');
  router.push('/login');
};

// 返回登录页面
const goToLogin = () => {
  router.push('/login');
};
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
}

.register-card {
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

.captcha {
  display: flex;
  gap: 10px;
  align-items: center;
}

.error {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}

.actions {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}
</style>