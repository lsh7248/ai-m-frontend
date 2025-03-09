<script setup lang="ts">
import { ref } from 'vue';
import Button from './common/buttons/Button.vue';

defineProps<{ msg: string }>();

const count = ref(0);

function handleButtonClick() {
  count.value++;
}
</script>

<template>
  <h1 class="text-heading-1 text-primary mb-4">{{ msg }}</h1>

  <div class="card p-6 bg-white rounded-lg shadow-md">
    <div class="flex flex-col gap-4 items-center">
      <p class="text-lg">count is {{ count }}</p>

      <div class="flex gap-2">
        <Button variant="primary" size="md" @click="handleButtonClick"> Primary 버튼 </Button>

        <Button variant="secondary" size="md" @click="handleButtonClick"> Secondary 버튼 </Button>

        <Button variant="outline" size="md" @click="handleButtonClick"> Outline 버튼 </Button>

        <Button variant="text" size="md" @click="handleButtonClick"> Text 버튼 </Button>
      </div>

      <p class="mt-4">
        Edit
        <code class="bg-gray-100 px-1 py-0.5 rounded">components/HelloWorld.vue</code>
        to test HMR
      </p>
    </div>
  </div>

  <p class="mt-4">
    Check out
    <a
      href="https://vuejs.org/guide/quick-start.html#local"
      target="_blank"
      class="text-primary hover:underline"
    >
      create-vue </a
    >, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      class="text-primary hover:underline"
    >
      Vue Docs Scaling up Guide </a
    >.
  </p>
  <p class="read-the-docs mt-4">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
