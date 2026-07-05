<template>
  <header class="sticky top-0 z-50 bg-theme-bg/80 backdrop-blur-xl border-b border-theme">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex items-center gap-8">
          <a href="/" class="flex items-center gap-2" @click.prevent="$emit('clear')">
            <span class="text-2xl font-bold gradient-text tracking-tight">智搜达</span>
          </a>
          <nav class="hidden md:flex items-center gap-6">
            <a href="/" class="text-sm text-theme-secondary hover:text-theme-primary transition-colors" @click.prevent="$emit('clear')">首页</a>
            <a href="#hot" class="text-sm text-theme-secondary hover:text-theme-primary transition-colors" @click.prevent="$emit('clear')">热搜</a>
          </nav>
        </div>

        <!-- 右侧操作区 -->
        <div class="flex items-center gap-4">
          <!-- 主题切换 -->
          <ThemeSwitcher />

          <!-- 分隔线 -->
          <div class="w-px h-6 bg-theme-border"></div>

          <!-- 登录按钮 -->
          <button
            v-if="!isLoggedIn"
            @click="$emit('toggle-login')"
            class="text-sm text-theme-secondary hover:text-theme-primary transition-colors"
          >
            登录
          </button>
          <button
            v-else
            @click="handleLogout"
            class="text-sm text-theme-secondary hover:text-theme-primary transition-colors"
          >
            退出
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import ThemeSwitcher from './ThemeSwitcher.vue'

defineEmits(['toggle-login', 'clear'])

const isLoggedIn = ref(!!localStorage.getItem('zhisouda-token'))

function handleLogout() {
  localStorage.removeItem('zhisouda-token')
  isLoggedIn.value = false
  window.location.reload()
}
</script>
