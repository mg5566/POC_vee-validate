<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import POCAnchor from "./components/POCAnchor.vue";
</script>

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
    <a href="#test1">Go to Test1</a>
    <a href="#test2">Go to Test2</a>
    <a href="#test3">Go to Test3</a>
    <a href="#test4">Go to Test4</a>
    <a href="#test5">Go to Test5</a>
    <a href="#test6">Go to Test6</a>
  </div>
  <HelloWorld msg="Vite + Vue" />
  <POCAnchor />
  <div>
    <a href="#head">Go to Head</a>
  </div>
</template>

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
