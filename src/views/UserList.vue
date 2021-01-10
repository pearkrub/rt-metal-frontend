<template>
  <div>
    <form @submit.prevent="submitForm">
      <div class="search-box">
        <input type="text" v-model="search" class="input-search" />
        <div class="btn-search" @click="doGetData">ค้นหา</div>
      </div>
    </form>
    <table class="table-bordered table-sm table-hover table">
      <thead>
        <tr>
          <th>ลำดับที่</th>
          <th>ชื่อผู้ใช้งาน</th>
          <th>ชื่อ - นามสกุล</th>
          <th>สิทธิ์การใช้งาน</th>
          <th>
            <button
              class="btn btn-success btn-sm"
              data-toggle="modal"
              data-target=".add-user-modal"
              @click="openModalCreate = true"
              data-backdrop="static"
              data-keyboard="false"
            >
              + เพิ่ม
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="index">
          <td class="text-center">{{ index + 1 }}</td>
          <td>
            <div class="data-list text-center">
              {{ user.username }}
            </div>
          </td>
          <td>
            <div class="data-list text-center">
              {{ getFullName(user) }}
            </div>
          </td>
          <td class="text-center">
            <div class="data-list">{{ user.role }}</div>
          </td>
          <td class="text-center">
            <button
              class="btn btn-sm"
              data-toggle="modal"
              data-target=".edit-product-modal"
              data-backdrop="static"
              data-keyboard="false"
              @click="editProduct(product)"
            >
              แก้ไข</button
            >&nbsp;
            <button
              class="btn btn-danger btn-sm"
              @click="confirmDeleteProduct(product)"
            >
              ลบ
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <AddUserModal
      v-if="openModalCreate"
      :callback-create="callbackCreate"
      :on-close-modal="closeModal"
    />
    <EditProductModal
      v-if="openModalEdit"
      :callback-create="callbackEdit"
      :product-data="product"
      :on-close-modal="closeModal"
    />
  </div>
</template>
<script>
import { getUser } from "../api";
import AddUserModal from "../components/AddUserModal";
import EditProductModal from "../components/EditProductModal";
import Swal from "sweetalert2";
import { get } from "lodash";

export default {
  name: "UserList",
  components: {
    AddUserModal,
    EditProductModal,
  },
  data() {
    return {
      users: [],
      user: null,
      openModalCreate: false,
      openModalEdit: false,
      search: "",
    };
  },
  methods: {
    async doGetData() {
      try {
        const response = await getUser({ username: this.search });
        this.users = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    callbackCreate(user) {
      Swal.fire("สำเร็จ!", "บันทึกข้อมูลเรียบร้อยแล้ว", "success");
      this.users = [...this.users, user];
      this.closeModal();
    },
    callbackEdit() {
      Swal.fire("สำเร็จ!", "บันทึกข้อมูลเรียบร้อยแล้ว", "success");
      this.closeModal();
      this.doGetData();
    },
    editProduct(data) {
      this.openModalEdit = true;
      this.product = data;
    },
    closeModal() {
      setTimeout(() => {
        this.openModalEdit = false;
        this.openModalCreate = false;
      }, 500);
    },
    submitForm() {
      this.doGetData();
    },
    getFullName(user) {
      return get(user, "firstName", "") + " " + get(user, "lastName", "");
    },
  },
  mounted() {
    this.doGetData();
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
</style>
