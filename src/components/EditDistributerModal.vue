<template>
  <div>
    <div
      class="modal fade edit-distributer-modal"
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
                ชื่อ
                <span style="color: red">*</span> :
              </label>
              <div class="col-sm-8">
                <input
                  type="text"
                  class="form-control"
                  id="inputEmail3"
                  placeholder="ชื่อผู้จัดจำหน่าย"
                  name="distributorName"
                  v-model="distributorName"
                  v-validate="'required'"
                  :class="{ 'is-invalid': errors.has('distributorName') }"
                />
                <div class="invalid-feedback">
                  {{ errors.first("distributorName") }}
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label for="input3" class="col-sm-4 col-form-label">
                เลขประจำตัวผู้เสียภาษีอากร
                <span style="color: red">*</span> :
              </label>
              <div class="col-sm-8">
                <input
                  type="text"
                  class="form-control"
                  id="input3"
                  placeholder="เลขประจำตัวผู้เสียภาษีอากร"
                  name="distributorTaxId"
                  v-model="distributorTaxId"
                  v-validate="'required'"
                  :class="{ 'is-invalid': errors.has('distributorTaxId') }"
                />
                <div class="invalid-feedback">
                  {{ errors.first("distributorTaxId") }}
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label for="input4" class="col-sm-4 col-form-label">
                ที่อยู่ 1 :
              </label>
              <div class="col-sm-8">
                <input
                  type="text"
                  class="form-control"
                  id="input4"
                  placeholder="บ้านเลขที่ ซอย ถนน แขวง"
                  name="distributorAddress1"
                  v-model="distributorAddress1"
                />
              </div>
            </div>
            <div class="form-group row">
              <label for="input5" class="col-sm-4 col-form-label"
                >ที่อยู่ 2:</label
              >
              <div class="col-sm-8">
                <input
                  type="text"
                  class="form-control"
                  id="input5"
                  placeholder="อำเภอ/เขต จังหวัด"
                  name="distributorAddress2"
                  v-model="distributorAddress2"
                />
              </div>
            </div>
            <div class="form-group row">
              <label for="input6" class="col-sm-4 col-form-label">
                รหัสไปรษณีย์ :
              </label>
              <div class="col-sm-8">
                <input
                  type="text"
                  class="form-control"
                  id="input6"
                  placeholder="รหัสไปรษณีย์"
                  name="distributorPostcode"
                  v-model="distributorPostcode"
                />
              </div>
            </div>
            <div class="form-group row">
              <label for="input7" class="col-sm-4 col-form-label">
                ผู้ติดต่อ :
              </label>
              <div class="col-sm-8">
                <input
                  type="text"
                  class="form-control"
                  id="input7"
                  placeholder="ชื่อผู้ติดต่อ"
                  name="distributorContactName"
                  v-model="distributorContactName"
                />
              </div>
            </div>
            <div class="form-group row">
              <label for="input8" class="col-sm-4 col-form-label">
                เบอรโทรศัพท์
                <span style="color: red">*</span> :
              </label>
              <div class="col-sm-8">
                <input
                  type="text"
                  class="form-control"
                  id="input8"
                  placeholder
                  name="distributorTelNo"
                  v-model="distributorTelNo"
                  v-validate="'required|max:10|numeric'"
                  :class="{ 'is-invalid': errors.has('distributorTelNo') }"
                />
                <div class="invalid-feedback">
                  {{ errors.first("distributorTelNo") }}
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label for="input9" class="col-sm-4 col-form-label"
                >หมายเหตุ:</label
              >
              <div class="col-sm-8">
                <textarea
                  type="text"
                  class="form-control"
                  id="input9"
                  placeholder="(ถ้ามี)"
                  name="remark"
                  v-model="remark"
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
import { updateDistribute } from "../api";
import { Validator } from "vee-validate";
import { get } from "lodash";
export default {
  name: "EditDistributerModal",
  props: {
    distributorData: {
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
      distributorName: "",
      distributorTaxId: "",
      distributorAddress1: "",
      distributorAddress2: "",
      distributorPostcode: "",
      distributorContactName: "",
      distributorTelNo: "",
      remark: "",
      loading: false,
    };
  },
  methods: {
    async submit() {
      try {
        const validateResult = await this.$validator.validate();
        if (validateResult) {
          this.loading = true;
          const payload = {
            distributorName: this.distributorName,
            distributorTaxId: this.distributorTaxId,
            distributorAddress1: this.distributorAddress1,
            distributorAddress2: this.distributorAddress2,
            distributorPostcode: this.distributorPostcode,
            distributorContactName: this.distributorContactName,
            distributorTelNo: this.distributorTelNo,
            remark: this.remark,
          };
          const response = await updateDistribute(
            payload,
            get(this.distributorData, "id")
          );
          this.callbackCreate(response.data);
          this.$refs.closeModalBtn.click();
        }
      } catch (error) {
        this.loading = false;
      }
      this.loading = false;
    },
    setupData() {
      this.distributorName = get(this.distributorData, "distributorName", "");
      this.distributorTaxId = get(this.distributorData, "distributorTaxId", "");
      this.distributorAddress1 = get(
        this.distributorData,
        "distributorAddress1",
        ""
      );
      this.distributorAddress2 = get(
        this.distributorData,
        "distributorAddress2",
        ""
      );
      this.distributorPostcode = get(
        this.distributorData,
        "distributorPostcode",
        ""
      );
      this.distributorContactName = get(
        this.distributorData,
        "distributorContactName",
        ""
      );
      this.distributorTelNo = get(this.distributorData, "distributorTelNo", "");
      this.remark = get(this.distributorData, "remark", "");
    },
  },
  mounted() {
    const dict = {
      custom: {
        distributorName: {
          required: "กรุณากรอกข้อมูล ชื่อผู้จัดจำหน่าย",
        },
        distributorTaxId: {
          required: "กรุณากรอกข้อมูล เลขประจำตัวผู้เสียภาษีอากร",
        },
        distributorAddress1: {
          required: "กรุณากรอกข้อมูล ที่อยู่",
        },
        distributorPostcode: {
          required: "กรุณากรอกข้อมูล รหัสไปรษณีย์",
        },
        distributorContactName: {
          required: "กรุณากรอกข้อมูล ชื่อผู้ติดต่อ",
        },
        distributorTelNo: {
          required: "กรุณากรอกข้อมูล เบอรโทรศัพท์",
          numeric: "กรุณากรอกข้อมูลตัวเลขเท่านั้น",
          max: "กรุณากรอกข้อมูลไม่เกิน 10 ตัวอักษร",
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
