import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueRouter from "vue-router";
import VeeValidate from "vee-validate";

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VeeValidate);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
