import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import CreateSubscription from "../views/create-subscription/Index.vue";
import JoinSubscription from "../views/join-subscription/Index.vue";
import SetupJoinSubscription from "../views/join-subscription/Setup.vue";
import QuickJoinSubscription from "../views/join-subscription/QuickAccess.vue";
import UpdateSubscriptionTerms from "../views/update-subscription-terms/Index.vue";
import StoreUtils from "../utils/baseUtils/StoreUtils";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/create-subscription/:serviceTag",
    name: "create-subscription",
    props: true,
    component: CreateSubscription,
    beforeEnter: (to, from, next) => {
      StoreUtils.commit("router/SET_ACTIVE_ROUTE", to.name);
      next();
    }
  },
  {
    path: "/join-subscription/:serviceTag",
    name: "join-subscription",
    props: true,
    component: JoinSubscription,
    beforeEnter: (to, from, next) => {
      StoreUtils.commit("router/SET_ACTIVE_ROUTE", to.name);
      next();
    }
  },
  {
    path: "/join-subscription/setup/:serviceTag",
    name: "setup-join-subscription",
    props: true,
    component: SetupJoinSubscription,
    beforeEnter: (to, from, next) => {
      StoreUtils.commit("router/SET_ACTIVE_ROUTE", to.name);
      next();
    }
  },
  {
    path: "/join-subscription/quick/:serviceTag",
    name: "quick-join-subscription",
    props: true,
    component: QuickJoinSubscription,
    beforeEnter: (to, from, next) => {
      StoreUtils.commit("router/SET_ACTIVE_ROUTE", to.name);
      next();
    }
  },
  {
    path: "/update-subscription-terms/:serviceTag",
    name: "update-subscription-terms",
    props: true,
    component: UpdateSubscriptionTerms,
    beforeEnter: (to, from, next) => {
      StoreUtils.commit("router/SET_ACTIVE_ROUTE", to.name);
      next();
    }
  }
];

Vue.use(VueRouter);
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
