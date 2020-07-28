<template>
  <div>
    <form @submit.prevent="submitForm">
      <div class="search-box">
        <input type="text" v-model="search" class="input-search" />
        <div class="btn-search" @click="getDistributer">ค้นหา</div>
      </div>
    </form>
    <table class="table table-bordered table-sm">
      <thead>
        <tr>
          <th>ลำดับที่</th>
          <th>รหัสผู้จัดจำหน่าย</th>
          <th>ชื่อผู้จัดจำหน่าย</th>
          <th>
            <button
              class="btn btn-success btn-sm"
              data-toggle="modal"
              data-target=".add-distributer-modal"
              @click="openModalCreate = true"
              data-backdrop="static"
              data-keyboard="false"
            >+เพิ่ม</button>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(distributer, index) in distributers" :key="index">
          <td class="text-center">{{ index + 1 }}</td>
          <td>
            <div class="data-list">{{ distributer.distributorTaxId }}</div>
          </td>
          <td>
            <div class="data-list">{{ distributer.distributorName }}</div>
          </td>
          <td class="text-center">
            <button
              class="btn btn-sm"
              data-toggle="modal"
              data-target=".edit-distributer-modal"
              data-backdrop="static"
              data-keyboard="false"
              @click="editDistributor(distributer)"
            >แก้ไข</button>&nbsp;
            <button class="btn btn-danger btn-sm" @click="deleteDistributor(distributer)">ลบ</button>
          </td>
        </tr>
      </tbody>
    </table>
    <AddDistributerModal
      v-if="openModalCreate"
      :callback-create="callbackCreate"
      :on-close-modal="closeModal"
    />
    <EditDistributerModal
      v-if="openModalEdit"
      :callback-create="callbackEdit"
      :distributor-data="distributer"
      :on-close-modal="closeModal"
    />
  </div>
</template>
<script>
import { getDistribute, deleteDistribute } from "../api";
import AddDistributerModal from "../components/AddDistributerModal";
import EditDistributerModal from "../components/EditDistributerModal";
import Swal from "sweetalert2";

export default {
  name: "DistributerList",
  components: {
    AddDistributerModal,
    EditDistributerModal,
  },
  data() {
    return {
      distributers: [],
      distributer: null,
      openModalCreate: false,
      openModalEdit: false,
      search: "",
    };
  },
  methods: {
    async getDistributer() {
      try {
        const response = await getDistribute({ search: this.search });
        console.log(response.data);
        this.distributers = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    callbackCreate(distributer) {
      Swal.fire("สำเร็จ!", "บันทึกข้อมูลเรียบร้อยแล้ว", "success");
      this.closeModal();
      this.distributers = [...this.distributers, distributer];
    },
    callbackEdit(distributer) {
      console.log(distributer);
      Swal.fire("สำเร็จ!", "บันทึกข้อมูลเรียบร้อยแล้ว", "success");
      this.closeModal();
      this.getDistributer();
    },
    editDistributor(data) {
      this.openModalEdit = true;
      this.distributer = data;
    },
    closeModal() {
      setTimeout(() => {
        this.openModalEdit = false;
        this.openModalCreate = false;
      }, 500);
    },
    deleteDistributor(distributer) {
      console.log(distributer);
      Swal.fire({
        title: `ยืนยัน`,
        text: `ลบ ${distributer.distributorName}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        confirmButtonText: "ลบข้อมูล",
        cancelButtonText: "ยกเลิก",
      }).then(async (result) => {
        if (result.value) {
          try {
            await deleteDistribute(distributer.id);
            Swal.fire("สำเร็จ!", "ลบข้อมูลเรียบร้อยแล้ว", "success");
            this.getDistributer();
          } catch (error) {
            Swal.fire("ผิดพลาด!", "ลบข้อมูลไม่สำเร็จ", "error");
          }

          // For more information about handling dismissals please visit
          // https://sweetalert2.github.io/#handling-dismissals
        }
      });
    },
    submitForm() {
      this.getDistributer();
    },
  },
  mounted() {
    this.getDistributer();
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