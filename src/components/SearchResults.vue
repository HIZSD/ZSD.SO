<template>
  <div>
    <!-- 结果头部 -->
    <div class="flex items-center justify-between mb-4">
      <div>
        <h2 class="text-lg font-semibold text-theme-text">
          搜索结果：<span class="text-theme-primary">"{{ keyword }}"</span>
        </h2>
        <p class="text-xs text-theme-muted mt-1">
          共 {{ totalCount }} 条结果 · 耗时 {{ searchTime }}ms
        </p>
      </div>
    </div>

    <!-- 网盘类型 Tabs -->
    <DiskTabs
      :merged-data="results.merged_by_type"
      :active="activeTab"
      @select="activeTab = $event"
    />

    <!-- 加载中 -->
    <div v-if="loading" class="space-y-4">
      <div v-for="i in 5" :key="i" class="glass-card p-4">
        <div class="skeleton h-5 w-3/4 mb-3"></div>
        <div class="skeleton h-3 w-1/2 mb-2"></div>
        <div class="skeleton h-4 w-1/3"></div>
      </div>
    </div>

    <!-- 结果列表 -->
    <div v-else-if="currentResults.length > 0" class="space-y-3">
      <ResultCard
        v-for="(item, idx) in currentResults"
        :key="idx"
        :item="item"
        :disk-type="activeTab === 'all' ? item.type || '' : activeTab"
        @open="$emit('open-resource', $event)"
      />
    </div>

    <!-- 空状态 -->
    <div v-else class="text-center py-16">
      <svg class="w-16 h-16 mx-auto text-theme-muted mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
      </svg>
      <p class="text-theme-secondary">没有找到相关资源，试试其他关键词</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import DiskTabs from './DiskTabs.vue'
import ResultCard from './ResultCard.vue'

const props = defineProps({
  results: { type: Object, default: null },
  keyword: { type: String, default: '' },
  loading: { type: Boolean, default: false },
  searchTime: { type: Number, default: 0 }
})

defineEmits(['open-resource'])

const activeTab = ref('all')

const currentResults = computed(() => {
  if (!props.results || !props.results.merged_by_type) return []

  if (activeTab.value === 'all') {
    const all = []
    for (const [type, links] of Object.entries(props.results.merged_by_type)) {
      if (Array.isArray(links)) {
        links.forEach(link => all.push({ ...link, type }))
      }
    }
    return all
  }

  const links = props.results.merged_by_type[activeTab.value]
  return Array.isArray(links) ? links : []
})

const totalCount = computed(() => {
  if (!props.results || !props.results.merged_by_type) return 0
  let count = 0
  for (const links of Object.values(props.results.merged_by_type)) {
    if (Array.isArray(links)) count += links.length
  }
  return count
})
</script>
