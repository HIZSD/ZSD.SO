<template>
  <div class="max-w-2xl mx-auto mt-8">
    <div class="glass-card p-5">
      <h3 class="text-sm text-theme-secondary mb-4 text-center">今日概览</h3>
      <div class="grid grid-cols-3 gap-4">
        <div class="text-center">
          <div class="text-2xl font-bold gradient-text">{{ formatNum(stats.todaySearches) }}</div>
          <div class="text-xs text-theme-muted mt-1">今日搜索</div>
        </div>
        <div class="text-center border-x border-theme">
          <div class="text-2xl font-bold gradient-text">{{ formatNum(stats.totalSearches) }}</div>
          <div class="text-xs text-theme-muted mt-1">总搜索量</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold gradient-text">{{ stats.avgTime }}ms</div>
          <div class="text-xs text-theme-muted mt-1">平均耗时</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  stats: { type: Object, required: true }
})

function formatNum(num) {
  if (!num && num !== 0) return '0'
  if (num >= 10000) return (num / 10000).toFixed(1) + 'W'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
  return String(num)
}
</script>
