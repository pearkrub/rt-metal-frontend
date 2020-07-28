<template>
  <div id="app">
    <nav-bar-item v-if="accessToken"></nav-bar-item>
    <main role="main" class="container">
      <router-view />
    </main>
  </div>
</template>

<script>
import NavBarItem from "./components/NavBarItem.vue";
// import store from "store2";
import { mapState } from "vuex";
export default {
  name: "App",
  components: {
    NavBarItem,
  },
  computed: {
    ...mapState(["accessToken"]),
  },
  mounted() {
    // store.session.set("accessToken", null);
  },
};
</script>

<style lang="scss">
@import url("./assets/scss/app.scss");
// @import url("./assets/scss/bootstrap.min.css");
a {
  cursor: pointer;
}
.container {
  margin-top: 30px;
}
.table,
td {
  vertical-align: middle !important;
}
</style>
