import { ref, reactive } from 'vue'
import { searchResources, healthCheck } from '../api/pansou.js'

// 分类映射
const CATEGORY_MAP = {
  movie: '电影',
  tv: '电视剧',
  anime: '动漫',
  variety: '综艺',
  short: '短剧'
}

export function useSearch() {
  const keyword = ref('')
  const category = ref('')
  const results = ref(null)
  const loading = ref(false)
  const error = ref(null)
  const searchTime = ref(0)
  const stats = reactive({
    todaySearches: parseInt(localStorage.getItem('zhisouda-today-searches') || '0'),
    totalSearches: parseInt(localStorage.getItem('zhisouda-total-searches') || '0'),
    avgTime: parseFloat(localStorage.getItem('zhisouda-avg-time') || '0')
  })

  // 热搜榜（本地存储）
  const hotSearches = ref(JSON.parse(localStorage.getItem('zhisouda-hot-searches') || '[]'))

  async function doSearch(kw, cat = '') {
    if (!kw || !kw.trim()) return

    const startTime = Date.now()
    keyword.value = kw.trim()
    category.value = cat
    loading.value = true
    error.value = null
    results.value = null

    try {
      const params = { kw: keyword.value, res: 'merged_by_type' }

      // 如果选择了分类，添加到扩展参数
      if (cat && CATEGORY_MAP[cat]) {
        params.ext = JSON.stringify({ category: CATEGORY_MAP[cat] })
      }

      const data = await searchResources(params)
      results.value = data
      searchTime.value = Date.now() - startTime

      // 记录搜索词到热搜
      recordSearch(keyword.value)
      // 更新统计
      updateStats(searchTime.value)
    } catch (e) {
      error.value = e.message || '搜索失败，请稍后重试'
    } finally {
      loading.value = false
    }
  }

  function recordSearch(word) {
    const today = new Date().toLocaleDateString('zh-CN')
    const records = JSON.parse(localStorage.getItem('zhisouda-hot-searches') || '[]')

    const existing = records.find(r => r.word === word)
    if (existing) {
      existing.count++
      existing.date = today
    } else {
      records.unshift({ word, count: 1, date: today })
    }

    // 保留前 50 条，按次数排序
    records.sort((a, b) => b.count - a.count)
    const trimmed = records.slice(0, 50)
    localStorage.setItem('zhisouda-hot-searches', JSON.stringify(trimmed))
    hotSearches.value = trimmed
  }

  function updateStats(time) {
    const today = new Date().toLocaleDateString('zh-CN')
    const lastDate = localStorage.getItem('zhisouda-last-date')

    let todayCount = parseInt(localStorage.getItem('zhisouda-today-searches') || '0')
    let totalCount = parseInt(localStorage.getItem('zhisouda-total-searches') || '0')
    let avg = parseFloat(localStorage.getItem('zhisouda-avg-time') || '0')

    if (lastDate !== today) {
      todayCount = 0
      localStorage.setItem('zhisouda-last-date', today)
    }

    todayCount++
    totalCount++
    avg = avg === 0 ? time : (avg * (totalCount - 1) + time) / totalCount

    localStorage.setItem('zhisouda-today-searches', String(todayCount))
    localStorage.setItem('zhisouda-total-searches', String(totalCount))
    localStorage.setItem('zhisouda-avg-time', String(avg))

    stats.todaySearches = todayCount
    stats.totalSearches = totalCount
    stats.avgTime = Math.round(avg)
  }

  function clearResults() {
    results.value = null
    keyword.value = ''
    error.value = null
  }

  return {
    keyword,
    category,
    results,
    loading,
    error,
    searchTime,
    stats,
    hotSearches,
    doSearch,
    clearResults,
    CATEGORY_MAP
  }
}
