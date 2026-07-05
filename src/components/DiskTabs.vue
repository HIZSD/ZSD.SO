<template>
  <div class="flex items-center gap-2 flex-wrap border-b border-theme pb-3 mb-4">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      @click="$emit('select', tab.id)"
      class="px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-300"
      :class="active === tab.id
        ? 'bg-theme-primary/20 text-theme-primary border border-theme-primary/30'
        : 'text-theme-muted hover:text-theme-secondary hover:bg-theme-bg-card'"
    >
      {{ tab.label }}
      <span v-if="tab.count" class="ml-1.5 text-xs opacity-70">({{ tab.count }})</span>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  mergedData: { type: Object, default: () => ({}) },
  active: { type: String, default: 'all' }
})

defineEmits(['select'])

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

const tabs = computed(() => {
  const result = [{ id: 'all', label: '全部' }]

  if (!props.mergedData) return result

  let totalCount = 0
  for (const [type, links] of Object.entries(props.mergedData)) {
    if (Array.isArray(links) && links.length > 0) {
      const label = DISK_LABELS[type] || type
      result.push({ id: type, label, count: links.length })
      totalCount += links.length
    }
  }

  if (result.length > 1) {
    result[0].count = totalCount
  }

  return result
})
</script>
