import { createRouter, createWebHistory } from "vue-router";
import Welcome from "../views/Welcome.vue";
import Questions from "../views/Questions.vue";

const routes = [
  {
    path: "/",
    name: "Welcome",
    component: Welcome
  },
  {
    path: "/questions",
    name: "Questions",
    component: Questions
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router