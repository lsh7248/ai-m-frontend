<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue';
</script>

<template>
  <div class="max-w-7xl mx-auto p-8 text-center">
    <div class="mb-8">
      <h1 class="text-3xl font-bold">AI-Meister Frontend Demo</h1>
      <p class="inline-block bg-green-600 text-white py-2 px-4 rounded font-bold mt-2">
        개발 환경 (dev 브랜치)
      </p>
    </div>

    <div class="flex justify-center mb-8">
      <a href="https://vite.dev" target="_blank">
        <img
          src="/vite.svg"
          class="h-24 p-6 transition-all duration-300 hover:drop-shadow-lg"
          alt="Vite logo"
        />
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img
          src="./assets/vue.svg"
          class="h-24 p-6 transition-all duration-300 hover:drop-shadow-lg"
          alt="Vue logo"
        />
      </a>
    </div>

    <HelloWorld msg="AI-Meister Frontend 개발 데모 페이지" />

    <div class="mt-12 pt-4 border-t border-gray-200">
      <p class="text-sm text-gray-600">이 페이지는 GitHub Pages를 통해 자동으로 배포됩니다.</p>
      <p class="text-sm text-gray-600">마지막 업데이트: {{ new Date().toLocaleString() }}</p>
    </div>
  </div>
</template>
