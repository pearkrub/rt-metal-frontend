<template>
  <div>
    <nav class="navbar navbar-expand-md fixed-top navbar-dark bg-dark">
      <a class="navbar-brand" href="#">
        <b>RT Metal</b>
      </a>
      <button class="navbar-toggler p-0 border-0" type="button" data-toggle="offcanvas">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item" :class="{active: page == 'home'}" @click="page = 'home'">
            <a class="nav-link" href="#">Home</a>
          </li>
          <li class="nav-item" :class="{active: page == 'buy'}" @click="page = 'buy'">
            <a class="nav-link" href="#">ซื้อ</a>
          </li>
          <li class="nav-item" :class="{active: page == 'sell'}" @click="page = 'sell'">
            <a class="nav-link" href="#">ขาย</a>
          </li>
          <li class="nav-item" :class="{active: page == 'partner'}" @click="page = 'partner'">
            <a class="nav-link" href="#">ผู้จัดจำหน่วย</a>
          </li>
          <li class="nav-item" :class="{active: page == 'product'}" @click="page = 'product'">
            <a class="nav-link" href="#">รายการสินค้า</a>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">
              <b>ศิริพงษ์</b>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  name: "NavBarItem",
  data() {
    return {
      page: ""
    };
  }
};
</script>
<style lang="scss" scoped>
.nav-item {
  margin-left: 10px;
  margin-right: 10px;
}
</style>