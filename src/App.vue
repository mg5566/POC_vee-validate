<template>
  <div class="app-container">
    <div class="button-continer">
      <!-- <Button ref="buttonElement" :loading="isLoading" @click="fetchProducts">
        Get Products
      </Button> -->
      <Button @click="fetchProducts"> query once Products </Button>
    </div>
    <div class="product-list">{{ result }}</div>
  </div>
</template>

<script setup lang="ts">
import { Button } from "ant-design-vue";
import { getProdcuts } from "./api/getProducts";
import { ref } from "vue";

// const isLoading = ref(false);
const result = ref<[{ name: string }]>();
const fetchProducts = () => {
  // isLoading.value = true;
  console.log("click!");
  getProdcuts().then((data) => {
    result.value = data;
    console.log("res", result.value);
  });
  // .finally(() => (isLoading.value = false));
};
</script>

<style scoped>
.app-container {
  width: 80%;
  padding: 40px;

  display: flex;
  flex-direction: column;
  gap: 8px;
}

.product-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.submit-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
}
</style>
