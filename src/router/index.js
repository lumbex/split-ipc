import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import EditSubscription from "../views/edit-subscription/Index.vue";
import EditSubscriptionCredentials from "../views/edit-subscription/ChangeCredentials.vue";
import EditSubscriptionLink from "../views/edit-subscription/ChangeLink.vue";
import EditSubscriptionPrice from "../views/edit-subscription/ChangeSlotPrice.vue";
import EditSubscriptionContact from "../views/edit-subscription/ChangeContactNumber.vue";

import CreateSubscription from "../views/create-subscription/Index.vue";
import JoinSubscription from "../views/join-subscription/Index.vue";
import SetupJoinSubscription from "../views/join-subscription/Setup.vue";
import QuickJoinSubscription from "../views/join-subscription/QuickAccess.vue";
import TroubleshootJoinSubscription from "../views/join-subscription/Troubleshoot.vue";
import UpdateSubscriptionTerms from "../views/update-subscription-terms/Index.vue";
import ValidateSubscription from "../views/validate-subscription/Index.vue";
import StoreUtils from "../utils/baseUtils/StoreUtils";

Vue.use(VueRouter);

const routes = [
  {
    path: "/edit-subscription/contact/:serviceTag",
    name: "edit-subscription-contact",
    props: true,
    component: EditSubscriptionContact,
    beforeEnter: (to, from, next) => {
      StoreUtils.commit("router/SET_ACTIVE_ROUTE", to.name);
      next();
    }
  },
  {
    path: "/edit-subscription/price/:serviceTag",
    name: "edit-subscription-price",
    props: true,
    component: EditSubscriptionPrice,
    beforeEnter: (to, from, next) => {
      StoreUtils.commit("router/SET_ACTIVE_ROUTE", to.name);
      next();
    }
  },
  {
    path: "/edit-subscription/join-link/:serviceTag",
    name: "edit-subscription-link",
    props: true,
    component: EditSubscriptionLink,
    beforeEnter: (to, from, next) => {
      StoreUtils.commit("router/SET_ACTIVE_ROUTE", to.name);
      next();
    }
  },
  {
    path: "/edit-subscription/credentials/:serviceTag",
    name: "edit-subscription-credentials",
    props: true,
    component: EditSubscriptionCredentials,
    beforeEnter: (to, from, next) => {
      StoreUtils.commit("router/SET_ACTIVE_ROUTE", to.name);
      next();
    }
  },
  {
    path: "/edit-subscription/:serviceTag",
    name: "edit-subscription",
    props: true,
    component: EditSubscription,
    beforeEnter: (to, from, next) => {
      StoreUtils.commit("router/SET_ACTIVE_ROUTE", to.name);
      next();
    }
  },
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
    path: "/join-subscription/troubleshoot/:serviceTag",
    name: "troubleshoot-join-subscription",
    props: true,
    component: TroubleshootJoinSubscription,
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
  },
  {
    path: "/validate-subscription/:serviceTag",
    name: "validate-subscription",
    props: true,
    component: ValidateSubscription,
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
