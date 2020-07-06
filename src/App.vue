<template>
  <div id="app">
    <nav-bar-item></nav-bar-item>
  </div>
</template>

<script>
import NavBarItem from "./components/NavBarItem.vue";

export default {
  name: "App",
  components: {
    NavBarItem
  }
};
</script>

<style lang="scss">
@import url("./assets/scss/app.scss");
</style>
