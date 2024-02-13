<template>
  <div id="head">
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <div>
    <a href="#test6">anchor tag test6</a>
    <RouterLink :to="{ hash: '#test1' }">Go to Test1</RouterLink>
    <RouterLink :to="{ hash: '#test2' }">Go to Test2</RouterLink>
    <RouterLink :to="{ hash: '#test3' }">Go to Test3</RouterLink>
    <RouterLink :to="{ hash: '#test4' }">Go to Test4</RouterLink>
    <RouterLink :to="{ hash: '#test5' }">Go to Test5</RouterLink>
    <RouterLink :to="{ path: '/home', hash: '#test6' }">Go to Test6</RouterLink>
  </div>
  <RouterView></RouterView>
  <div>
    <RouterLink :to="{ path: '/home', hash: '#head' }">Go to Head</RouterLink>
    <a href="#head">anchor tag head</a>
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<style scoped>
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
</style>
