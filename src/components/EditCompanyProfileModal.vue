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
                ชื่อบริษัท
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
                  v-validate="'required'"
                  :class="{ 'is-invalid': errors.has('companyName') }"
                />
                <div v-if="errors.has('companyName')" class="invalid-feedback">
                  {{ errors.first("companyName") }}
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label for="input9" class="col-sm-4 col-form-label"
                >ที่อยู่ <span style="color: red">*</span> :</label
              >
              <div class="col-sm-8">
                <textarea
                  type="text"
                  class="form-control"
                  id="input9"
                  placeholder="ที่อยู่"
                  name="address"
                  v-model="address"
                  v-validate="'required'"
                  :class="{ 'is-invalid': errors.has('address') }"
                />
                <div v-if="errors.has('address')" class="invalid-feedback">
                  {{ errors.first("address") }}
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label for="inputEmail4" class="col-sm-4 col-form-label">
                เบอร์โทรศัพท์ 1
                <span style="color: red">*</span> :
              </label>
              <div class="col-sm-8">
                <input
                  type="text"
                  class="form-control"
                  id="inputEmail4"
                  name="phoneNumber1"
                  placeholder="เบอร์โทรศัพท์ 1"
                  v-model="phoneNumber1"
                  v-validate="'required|max:10|numeric'"
                  :class="{ 'is-invalid': errors.has('phoneNumber1') }"
                />
                <div v-if="errors.has('phoneNumber1')" class="invalid-feedback">
                  {{ errors.first("phoneNumber1") }}
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label for="inputEmail5" class="col-sm-4 col-form-label">
                เบอร์โทรศัพท์ 2 :
              </label>
              <div class="col-sm-8">
                <input
                  type="text"
                  class="form-control"
                  id="inputEmail5"
                  name="phoneNumber2"
                  placeholder="เบอร์โทรศัพท์ 2"
                  v-model="phoneNumber2"
                  v-validate="'max:10|numeric'"
                  :class="{ 'is-invalid': errors.has('phoneNumber2') }"
                />
                <div v-if="errors.has('phoneNumber2')" class="invalid-feedback">
                  {{ errors.first("phoneNumber2") }}
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label for="inputEmail6" class="col-sm-4 col-form-label">
                เบอร์โทรศัพท์ 3 :
              </label>
              <div class="col-sm-8">
                <input
                  type="text"
                  class="form-control"
                  id="inputEmail6"
                  name="phoneNumber3"
                  placeholder="เบอร์โทรศัพท์ 3"
                  v-model="phoneNumber3"
                  v-validate="'max:10|numeric'"
                  :class="{ 'is-invalid': errors.has('phoneNumber3') }"
                />
                <div v-if="errors.has('phoneNumber3')" class="invalid-feedback">
                  {{ errors.first("phoneNumber3") }}
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label for="inputEmail8" class="col-sm-4 col-form-label">
                LINE ID :
              </label>
              <div class="col-sm-8">
                <input
                  type="text"
                  class="form-control"
                  id="inputEmail8"
                  name="lineId"
                  placeholder="LINE ID"
                  v-model="lineId"
                />
              </div>
            </div>
            <div class="form-group row">
              <label for="inputEmail9" class="col-sm-4 col-form-label">
                Email <span style="color: red">*</span> :
              </label>
              <div class="col-sm-8">
                <input
                  type="email"
                  class="form-control"
                  id="inputEmail9"
                  name="email"
                  placeholder="Email"
                  v-model="email"
                  v-validate="'required|email'"
                  :class="{ 'is-invalid': errors.has('email') }"
                />
                <div v-if="errors.has('email')" class="invalid-feedback">
                  {{ errors.first("email") }}
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label for="inputEmail7" class="col-sm-4 col-form-label">
                เลขประจำตัวผู้เสียภาษีอากร <span style="color: red">*</span> :
              </label>
              <div class="col-sm-8">
                <input
                  type="text"
                  class="form-control"
                  id="inputEmail7"
                  name="taxId"
                  placeholder="เลขประจำตัวผู้เสียภาษีอากร"
                  v-model="taxId"
                  v-validate="'required|numeric'"
                  :class="{ 'is-invalid': errors.has('taxId') }"
                />
                <div v-if="errors.has('taxId')" class="invalid-feedback">
                  {{ errors.first("taxId") }}
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label for="inputEmail10" class="col-sm-4 col-form-label">
                เว็บไซต์ :
              </label>
              <div class="col-sm-8">
                <input
                  type="text"
                  class="form-control"
                  id="inputEmail10"
                  name="website"
                  placeholder="เว็บไซต์"
                  v-model="website"
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
import { Validator } from "vee-validate";

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
          const response = await updateCompanyProfile(payload);
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
    const dict = {
      custom: {
        companyName: {
          required: "กรุณากรอกข้อมูล ชื่อบริษัท",
        },
        address: {
          required: "กรุณากรอกข้อมูล ที่อยู่",
        },
        phoneNumber1: {
          required: "กรุณากรอกข้อมูล เบอร์โทรศัพท์ 1",
          max: "กรุณากรอกข้อมูลไม่เกิน 10 ตัวอักษร",
          numeric: "กรุณากรอกข้อมูลตัวเลขเท่านั้น",
        },
        phoneNumber2: {
          max: "กรุณากรอกข้อมูลไม่เกิน 10 ตัวอักษร",
          numeric: "กรุณากรอกข้อมูลตัวเลขเท่านั้น",
        },
        phoneNumber3: {
          max: "กรุณากรอกข้อมูลไม่เกิน 10 ตัวอักษร",
          numeric: "กรุณากรอกข้อมูลตัวเลขเท่านั้น",
        },
        email: {
          required: "กรุณากรอกข้อมูล อีเมล",
          email: "กรุณากรอกข้อมูลอีเมลให้ถูกต้อง",
        },
        taxId: {
          required: "กรุณากรอกข้อมูล เลขประจำตัวผู้เสียภาษีอากร",
          numeric: "กรุณากรอกข้อมูลตัวเลขเท่านั้น",
        },
      },
    };

    Validator.localize("th");
    Validator.localize("th", dict);
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
