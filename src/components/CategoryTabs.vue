<template>
  <div class="flex items-center justify-center gap-2 flex-wrap">
    <button
      v-for="cat in categories"
      :key="cat.id"
      @click="$emit('select', cat.id)"
      class="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300"
      :class="modelValue === cat.id
        ? 'bg-theme-primary text-white shadow-lg shadow-theme-primary/30'
        : 'text-theme-secondary bg-theme-bg-card border border-theme hover:border-theme-hover hover:text-theme-primary'"
    >
      {{ cat.label }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  modelValue: { type: String, default: '' }
})

defineEmits(['select'])

const categories = [
  { id: '',       label: '全部' },
  { id: 'movie',  label: '电影' },
  { id: 'tv',     label: '电视剧' },
  { id: 'anime',  label: '动漫' },
  { id: 'variety',label: '综艺' },
  { id: 'short',  label: '短剧' },
]
</script>
