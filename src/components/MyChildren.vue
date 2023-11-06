<template>
  <div>children input : <AInput :value="computedValue" /></div>
</template>

<script setup lang="ts">
import { Input as AInput } from "ant-design-vue";
import { ChangeEventHandler } from "ant-design-vue/es/_util/EventInterface";
import { computed } from "vue";

interface Props {
  inputValue: string;
}
const props = defineProps<Props>();

interface Emits {
  (e: "updateInput", value: string): void;
}
const emit = defineEmits<Emits>();

const computedValue = computed({
  get: () => props.inputValue,
  set: (value) => emit("updateInput", value),
});
</script>
