<template>
  <div>
    <div
      class="modal fade edit-company-profile-modal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="bd-example">
            <div class="form-group row">
              <label for="inputEmail3" class="col-sm-4 col-form-label">
                รหัส
                <span style="color: red">*</span> :
              </label>
              <div class="col-sm-8">
                <input
                  type="text"
                  class="form-control"
                  id="inputEmail2"
                  name="companyName"
                  placeholder="ชื่อบริษัท"
                  v-model="companyName"
                />
              </div>
            </div>
          </div>
          <div class="modal-footer" v-if="!loading">
            <button
              type="button"
              class="btn btn-secondary"
              ref="closeModalBtn"
              data-dismiss="modal"
              @click="onCloseModal"
            >
              ยกเลิก
            </button>
            <button type="button" class="btn btn-primary" @click="submit">
              บันทึก
            </button>
          </div>
          <div class="modal-footer" v-else>
            <button
              style="display: none"
              type="button"
              class="btn btn-secondary"
              ref="closeModalBtn"
              data-dismiss="modal"
            >
              ยกเลิก
            </button>
            <button type="button" class="btn btn-primary disabled">
              รอสักครู่...
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { updateCompanyProfile } from "../api";
import { get } from "lodash";
import Swal from "sweetalert2";

export default {
  name: "EditCompanyProfileModal",
  props: {
    companyProfileData: {
      type: Object,
      default: null,
    },
    callbackCreate: {
      type: Function,
      default: () => {},
    },
    onCloseModal: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      loading: false,
      companyName: "",
      address: "",
      phoneNumber1: "",
      phoneNumber2: "",
      phoneNumber3: "",
      lineId: "",
      email: "",
      website: "",
      taxId: "",
    };
  },
  methods: {
    async submit() {
      try {
        const validateResult = await this.$validator.validate();
        if (validateResult) {
          this.loading = true;
          const payload = {
            companyName: this.companyName,
            address: this.address,
            phoneNumber1: this.phoneNumber1,
            phoneNumber2: this.phoneNumber2,
            phoneNumber3: this.phoneNumber3,
            lineId: this.lineId,
            email: this.email,
            website: this.website,
            taxId: this.taxId,
          };
          const response = await updateCompanyProfile(
            payload,
          );
          this.callbackCreate(response.data);
          this.$refs.closeModalBtn.click();
        }
      } catch (error) {
        if (get(error, "response.status") == 406) {
          Swal.fire("ผิดพลาด!", get(error, "response.data"), "error");
        } else {
          Swal.fire("ผิดพลาด!", "ไม่สามารถแก้ไขข้อมูลได้", "error");
        }
        this.loading = false;
      }
      this.loading = false;
    },
    setupData() {
      console.log(this.companyProfileData)
      this.companyName = get(this.companyProfileData, "companyName", "");
      this.address = get(this.companyProfileData, "address", "");
      this.phoneNumber1 = get(this.companyProfileData, "phoneNumber1", "");
      this.phoneNumber2 = get(this.companyProfileData, "phoneNumber2", "");
      this.phoneNumber3 = get(this.companyProfileData, "phoneNumber3", "");
      this.lineId = get(this.companyProfileData, "lineId", "");
      this.email = get(this.companyProfileData, "email", "");
      this.website = get(this.companyProfileData, "website", "");
      this.taxId = get(this.companyProfileData, "taxId", "");
    },
  },
  mounted() {
    this.setupData();
  },
};
</script>
<style lang="scss" scoped>
.bd-example {
  position: relative;
  margin: 1rem -15px 0;
  border-width: 0.2rem 0 0;
  padding: 1.5rem;
  margin-right: 0;
  margin-left: 0;
  border-width: 0.2rem;
}
</style>
