<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="$emit('close')">
    <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

    <div class="relative w-full max-w-sm glass-card p-6 animate-in">
      <button
        @click="$emit('close')"
        class="absolute top-4 right-4 p-1 text-theme-muted hover:text-theme-text transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>

      <h3 class="text-xl font-semibold text-theme-text mb-6">登录 智搜达</h3>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="text-xs text-theme-muted block mb-1.5">用户名</label>
          <input
            v-model="username"
            type="text"
            placeholder="请输入用户名"
            class="w-full px-4 py-2.5 rounded-lg bg-theme-bg-secondary border border-theme text-theme-text placeholder-theme-muted outline-none focus:border-theme-primary transition-colors"
          />
        </div>

        <div>
          <label class="text-xs text-theme-muted block mb-1.5">密码</label>
          <input
            v-model="password"
            type="password"
            placeholder="请输入密码"
            class="w-full px-4 py-2.5 rounded-lg bg-theme-bg-secondary border border-theme text-theme-text placeholder-theme-muted outline-none focus:border-theme-primary transition-colors"
          />
        </div>

        <!-- 错误提示 -->
        <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>

        <button
          type="submit"
          :disabled="loading || !username || !password"
          class="w-full glow-button py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ loading ? '登录中...' : '登录' }}
        </button>
      </form>

      <p class="text-xs text-theme-muted text-center mt-4">
        登录后可使用更多功能（可选）
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { login } from '../api/pansou.js'

const emit = defineEmits(['close', 'login-success'])

const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

async function handleLogin() {
  if (!username.value || !password.value) return

  loading.value = true
  error.value = ''

  try {
    const result = await login(username.value, password.value)
    localStorage.setItem('zhisouda-token', result.token)
    emit('login-success')
    alert('登录成功！')
  } catch (e) {
    error.value = '用户名或密码错误'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.animate-in {
  animation: dialog-in 0.2s ease-out;
}
@keyframes dialog-in {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
</style>
