<template>
  <div class="min-h-screen bg-theme-bg bg-grid">
    <!-- 头部 -->
    <SiteHeader
      @search="handleHeaderSearch"
      @toggle-login="showLoginDialog = true"
    />

    <!-- 主内容 -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <!-- 搜索区域 -->
      <SearchHero
        :keyword="search.keyword.value"
        :category="search.category.value"
        :loading="search.loading.value"
        @search="handleSearch"
        @clear="search.clearResults()"
      />

      <!-- 统计条 -->
      <StatsBar
        v-if="!search.results.value"
        :stats="search.stats"
      />

      <!-- 主区域：搜索结果或排行榜 -->
      <div v-if="search.results.value" class="mt-6">
        <SearchResults
          :results="search.results.value"
          :keyword="search.keyword.value"
          :loading="search.loading.value"
          :search-time="search.searchTime.value"
          @open-resource="openResourceDialog"
        />
      </div>

      <div v-else class="mt-6">
        <RankingsPanel
          :hot-searches="search.hotSearches.value"
          @search="handleSearch"
        />
      </div>
    </main>

    <!-- 底部 -->
    <SiteFooter />

    <!-- 资源详情弹窗 -->
    <ResourceDialog
      v-if="showResourceDialog"
      :item="selectedResource"
      @close="showResourceDialog = false"
    />

    <!-- 登录弹窗 -->
    <LoginDialog
      v-if="showLoginDialog"
      @close="showLoginDialog = false"
      @login-success="handleLoginSuccess"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTheme } from './composables/useTheme.js'
import { useSearch } from './composables/useSearch.js'
import SiteHeader from './components/SiteHeader.vue'
import SearchHero from './components/SearchHero.vue'
import StatsBar from './components/StatsBar.vue'
import SearchResults from './components/SearchResults.vue'
import RankingsPanel from './components/RankingsPanel.vue'
import SiteFooter from './components/SiteFooter.vue'
import ResourceDialog from './components/ResourceDialog.vue'
import LoginDialog from './components/LoginDialog.vue'

const { initTheme } = useTheme()
const search = useSearch()

const showResourceDialog = ref(false)
const showLoginDialog = ref(false)
const selectedResource = ref(null)
const isLoggedIn = ref(!!localStorage.getItem('zhisouda-token'))

onMounted(() => {
  initTheme()
})

function handleKeywordInput(kw) {
  // 用于 Header 搜索框
}

function handleHeaderSearch(kw) {
  search.doSearch(kw)
}

function handleSearch(kw, cat) {
  search.doSearch(kw, cat)
}

function openResourceDialog(item) {
  selectedResource.value = item
  showResourceDialog.value = true
}

function handleLoginSuccess() {
  isLoggedIn.value = true
  showLoginDialog.value = false
}
</script>
