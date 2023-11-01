<template>
  <div class="flex-column">
    <Typography>{{ dataSource }}</Typography>
  </div>
</template>

<script setup lang="ts">
import { Typography } from "ant-design-vue";

interface CusObject {
  [key: string]: any[];
}
interface Props {
  dataSource: CusObject;
}
defineProps<Props>();
</script>
