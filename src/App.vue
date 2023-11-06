<template>
  <!-- 여기가 부모 -->
  <div class="app-container">
    <!-- 자식 -->
    <MyChildren :input-value="inputValue" @update-input="updateInputValue" />
    <!-- V-MODEL -->
    <MyChildrenVM v-model="vmInputValue" />
    <MyChildrenVM :modelValue="vmInputValue" @update:modelValue="" />
    <MyChildrenVM :input-State="vmInputValue" @update:input-State="" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MyChildren from "./components/MyChildren.vue";
import MyChildrenVM from "./components/MyChildrenVM.vue";

const inputValue = ref("");
const updateInputValue = (value: string) => {
  console.log("parent updateinputvalue", value);
};

const vmInputValue = ref("");
</script>

<style scoped>
.app-container {
  width: 80%;
  padding: 40px;
}

.data-container {
  padding: 40px;
}
</style>
