import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Practice from "../views/Practice.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/practice", component: Practice },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;