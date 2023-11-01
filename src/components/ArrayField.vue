<template>
  <div class="flex-column">
    <template v-for="(row, idx) in selectedData.rows">
      <Field
        :name="`user[${idx}].port`"
        v-slot="{ errorMessage, handleChange }"
        v-model="selectedData.rows[idx].port"
        rules="conInputRequired:'포트'|conInputOnlyNaturalNumber"
      >
        <a-form-item
          :label="idx === 0 ? '포트' : ''"
          name="port"
          :help="errorMessage"
          :has-feedback="!!errorMessage"
          :validate-status="errorMessage ? 'error' : undefined"
        >
          <a-input-number
            v-model:value="selectedData.rows[idx].port"
            @input="handleChange"
          />
        </a-form-item>
      </Field>

      <Field
        :name="`user[${idx}].weight`"
        v-slot="{ errorMessage, handleChange }"
        v-model="selectedData.rows[idx].weight"
        rules="conInputRequired:'가중치'|conInputOnlyNaturalNumber"
      >
        <a-form-item
          :label="idx === 0 ? '가중치' : ''"
          name="weight"
          :help="errorMessage"
          :has-feedback="!!errorMessage"
          :validate-status="errorMessage ? 'error' : undefined"
        >
          <a-input-number
            v-model:value="selectedData.rows[idx].weight"
            class="wm-input"
            @input="handleChange"
          />
          <MinusCircleOutlined
            class="dynamic-delete-button"
            @click="removeRow(selectedData.rows[idx])"
          />
        </a-form-item>
      </Field>
    </template>
  </div>
</template>

<script setup lang="ts">
import { Field } from "vee-validate";
import { SelectedData, TableDataItem } from "../App.vue";
import { computed } from "vue";
import { MinusCircleOutlined } from "@ant-design/icons-vue";

interface Props {
  modelValue: SelectedData;
}
const props = defineProps<Props>();

interface Emits {
  (e: "update:modelValue", value: SelectedData): void;
  (e: "removeSelectedData", item: TableDataItem): void;
}
const emit = defineEmits<Emits>();

const selectedData = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const removeRow = (item: TableDataItem) => {
  emit("removeSelectedData", item);
};
</script>
