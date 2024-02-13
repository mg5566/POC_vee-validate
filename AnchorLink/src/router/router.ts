import {
  createRouter,
  createWebHashHistory,
  // createWebHistory,
} from "vue-router";

import Home from "../pages/Home.vue";

const routes = [
  { path: "/", redirect: "/home" },
  { path: "/home", component: Home },
];

export const router = createRouter({
  history: createWebHashHistory(),
  // history: createWebHistory(),
  routes,
  scrollBehavior: async (to) => {
    if (to.hash) {
      return {
        el: to.hash,
        top: 0,
      };
    }
  },
});
