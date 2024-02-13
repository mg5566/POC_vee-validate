<template>
  <label>
    <CComponent :number="counter" />
  </label>
  <button @click="handleIncrement">Increment</button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CComponent from "./CComponent.vue";

const counter = ref(0);
const handleIncrement = () => {
  counter.value++;
};
</script>
