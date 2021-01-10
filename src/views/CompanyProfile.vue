<template>
  <div>
    <div class="row">
      <div class="col-3">
        <button
          class="btn btn-sm"
          data-toggle="modal"
          data-target=".edit-company-profile-modal"
          data-backdrop="static"
          data-keyboard="false"
          @click="editCompanyProfile(companyProfile)"
        >
          แก้ไข
        </button>
      </div>
    </div>
    <div v-if="companyProfile">
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
        <div class="col-3">เบอร์โทรศัพท์ 3</div>
        <div class="col-9">{{ companyProfile.phoneNumber3 }}</div>
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
    </div>
    <EditCompanyProfileModal
      v-if="openModalEdit"
      :callback-create="callbackEdit"
      :company-profile-data="companyProfile"
      :on-close-modal="closeModal"
    />
  </div>
</template>
<script>
import { getCompanyProfile } from "../api";
import EditCompanyProfileModal from "../components/EditCompanyProfileModal";
import Swal from "sweetalert2";

export default {
  name: "CompanyProfile",
  components: {
    EditCompanyProfileModal,
  },
  data() {
    return {
      companyProfile: null,
      openModalEdit: false,
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
    editCompanyProfile(data) {
      this.openModalEdit = true;
      this.companyProfile = data;
    },
    callbackEdit() {
      Swal.fire("สำเร็จ!", "บันทึกข้อมูลเรียบร้อยแล้ว", "success");
      this.closeModal();
      this.doGetCompanyProfile();
    },
    closeModal() {
      setTimeout(() => {
        this.openModalEdit = false;
      }, 500);
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
