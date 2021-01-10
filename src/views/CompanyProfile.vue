<template>
  <div>
    <form @submit.prevent="submitForm">
      <div class="search-box">
        <input type="text" v-model="search" class="input-search" />
        <div class="btn-search" @click="doGetProduct">ค้นหา</div>
      </div>
    </form>
    <table class="table-bordered table-sm table-hover table">
      <thead>
        <tr>
          <th>ลำดับที่</th>
          <th>รหัสสินค้า</th>
          <th>ชื่อสินค้า</th>
          <th>
            <button
              class="btn btn-success btn-sm"
              data-toggle="modal"
              data-target=".add-product-modal"
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
        <tr v-for="(product, index) in products" :key="index">
          <td class="text-center">{{ index + 1 }}</td>
          <td>
            <div class="data-list text-center">{{ product.productCode }}</div>
          </td>
          <td>
            <div class="data-list">{{ product.productName }}</div>
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
    <AddProductModal
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
import { getProduct, deleteProduct } from "../api";
import AddProductModal from "../components/AddProductModal";
import EditProductModal from "../components/EditProductModal";
import Swal from "sweetalert2";

export default {
  name: "UserList",
  components: {
    AddProductModal,
    EditProductModal,
  },
  data() {
    return {
      products: [],
      product: null,
      openModalCreate: false,
      openModalEdit: false,
      search: "",
    };
  },
  methods: {
    async doGetProduct() {
      try {
        const response = await getProduct({ productName: this.search });
        this.products = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    callbackCreate(product) {
      Swal.fire("สำเร็จ!", "บันทึกข้อมูลเรียบร้อยแล้ว", "success");
      this.products = [...this.products, product];
      this.closeModal();
    },
    callbackEdit() {
      Swal.fire("สำเร็จ!", "บันทึกข้อมูลเรียบร้อยแล้ว", "success");
      this.closeModal();
      this.doGetProduct();
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
    confirmDeleteProduct(product) {
      Swal.fire({
        title: `ยืนยัน`,
        text: `ลบ ${product.productName}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        confirmButtonText: "ลบข้อมูล",
        cancelButtonText: "ยกเลิก",
      }).then(async (result) => {
        if (result.value) {
          try {
            await deleteProduct(product.id);
            Swal.fire("สำเร็จ!", "ลบข้อมูลเรียบร้อยแล้ว", "success");
            this.doGetProduct();
          } catch (error) {
            Swal.fire("ผิดพลาด!", "ลบข้อมูลไม่สำเร็จ", "error");
          }
        }
      });
    },
    submitForm() {
      this.doGetProduct();
    },
  },
  mounted() {
    this.doGetProduct();
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
