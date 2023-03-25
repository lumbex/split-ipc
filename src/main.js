import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";

import "./assets/css/style.css";
import "./filter.js";


Vue.config.productionTip = false;
Vue.prototype.$blogName = 'LogRocket'
window.$messageFromNative = function(message) {
  store.dispatch("ipc/receiveMessageHandler", message)
};
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
