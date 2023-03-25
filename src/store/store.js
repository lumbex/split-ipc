import Vue from "vue";
import Vuex from "vuex";

import * as router from "./modules/baseModules/router.js";
import * as loader from "./modules/baseModules/loader.js";
import * as notification from "./modules/baseModules/notification.js";
import * as table from "./modules/baseModules/table.js";
import * as form from "./modules/baseModules/form.js";
import * as appSetup from "./modules/baseModules/app.js";

import * as service from "./modules/service.js";
import * as subscription from "./modules/subscription.js";
import * as user from "./modules/user.js";
import * as ipc from "./modules/ipc.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    service,
    subscription,
    user,
    ipc,

    appSetup,
    router,
    loader,
    notification,
    table,
    form
  },
  state: {},
  mutations: {},
  actions: {}
});
