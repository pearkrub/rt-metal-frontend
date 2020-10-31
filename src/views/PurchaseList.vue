<template >
  <div>
    <form @submit.prevent="submitForm">
      <div class="search-box">
        <input type="text" v-model="search" class="input-search" />
        <div class="btn-search" @click="doGetPurChase">ค้นหา</div>
      </div>
    </form>
    <router-link class="add-purchase-btn" to="/create-purchase"
      >+ เพิ่มรายการซื้อ</router-link
    >
    <table class="table-bordered table-sm table-hover table">
      <thead>
        <tr>
          <th>ลำดับที่</th>
          <th>ผู้จัดจำหน่าย</th>
          <th>ราคา</th>
          <th @click="sortdata" style="cursor: pointer">
            วันที่
            <font-awesome-icon
              v-if="orderBy == 'createdAt|ASC'"
              icon="sort-up"
            /><font-awesome-icon v-else icon="sort-down" />
          </th>
          <th>บันทึกโดย</th>
          <th>สถานะ</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(purChase, index) in purChases" :key="index">
          <td class="text-center">{{ index + 1 }}</td>
          <td>
            <div class="data-list">
              {{ purChase.distributor.distributorName }}
            </div>
          </td>
          <td>
            <div class="data-list text-right">
              {{ formatNumber(purChase.amount) }}
            </div>
          </td>
          <td>
            <div class="data-list text-center">
              {{ formatDate(purChase.createdAt) }}
            </div>
          </td>
          <td>
            <div class="data-list">
              {{ purChase.user.firstName }} {{ purChase.user.lastName }}
            </div>
          </td>
          <td>
            <div
              class="data-list flex-center"
              v-html="getStatus(purChase.purchaseStatus)"
            ></div>
          </td>
          <td class="text-center">
            <button class="btn btn-sm" @click="editPurchase(purChase.id)">
              แก้ไข
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <PaginationNav :pagination-data="pagination" :on-get-data="onGetData" />
  </div>
</template>
<script>
import { getPurchase } from "../api";
import moment from "moment";
import PaginationNav from "../components/PaginationNav";
// import { get } from "lodash";
import numeral from "numeral";

export default {
  name: "PurchaseList",
  data() {
    return {
      purChases: [],
      search: "",
      pagination: { total: 0, perPage: 0, lastPage: 0, page: 0 },
      currentPage: "",
      orderBy: "createdAt|DESC",
    };
  },
  components: {
    PaginationNav,
  },
  methods: {
    async doGetPurChase() {
      try {
        let payload = { search: this.search, order_by: this.orderBy };
        if (this.currentPage) {
          payload.page = this.currentPage;
        }
        const response = await getPurchase(payload);
        this.purChases = response.data.data;
        this.pagination = response.data.pagination;
      } catch (error) {
        this.purChases = [];
      }
    },
    sortdata() {
      this.currentPage = 1;
      if (this.orderBy == "createdAt|DESC") {
        this.orderBy = "createdAt|ASC";
      } else {
        this.orderBy = "createdAt|DESC";
      }
      this.doGetPurChase();
    },
    onGetData(params) {
      this.currentPage = params.page;
      this.doGetPurChase();
    },
    formatDate(date) {
      let dateFormat = moment(date).format("DD/MM/YYYY");
      return dateFormat;
    },
    submitForm() {
      this.doGetPurChase();
    },
    getStatus(purchaseStatus) {
      if (purchaseStatus) {
        return this.convertStatus(purchaseStatus.toLowerCase());
      } else {
        return '<div class="status-pending">รอการอนุมัติ</div>';
      }
    },
    convertStatus(status) {
      const statusList = {
        pending: '<div class="status-pending">รอการอนุมัติ</div>',
        approved: '<div class="status-approved">อนุมัติแล้ว</div>',
        success: '<div class="status-success">ได้รับสินค้าแล้ว</div>',
        success_by_credit: '<div class="status-success">ได้รับสินค้าแล้ว</div>',
      };
      return statusList[status];
    },
    editPurchase(id) {
      this.$router.push({
        name: "purchase",
        params: { purchaseId: id },
      });
    },
    formatNumber(number) {
      return this.isInt(number)
        ? numeral(number).format()
        : numeral(number).format("0,0.00");
    },
    formatFloat(number) {
      return numeral(number).format("0,0.00");
    },
    isInt(n) {
      return n % 1 === 0;
    },
  },
  mounted() {
    this.doGetPurChase();
  },
};
</script>
<style lang="scss" scoped>
th {
  text-align: center;
}
.data-list {
  margin-left: 10px;
}
.add-purchase-btn {
  width: 180px;
  height: 39px;
  left: 94px;
  top: 183px;

  background: #0275d8;
  border: 1px solid #0275d8;
  box-sizing: border-box;
  border-radius: 4px;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 21px;
  /* or 131% */

  text-align: center;

  color: #ffffff;
  align-items: center;
  justify-content: center;
  display: flex;
  margin-bottom: 5px;
  cursor: pointer;
}
</style>
<style>
.status-pending {
  width: 112px;
  height: 23px;
  background: #f0ad4e;
  border-radius: 20px;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 12px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  color: #ffffff;
}
.status-approved {
  width: 112px;
  height: 23px;
  background: #5bc0de;
  border-radius: 20px;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 12px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  color: #ffffff;
}
.status-success {
  width: 112px;
  height: 23px;
  background: #5cb85c;
  border-radius: 20px;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 12px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  color: #ffffff;
}
.flex-center {
  display: flex;
  justify-content: center;
}
</style>