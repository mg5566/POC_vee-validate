<template>
  <div>
    children vm input :
    <AInput :value="computedValue" />
  </div>
</template>

<script setup lang="ts">
import { Input as AInput } from "ant-design-vue";
import { computed } from "vue";

interface Props {
  modelValue: string;
  // inputState: string;
}
const props = defineProps<Props>();

interface Emits {
  (e: "update:modeValue", value: string): void;
  // (e: "update:inputState", value: string): void;
}
const emit = defineEmits<Emits>();
const computedValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modeValue", value),
});
</script>
