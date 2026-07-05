<template>
  <div class="text-center pt-8 pb-6">
    <!-- 标题 -->
    <h1 class="text-4xl sm:text-5xl font-bold mb-2">
      <span class="gradient-text">一站式 网盘资源搜索</span>
    </h1>
    <p class="text-theme-secondary text-sm sm:text-base mb-8">
      聚合多个网盘来源，快速找到可用链接
    </p>

    <!-- 搜索框 -->
    <div class="max-w-2xl mx-auto mb-4">
      <div class="relative group">
        <input
          ref="inputRef"
          v-model="kw"
          type="text"
          placeholder="输入关键词搜索..."
          class="w-full h-14 px-6 pr-24 rounded-xl bg-theme-bg-card border border-theme text-theme-text placeholder-theme-muted text-lg outline-none transition-all duration-300 group-hover:border-theme-hover focus:border-theme-primary focus:shadow-lg focus:shadow-theme-primary/10"
          @keydown.enter="doSearch"
        />
        <div class="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <button
            v-if="kw"
            @click="clearInput"
            class="p-2 text-theme-muted hover:text-theme-text transition-colors"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
          <button
            @click="doSearch"
            :disabled="loading || !kw.trim()"
            class="glow-button flex items-center gap-2 px-6 h-10"
          >
            <svg v-if="loading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            {{ loading ? '搜索中...' : '搜索' }}
          </button>
        </div>
      </div>
    </div>

    <!-- 分类 Tabs -->
    <CategoryTabs
      :model-value="category"
      @select="(cat) => { selectedCat = cat; if (kw.trim()) doSearch(); }"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CategoryTabs from './CategoryTabs.vue'

const props = defineProps({
  keyword: { type: String, default: '' },
  category: { type: String, default: '' },
  loading: { type: Boolean, default: false }
})

const emit = defineEmits(['search', 'clear'])

const kw = ref(props.keyword)
const selectedCat = ref(props.category)

function doSearch() {
  if (!kw.value.trim() || props.loading) return
  emit('search', kw.value.trim(), selectedCat.value)
}

function clearInput() {
  kw.value = ''
  emit('clear')
}
</script>
