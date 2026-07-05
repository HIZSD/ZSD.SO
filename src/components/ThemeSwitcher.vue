<template>
  <div class="flex items-center gap-1.5">
    <button
      v-for="t in themes"
      :key="t.id"
      @click="setTheme(t.id)"
      class="w-5 h-5 rounded-full border-2 transition-all duration-300 cursor-pointer"
      :class="currentTheme === t.id ? 'scale-125 border-white shadow-lg' : 'border-transparent opacity-60 hover:opacity-100 hover:scale-110'"
      :style="{ backgroundColor: t.color }"
      :title="t.label"
    >
    </button>
  </div>
</template>

<script setup>
import { useTheme } from '../composables/useTheme.js'

const { themes, currentTheme, setTheme } = useTheme()
</script>
