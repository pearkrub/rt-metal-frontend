<template>
  <div>
    <div class="row">
      <div class="col-3">
        <button
          class="btn btn-primary btn-sm"
          @click="confirmDeleteProduct(product)"
        >
          แก้ไข
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-3">ชื่อบริษัท</div>
      <div class="col-6">{{ companyProfile.companyName }}</div>
    </div>
    <div class="row">
      <div class="col-3">ที่อยู่</div>
      <div class="col-9">{{ companyProfile.address }}</div>
    </div>
    <div class="row">
      <div class="col-3">เบอร์โทรศัพท์ 1</div>
      <div class="col-9">{{ companyProfile.phoneNumber1 }}</div>
    </div>
    <div class="row">
      <div class="col-3">เบอร์โทรศัพท์ 2</div>
      <div class="col-9">{{ companyProfile.phoneNumber2 }}</div>
    </div>
    <div class="row">
      <div class="col-3">Line ID</div>
      <div class="col-9">{{ companyProfile.lineId }}</div>
    </div>
    <div class="row">
      <div class="col-3">Email</div>
      <div class="col-9">{{ companyProfile.email }}</div>
    </div>
    <div class="row">
      <div class="col-3">เลขประจำตัวผู้เสียภาษีอากร</div>
      <div class="col-9">{{ companyProfile.taxId }}</div>
    </div>
    <div class="row">
      <div class="col-3">เว็บไซต์</div>
      <div class="col-9">{{ companyProfile.website }}</div>
    </div>
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
import { getCompanyProfile } from "../api";
import AddProductModal from "../components/AddProductModal";
import EditProductModal from "../components/EditProductModal";

export default {
  name: "UserList",
  components: {
    AddProductModal,
    EditProductModal,
  },
  data() {
    return {
      companyProfile: null,
    };
  },
  methods: {
    async doGetCompanyProfile() {
      try {
        const response = await getCompanyProfile();
        this.companyProfile = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.doGetCompanyProfile();
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
