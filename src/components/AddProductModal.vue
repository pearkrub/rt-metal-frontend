<template>
  <div>
    <div
      class="modal fade add-product-modal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">เพิ่มข้อมูลสินค้า</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              ref="closeModalBtn"
              @click="onCloseModal"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
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
                  placeholder="รหัสสินค้า"
                  name="productCode"
                  v-model="productCode"
                  v-validate="'required'"
                  :class="{ 'is-invalid': errors.has('productCode') }"
                />
                <div v-if="errors.has('productCode')" class="invalid-feedback">
                  กรุณากรอกข้อมูล รหัสสินค้า
                </div>
              </div>
            </div>
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
                  placeholder="ชื่อสินค้า"
                  name="productName"
                  v-model="productName"
                  v-validate="'required'"
                  :class="{ 'is-invalid': errors.has('productName') }"
                />
                <div v-if="errors.has('productName')" class="invalid-feedback">
                  กรุณากรอกข้อมูล ชื่อสินค้า
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
              @click="onCloseModal"
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
import { postProduct } from "../api";
import Swal from "sweetalert2";
import { get } from "lodash";

export default {
  name: "AddProductModal",
  props: {
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
      productName: "",
      productCode: "",
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
            productName: this.productName,
            productCode: this.productCode,
            remark: this.remark,
          };
          const response = await postProduct(payload);
          this.callbackCreate(response.data);
          this.$refs.closeModalBtn.click();
        }
      } catch (error) {
        if (get(error, "response.status") == 406) {
          Swal.fire("ผิดพลาด!", get(error, "response.data"), "error");
        } else {
          Swal.fire("ผิดพลาด!", "ไม่สามารถเพิ่มข้อมูลได้", "error");
        }
        this.loading = false;
      }
      this.loading = false;
    },
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
