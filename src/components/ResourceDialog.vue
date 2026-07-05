<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="$emit('close')">
    <!-- 遮罩 -->
    <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

    <!-- 弹窗 -->
    <div class="relative w-full max-w-lg glass-card p-6 animate-in">
      <!-- 关闭按钮 -->
      <button
        @click="$emit('close')"
        class="absolute top-4 right-4 p-1 text-theme-muted hover:text-theme-text transition-colors"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>

      <!-- 标题 -->
      <h3 class="text-lg font-semibold text-theme-text pr-8 mb-4">{{ item.note || '资源详情' }}</h3>

      <!-- 链接信息 -->
      <div class="space-y-4">
        <div>
          <label class="text-xs text-theme-muted block mb-1">资源地址</label>
          <div class="flex items-center gap-2">
            <input
              :value="item.url"
              readonly
              class="flex-1 px-3 py-2 rounded-lg bg-theme-bg-secondary border border-theme text-theme-text text-sm outline-none"
            />
            <button
              @click="copyText(item.url)"
              class="shrink-0 px-3 py-2 rounded-lg bg-theme-primary/10 text-theme-primary text-sm hover:bg-theme-primary/20 transition-colors"
            >
              复制
            </button>
          </div>
        </div>

        <!-- 提取码 -->
        <div v-if="item.password">
          <label class="text-xs text-theme-muted block mb-1">提取码</label>
          <div class="flex items-center gap-2">
            <input
              :value="item.password"
              readonly
              class="flex-1 px-3 py-2 rounded-lg bg-theme-bg-secondary border border-theme text-theme-primary text-sm font-mono outline-none"
            />
            <button
              @click="copyText(item.password)"
              class="shrink-0 px-3 py-2 rounded-lg bg-theme-primary/10 text-theme-primary text-sm hover:bg-theme-primary/20 transition-colors"
            >
              复制
            </button>
          </div>
        </div>

        <!-- 来源 -->
        <div v-if="item.source">
          <label class="text-xs text-theme-muted block mb-1">来源</label>
          <p class="text-sm text-theme-secondary">{{ item.source }}</p>
        </div>

        <!-- 提示 -->
        <div class="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
          <p class="text-xs text-yellow-500">⏰ 资源可能有时效性，请尽快保存！</p>
        </div>

        <!-- 操作按钮 -->
        <div class="flex items-center gap-3 pt-2">
          <button
            @click="openUrl(item.url)"
            class="flex-1 glow-button text-center text-sm"
          >
            打开链接
          </button>
          <button
            @click="copyFullText()"
            class="flex-1 px-4 py-2.5 rounded-lg border border-theme text-theme-secondary text-sm hover:bg-theme-bg-card transition-colors"
          >
            复制全部
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  item: { type: Object, required: true }
})

defineEmits(['close'])

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    alert('已复制！')
  } catch {
    const ta = document.createElement('textarea')
    ta.value = text
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    document.body.removeChild(ta)
    alert('已复制！')
  }
}

function copyFullText() {
  const text = props.item.url + (props.item.password ? ` 提取码: ${props.item.password}` : '')
  copyText(text)
}

function openUrl(url) {
  window.open(url, '_blank')
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
