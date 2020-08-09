<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <a class="navbar-brand" href="#">
        <b>RT Metal</b>
      </a>
      <button class="navbar-toggler p-0 border-0" type="button" data-toggle="offcanvas">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item" :class="{active: page == 'home'}" @click="page = 'home'" to="/home">
            <a class="nav-link">Home</a>
          </li>
          <li
            class="nav-item"
            :class="{active: page == 'purchase-list'}"
            @click="linkTo('purchase-list')"
          >
            <a class="nav-link">ซื้อ</a>
          </li>
          <li class="nav-item" :class="{active: page == 'sell'}" @click="page = 'sell'">
            <a class="nav-link">ขาย</a>
          </li>
          <li
            class="nav-item"
            :class="{active: page == 'distributer-list'}"
            @click="linkTo('distributer-list')"
          >
            <a class="nav-link">ผู้จัดจำหน่วย</a>
          </li>
          <li
            class="nav-item"
            :class="{active: page == 'product-list'}"
            @click="linkTo('product-list')"
          >
            <a class="nav-link">รายการสินค้า</a>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">
              <b>{{ userName }}</b>
            </a>
          </li>
          <li class="nav-item active" @click="clearSession">
            <a class="nav-link" href="#">ออกจากระบบ</a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
<script>
import store from "store2";
import { mapState } from "vuex";
import { get } from "lodash";

export default {
  name: "NavBarItem",
  data() {
    return {
      page: "",
    };
  },
  computed: {
    ...mapState(["userProfile"]),
    userName() {
      return get(this.userProfile, "username", "");
    },
  },
  methods: {
    clearSession() {
      store.session.clearAll();
      this.$store.commit("updateProfile", null);
      this.$store.commit("updateToken", null);
      this.$router.push({ name: "login" });
    },
    linkTo(name) {
      this.page = name;
      if (this.$route.name != name) {
        this.$router.push({ name: name });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.nav-item {
  margin-left: 10px;
  margin-right: 10px;
}
</style>