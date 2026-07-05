<template>
  <div
    class="glass-card p-4 cursor-pointer group"
    @click="$emit('open', item)"
  >
    <div class="flex items-start justify-between gap-4">
      <div class="flex-1 min-w-0">
        <!-- 标题 -->
        <h4 class="text-base font-medium text-theme-text truncate group-hover:text-theme-primary transition-colors">
          {{ item.note || '未知资源' }}
        </h4>

        <!-- 来源信息 -->
        <div class="flex items-center gap-3 mt-2 text-xs text-theme-muted">
          <span v-if="item.source" class="flex items-center gap-1">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            {{ item.source }}
          </span>
          <span v-if="item.datetime" class="flex items-center gap-1">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            {{ formatDate(item.datetime) }}
          </span>
        </div>

        <!-- 链接和密码 -->
        <div class="flex items-center gap-2 mt-3">
          <span class="inline-block px-2 py-0.5 rounded text-xs font-medium bg-theme-primary/10 text-theme-primary">
            {{ diskLabel }}
          </span>
          <span class="text-xs text-theme-muted truncate max-w-[200px] sm:max-w-[300px]">
            {{ item.url }}
          </span>
          <span v-if="item.password" class="text-xs text-theme-primary">
            提取码: {{ item.password }}
          </span>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="flex items-center gap-2 shrink-0" @click.stop>
        <button
          @click="copyLink(item)"
          class="p-2 rounded-lg text-theme-muted hover:text-theme-primary hover:bg-theme-primary/10 transition-all"
          title="复制链接"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/>
          </svg>
        </button>
        <button
          @click="$emit('open', item)"
          class="p-2 rounded-lg text-theme-muted hover:text-theme-primary hover:bg-theme-primary/10 transition-all"
          title="查看详情"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  item: { type: Object, required: true },
  diskType: { type: String, default: '' }
})

defineEmits(['open'])

const DISK_LABELS = {
  baidu: '百度网盘',
  aliyun: '阿里云盘',
  quark: '夸克网盘',
  xunlei: '迅雷网盘',
  '115': '115网盘',
  pikpak: 'PikPak',
  tianyi: '天翼云盘',
  uc: 'UC网盘',
  mobile: '移动云盘',
  '123': '123云盘',
  guangya: '光鸭云盘',
  magnet: '磁力链接',
  ed2k: '电驴链接',
  others: '其他'
}

const diskLabel = DISK_LABELS[props.diskType || props.item.disk_type] || props.item.disk_type || '其他'

function formatDate(dateStr) {
  if (!dateStr) return ''
  try {
    const d = new Date(dateStr)
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
  } catch {
    return dateStr
  }
}

async function copyLink(item) {
  try {
    const text = item.url + (item.password ? ` 提取码: ${item.password}` : '')
    await navigator.clipboard.writeText(text)
    alert('链接已复制！')
  } catch {
    // fallback
    const ta = document.createElement('textarea')
    ta.value = item.url
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    document.body.removeChild(ta)
    alert('链接已复制！')
  }
}
</script>
