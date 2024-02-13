<template>
  <h2 :id="id">
    <slot></slot>
  </h2>
  <div>
    <p>this is a {{ id }} card</p>
    <span>진절머리가 나</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  id: string;
}
defineProps<Props>();
</script>
