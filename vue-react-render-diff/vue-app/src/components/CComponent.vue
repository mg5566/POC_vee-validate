<template>
  <div>
    {{ number }}
    <DComponent />
  </div>
</template>

<script setup lang="ts">
import DComponent from "./DComponent.vue";

interface Props {
  number: number;
}
defineProps<Props>();
</script>
