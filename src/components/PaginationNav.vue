<template>
  <nav aria-label="Page navigation example">
    <div>แสดง {{ start }} ถึง {{ to }} จาก {{ total }} รายการ</div>
    <ul class="pagination justify-content-end">
      <li class="page-item" :class="currentPage == 1 ? 'disabled' : ''">
        <a class="page-link" @click="clickPrevious()" href="#" tabindex="-1"
          >ก่อนหน้า</a
        >
      </li>
      <li
        class="page-item"
        :class="{ active: page == currentPage }"
        v-for="(page, key) in pages"
        :key="key"
      >
        <a
          v-if="page !== currentPage"
          @click="getData(page)"
          class="page-link"
          >{{ page }}</a
        >
        <span class="page-link" v-else>
          {{ page }}
          <span class="sr-only">(current)</span>
        </span>
      </li>
      <li class="page-item" :class="currentPage == lastPage ? 'disabled' : ''">
        <a class="page-link" @click="clickNext()" href="#">ถัดไป</a>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  props: {
    paginationData: Object,
    onGetData: {
      type: Function,
      default: () => {},
    },
  },
  name: "PaginationNav",
  computed: {
    pages() {
      let list = [];
      for (let i = 1; i <= this.paginationData.lastPage; i++) {
        list.push(i);
      }
      return list;
    },
    perPage() {
      return this.paginationData.perPage;
    },
    total() {
      return this.paginationData.total;
    },
    currentPage() {
      return this.paginationData.page;
    },
    start() {
      return this.currentPage - 1 * this.perPage + this.perPage;
    },
    to() {
      if (this.currentPage == this.lastPage) {
        return this.paginationData.total;
      }
      return this.currentPage * this.perPage;
    },
    lastPage() {
      return this.paginationData.lastPage;
    },
  },
  methods: {
    getData(page) {
      this.onGetData({ page: page });
    },
    clickNext() {
      let page = this.currentPage + 1;
      this.onGetData({ page: page });
    },
    clickPrevious() {
      let page = this.currentPage - 1;
      this.onGetData({ page: page });
    },
  },
};
</script>