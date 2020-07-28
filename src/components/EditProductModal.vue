<template>
  <div>
    <div
      class="modal fade edit-product-modal"
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
                  placeholder="รหัสสินค้า"
                  :value="productId"
                  readonly
                />
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
                  :class="{'is-invalid': errors.has('productName')}"
                />
                <div class="invalid-feedback">{{ errors.first('productName') }}</div>
              </div>
            </div>

            <div class="form-group row">
              <label for="input9" class="col-sm-4 col-form-label">หมายเหตุ:</label>
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
            >ยกเลิก</button>
            <button type="button" class="btn btn-primary" @click="submit">บันทึก</button>
          </div>
          <div class="modal-footer" v-else>
            <button
              style="display: none"
              type="button"
              class="btn btn-secondary"
              ref="closeModalBtn"
              data-dismiss="modal"
            >ยกเลิก</button>
            <button type="button" class="btn btn-primary disabled">รอสักครู่...</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { updateProduct } from "../api";
import { get } from "lodash";
export default {
  name: "EditProductModal",
  props: {
    productData: {
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
  computed: {
    productId() {
      return `P000${get(this.productData, "id")}`;
    },
  },
  data() {
    return {
      productName: "",
      remark: "",
      loading: false,
    };
  },
  methods: {
    async submit() {
      console.log(this.$refs);
      try {
        const validateResult = await this.$validator.validate();
        if (validateResult) {
          this.loading = true;
          const payload = {
            productName: this.productName,
            remark: this.remark,
          };
          const response = await updateProduct(
            payload,
            get(this.productData, "id")
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
      console.log(this.productData);
      this.productName = get(this.productData, "productName", "");
      this.remark = get(this.productData, "remark", "");
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