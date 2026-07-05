<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <!-- 热搜榜 -->
    <div class="glass-card p-5">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-base font-semibold text-theme-text">🔥 热搜榜</h3>
        <span class="text-xs text-theme-muted">{{ todayDate }}</span>
      </div>
      <div v-if="hotSearches.length > 0" class="space-y-2">
        <div
          v-for="(item, idx) in hotSearches.slice(0, 15)"
          :key="idx"
          @click="$emit('search', item.word)"
          class="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-theme-bg-card transition-colors group"
        >
          <span
            class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
            :class="rankClass(idx)"
          >{{ idx + 1 }}</span>
          <span class="text-sm text-theme-text group-hover:text-theme-primary transition-colors truncate flex-1">
            {{ item.word }}
          </span>
          <span class="text-xs text-theme-muted shrink-0">{{ item.count }}次</span>
        </div>
      </div>
      <div v-else class="text-center py-8 text-theme-muted text-sm">
        暂无热搜数据，开始搜索吧！
      </div>
    </div>

    <!-- 新片榜（静态示例数据） -->
    <div class="glass-card p-5">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-base font-semibold text-theme-text">🎬 新片榜</h3>
        <span class="text-xs text-theme-muted">{{ todayDate }}</span>
      </div>
      <div class="space-y-2">
        <div
          v-for="(item, idx) in newMovies"
          :key="idx"
          @click="$emit('search', item.name)"
          class="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-theme-bg-card transition-colors group"
        >
          <span class="w-6 h-6 rounded flex items-center justify-center text-xs font-bold shrink-0 bg-theme-primary/10 text-theme-primary">
            {{ idx + 1 }}
          </span>
          <div class="flex-1 min-w-0">
            <span class="text-sm text-theme-text group-hover:text-theme-primary transition-colors truncate block">
              {{ item.name }}
            </span>
            <span class="text-xs text-theme-muted">{{ item.year }}</span>
          </div>
        </div>
      </div>
      <div class="mt-3 text-center">
        <a href="#" class="text-xs text-theme-primary hover:underline" @click.prevent="$emit('search', '最新电影')">查看更多 →</a>
      </div>
    </div>

    <!-- 好评榜（静态示例数据） -->
    <div class="glass-card p-5">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-base font-semibold text-theme-text">⭐ 好评榜</h3>
        <span class="text-xs text-theme-muted">{{ todayDate }}</span>
      </div>
      <div class="space-y-2">
        <div
          v-for="(item, idx) in topRated"
          :key="idx"
          @click="$emit('search', item.name)"
          class="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-theme-bg-card transition-colors group"
        >
          <span class="w-6 h-6 rounded flex items-center justify-center text-xs font-bold shrink-0 bg-yellow-500/20 text-yellow-500">
            {{ idx + 1 }}
          </span>
          <div class="flex-1 min-w-0">
            <span class="text-sm text-theme-text group-hover:text-theme-primary transition-colors truncate block">
              {{ item.name }}
            </span>
            <span class="text-xs text-theme-muted">{{ item.rating }}分</span>
          </div>
        </div>
      </div>
      <div class="mt-3 text-center">
        <a href="#" class="text-xs text-theme-primary hover:underline" @click.prevent="$emit('search', '高分电影')">查看更多 →</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  hotSearches: { type: Array, default: () => [] }
})

defineEmits(['search'])

const todayDate = computed(() => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
})

const newMovies = [
  { name: '哪吒之魔童闹海', year: '2025' },
  { name: '封神第二部', year: '2025' },
  { name: '唐探1900', year: '2025' },
  { name: '蛟龙行动', year: '2025' },
  { name: '熊出没·重启未来', year: '2025' },
  { name: '扫黑·决不放弃', year: '2025' },
  { name: '来都来了', year: '2025' },
  { name: '射雕英雄传', year: '2025' },
]

const topRated = [
  { name: '肖申克的救赎', rating: '9.7' },
  { name: '霸王别姬', rating: '9.6' },
  { name: '阿甘正传', rating: '9.5' },
  { name: '泰坦尼克号', rating: '9.4' },
  { name: '千与千寻', rating: '9.4' },
  { name: '星际穿越', rating: '9.4' },
  { name: '盗梦空间', rating: '9.3' },
  { name: '楚门的世界', rating: '9.3' },
]

function rankClass(idx) {
  if (idx === 0) return 'bg-red-500/20 text-red-500'
  if (idx === 1) return 'bg-orange-500/20 text-orange-500'
  if (idx === 2) return 'bg-yellow-500/20 text-yellow-500'
  return 'bg-theme-bg-card text-theme-muted'
}
</script>
