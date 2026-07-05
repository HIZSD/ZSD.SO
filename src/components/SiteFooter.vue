<template>
  <footer class="border-t border-theme mt-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="text-center space-y-3">
        <p class="text-xs text-theme-muted">
          声明：本站是网盘索引系统，所有内容均来自互联网所提供的公开引用资源，未提供资源上传、存储服务。
        </p>
        <p class="text-xs text-theme-muted">
          © {{ year }} 智搜达 — 全网网盘资源搜索引擎
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>
