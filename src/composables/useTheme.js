import { ref, watch } from 'vue'

const THEME_KEY = 'zhisouda-theme'

const themes = [
  { id: 'tech-blue',   label: '科技蓝', color: '#0EA5E9' },
  { id: 'tech-yellow', label: '黄',     color: '#F59E0B' },
  { id: 'tech-red',    label: '红',     color: '#EF4444' },
  { id: 'tech-brown',  label: '棕',     color: '#A16207' },
  { id: 'tech-green',  label: '绿',     color: '#22C55E' },
  { id: 'tech-gold',   label: '金',     color: '#FBBF24' },
]

const currentTheme = ref(localStorage.getItem(THEME_KEY) || 'tech-blue')

function setTheme(themeId) {
  currentTheme.value = themeId
  document.documentElement.setAttribute('data-theme', themeId)
  localStorage.setItem(THEME_KEY, themeId)
}

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY) || 'tech-blue'
  setTheme(saved)
}

export function useTheme() {
  return {
    themes,
    currentTheme,
    setTheme,
    initTheme
  }
}
