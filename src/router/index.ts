import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized,
  NavigationGuardNext,
} from "vue-router";
import Welcome from "../views/Welcome.vue";
import Questions from "../views/Questions.vue";
import QuestionDetail from "../views/QuestionDetail.vue";
import EditQuestion from "../views/EditQuestion.vue";
import NewQuestion from "../views/NewQuestion.vue";
import Profile from "../views/Profile.vue";
import { auth } from "../firebase/config";

const requireNoAuth = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const user = auth.currentUser;

  if (user) {
    next({ name: "Questions" });
  } else {
    next();
  }
};

const requireAuth = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const user = auth.currentUser;

  if (!user) {
    next({ name: "Welcome" });
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "Welcome",
    component: Welcome,
    beforeEnter: requireNoAuth,
  },
  {
    path: "/questions",
    name: "Questions",
    component: Questions,
    beforeEnter: requireAuth,
  },
  {
    path: "/questions/:id",
    name: "Question Detail",
    component: QuestionDetail,
    beforeEnter: requireAuth,
  },
  {
    path: "/questions/edit/:id",
    name: "Edit Question",
    component: EditQuestion,
    beforeEnter: requireAuth,
  },
  {
    path: "/questions/new",
    name: "New Question",
    component: NewQuestion,
    beforeEnter: requireAuth,
  },
  {
    path: "/profile",
    name: "My Profile",
    component: Profile,
    beforeEnter: requireAuth,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
