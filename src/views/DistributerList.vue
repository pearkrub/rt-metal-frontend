<template>
  <div>
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
            <button class="btn btn-sm">แก้ไข</button>
          </td>
        </tr>
      </tbody>
    </table>
    <AddDistributerModal :callback-create="callbackCreate" />
  </div>
</template>
<script>
import { getDistribute } from "../api";
import AddDistributerModal from "../components/AddDistributerModal";
export default {
  name: "DistributerList",
  components: {
    AddDistributerModal
  },
  data() {
    return {
      distributers: []
    };
  },
  methods: {
    async getDistributer() {
      try {
        const response = await getDistribute({});
        console.log(response.data);
        this.distributers = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    callbackCreate(distributer) {
      this.distributers = [...this.distributers, distributer];
    }
  },
  mounted() {
    this.getDistributer();
  }
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