import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueRouter from "vue-router";
import VeeValidate from "vee-validate";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faSortDown);
library.add(faSortUp);
Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VeeValidate);
Vue.component("font-awesome-icon", FontAwesomeIcon);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
