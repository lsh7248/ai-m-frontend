<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue';
</script>

<template>
  <div class="app-container">
    <div class="header">
      <h1>AI-Meister Frontend Demo</h1>
      <p class="env-tag">개발 환경 (dev 브랜치)</p>
    </div>

    <div class="logos">
      <a href="https://vite.dev" target="_blank">
        <img src="/vite.svg" class="logo" alt="Vite logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
      </a>
    </div>

    <HelloWorld msg="AI-Meister Frontend 개발 데모 페이지" />

    <div class="footer">
      <p>이 페이지는 GitHub Pages를 통해 자동으로 배포됩니다.</p>
      <p>마지막 업데이트: {{ new Date().toLocaleString() }}</p>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.header {
  margin-bottom: 2rem;
}

.env-tag {
  display: inline-block;
  background-color: #42b883;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: bold;
  margin-top: 0.5rem;
}

.logos {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.footer {
  margin-top: 3rem;
  padding-top: 1rem;
  border-top: 1px solid #eaeaea;
  font-size: 0.9rem;
  color: #666;
}
</style>
