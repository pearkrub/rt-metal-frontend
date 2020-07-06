import Vue from "vue";
import Vuex from "vuex";
import store from "store2";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userProfile: store.session.get("userProfile"),
    accessToken: store.session.get("accessToken"),
  },
  mutations: {
    updateToken(state, token) {
      state.accessToken = token;
    },
    updateProfile(state, data) {
      state.userProfile = data;
    },
  },
  actions: {},
  modules: {},
});
