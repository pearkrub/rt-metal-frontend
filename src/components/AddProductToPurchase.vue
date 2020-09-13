<template>
  <div>
    <div
      class="modal fade add-purchase-product-modal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="bd-example">
            <div class="form-group row">
              <div class="col-sm-4">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="gridRadios"
                    id="gridRadios1"
                    value="new"
                    v-model="product"
                  />
                  <label class="form-check-label" for="gridRadios1">สินค้าใหม่</label>
                </div>
              </div>
              <div class="col-sm-8" v-if="products.length > 0">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="gridRadios"
                    id="gridRadios2"
                    value="old"
                    v-model="product"
                  />
                  <label class="form-check-label" for="gridRadios2">สินค้าเดิม</label>
                </div>
              </div>
            </div>
            <div class="form-group row" v-if="product == 'old'">
              <label for="inputEmail3" class="col-sm-4 col-form-label">
                รหัส
                <span style="color: red">*</span> :
              </label>
              <div class="col-sm-5">
                <select
                  class="form-control"
                  v-model="productCode"
                  name="productCode"
                  v-validate="'required'"
                  :class="{'is-invalid': errors.has('productCode')}"
                  @change="selectProduct"
                >
                  <option v-for="(code, index) in productCodeList" :key="index">{{ code }}</option>
                </select>
                <div class="invalid-feedback">{{ errors.first('productCode') }}</div>
              </div>
            </div>
            <div class="form-group row">
              <label for="inputName" class="col-sm-4 col-form-label">
                ชื่อ
                <span style="color: red">*</span> :
              </label>
              <div class="col-sm-5">
                <input
                  type="text"
                  class="form-control"
                  id="inputName"
                  placeholder="ชื่อสินค้า"
                  name="productName"
                  v-model="productName"
                  v-validate="'required'"
                  :class="{'is-invalid': errors.has('productName')}"
                  :readonly="isReadonlyForm"
                />
                <div class="invalid-feedback">{{ errors.first('productName') }}</div>
              </div>
            </div>
            <div class="form-group row">
              <label for="inputExport" class="col-sm-4 col-form-label">
                ปริมาณ (จากผู้จัดจำหน่าย)
                <span style="color: red">*</span> :
              </label>
              <div class="col-sm-5">
                <input
                  type="text"
                  class="form-control"
                  id="inputExport"
                  placeholder="0.00"
                  name="quantityformDistributor"
                  v-model="quantityformDistributor"
                  v-validate="'required|decimal:2'"
                  :class="{'is-invalid': errors.has('quantityformDistributor')}"
                />
                <div class="invalid-feedback">{{ errors.first('quantityformDistributor') }}</div>
              </div>
              <div class="col-sm-3">
                <select
                  class="form-control"
                  v-model="unitFromDistributor"
                  name="unitFromDistributor"
                  v-validate="'required'"
                  :class="{'is-invalid': errors.has('unitFromDistributor')}"
                  @change="selectUnitFromDistributor"
                >
                  <option
                    v-for="(unit, index) in units"
                    :key="index"
                    :value="unit.code"
                  >{{ unit.name }}</option>
                </select>
                <div class="invalid-feedback">{{ errors.first('unitFromDistributor') }}</div>
              </div>
            </div>
            <div class="form-group row">
              <label for="inputImport" class="col-sm-4 col-form-label">
                ปริมาณ (เข้าคลังสินค้า)
                <span style="color: red">*</span> :
              </label>
              <div class="col-sm-5">
                <input
                  type="text"
                  class="form-control"
                  id="inputImport"
                  placeholder="0.00"
                  name="quantityImport"
                  v-model="quantityImport"
                  v-validate="'required|decimal:2'"
                  :class="{'is-invalid': errors.has('quantityImport')}"
                />
                <div class="invalid-feedback">{{ errors.first('quantityImport') }}</div>
              </div>
              <div class="col-sm-3">
                <select
                  class="form-control"
                  v-model="unitImport"
                  name="unitImport"
                  v-validate="'required'"
                  :class="{'is-invalid': errors.has('unitImport')}"
                  @change="selectUnitFromImport"
                >
                  <option
                    v-for="(unit, index) in units"
                    :key="index"
                    :value="unit.code"
                  >{{ unit.name }}</option>
                </select>
                <div class="invalid-feedback">{{ errors.first('unitImport') }}</div>
              </div>
            </div>
            <div class="form-group row">
              <label for="inputBuy" class="col-sm-4 col-form-label">
                ราคาซื้อ
                <span style="color: red">*</span> :
              </label>
              <div class="col-sm-5">
                <input
                  type="text"
                  class="form-control"
                  id="inputBuy"
                  placeholder="0.00"
                  name="priceImport"
                  v-model="priceImport"
                  v-validate="'required|decimal:2'"
                  :class="{'is-invalid': errors.has('priceImport')}"
                />
                <div class="invalid-feedback">{{ errors.first('priceImport') }}</div>
              </div>
            </div>
            <div class="form-group row">
              <label for="inputPerUnit" class="col-sm-4 col-form-label">
                ราคาต่อหน่วย ({{ unitImportName }}ละ)
                <span style="color: red">*</span> :
              </label>
              <div class="col-sm-5">
                <input
                  type="text"
                  class="form-control"
                  id="inputPerUnit"
                  placeholder="0.00"
                  name="pricePerUnitRound"
                  v-model="pricePerUnitRound"
                  v-validate="'required'"
                  :class="{'is-invalid': errors.has('pricePerUnitRound')}"
                  readonly
                />
                <div class="invalid-feedback">{{ errors.first('pricePerUnitRound') }}</div>
              </div>
            </div>
            <div class="form-group row">
              <label for="inputDiscount" class="col-sm-4 col-form-label">
                เศษ (ส่วนลด)
                <span style="color: red">*</span> :
              </label>
              <div class="col-sm-5">
                <input
                  type="text"
                  class="form-control"
                  id="inputDiscount"
                  placeholder="0.00"
                  name="priceDiscount"
                  v-model="priceDiscount"
                  v-validate="'required'"
                  :class="{'is-invalid': errors.has('priceDiscount')}"
                  readonly
                />
                <div class="invalid-feedback">{{ errors.first('priceDiscount') }}</div>
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
              @click="onCloseModal"
            >ยกเลิก</button>
            <button type="button" class="btn btn-primary disabled">รอสักครู่...</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { postProduct, getProduct, getMasterData } from "../api";
import { get, head } from "lodash";
// import Vue from "vue";

export default {
  name: "AddProductToPurchase",
  props: {
    callbackCreate: {
      type: Function,
      default: () => {},
    },
    onCloseModal: {
      type: Function,
      default: () => {},
    },
    productList: {
      type: Array,
    },
  },
  data() {
    return {
      remark: "",
      loading: false,
      product: "old",
      products: [],
      productCode: "",
      productName: "",
      productSelected: null,
      masterData: [],
      unitFromDistributor: "",
      unitImport: "",
      unitFromDistributorId: "",
      unitImportId: "",
      quantityformDistributor: "",
      quantityImport: "",
      priceImport: "",
      cost: 0,
    };
  },
  computed: {
    productCodeList() {
      return this.products.map((product) => {
        return product.productCode;
      });
    },
    isReadonlyForm() {
      return this.product == "old";
    },
    units() {
      return get(this.masterData, "units", []);
    },
    pricePerUnit() {
      const quantityImport =
        this.quantityImport != "" ? parseFloat(this.quantityImport) : 0;
      const priceImport =
        this.priceImport != "" ? parseFloat(this.priceImport) : 0;
      if (priceImport > 0 && quantityImport) {
        return priceImport / quantityImport;
      }
      return 0;
    },
    pricePerUnitRound() {
      const quantityImport =
        this.quantityImport != "" ? parseFloat(this.quantityImport) : 0;
      const priceImport =
        this.priceImport != "" ? parseFloat(this.priceImport) : 0;
      if (priceImport > 0 && quantityImport) {
        return this.roundPrecision(priceImport / quantityImport, 2);
      }
      return 0;
    },
    priceDiscount() {
      const quantityImport =
        this.quantityImport != "" ? parseFloat(this.quantityImport) : 0;
      // const priceImport =
      // this.priceImport != "" ? parseFloat(this.priceImport) : 0;
      if (quantityImport && this.pricePerUnit) {
        return this.roundPrecision(
          this.pricePerUnitRound * quantityImport -
            parseFloat(this.priceImport),
          2
        );
      }
      return 0;
    },
    unitImportName() {
      const unit = this.units.find((unit) => {
        return unit.code == this.unitImport;
      });
      return get(unit, "name", "");
    },
  },
  methods: {
    roundPrecision(number, places) {
      const factor = Math.pow(10, places);
      return Math.round(number * factor) / factor;
    },
    async submit() {
      if (this.product == "old") {
        try {
          const validateResult = await this.$validator.validate();
          if (validateResult) {
            this.loading = true;
            const productObj = {
              productCode: this.productCode,
              productName: this.productName,
              productId: this.productSelected.id,
              quantityImport: parseFloat(this.quantityImport),
              quantityformDistributor: parseFloat(this.quantityformDistributor),
              unitName: this.unitImportName,
              unitFromDistributor: this.unitFromDistributor,
              unitImport: this.unitImport,
              pricePerUnitRound: this.pricePerUnitRound,
              priceDiscount: this.priceDiscount,
              totalPrice: parseFloat(this.priceImport),
              unitFromDistributorId: this.unitFromDistributorId,
              unitImportId: this.unitImportId,
              remark: this.remark,
            };
            this.callbackCreate(productObj);
            this.$refs.closeModalBtn.click();
          }
        } catch (error) {
          this.loading = false;
        }
      }
    },
    async createProduct() {
      try {
        const validateResult = await this.$validator.validate();
        if (validateResult) {
          this.loading = true;
          const payload = {
            remark: this.remark,
          };
          const response = await postProduct(payload);
          this.callbackCreate(response.data);
          this.$refs.closeModalBtn.click();
        }
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    },
    async getProduct() {
      try {
        const products = await getProduct();
        this.products = products.data.filter((product) => {
          return (
            this.productList.findIndex((obj) => {
              return obj.productCode == product.productCode;
            }) == -1
          );
        });
        if (this.products.length > 0) {
          this.productCode = get(head(this.products), "productCode", "");
          this.selectProduct();
        } else {
          this.product = "new";
        }
      } catch (error) {
        console.log("get product error.", error);
        this.products = [];
      }
    },
    async getMasterData() {
      try {
        const masterData = await getMasterData();
        this.masterData = masterData.data;
        const firstUnit = head(get(masterData, "data.units", []));
        this.unitFromDistributor = get(firstUnit, "code", "");
        this.unitImport = get(firstUnit, "code", "");
      } catch (error) {
        console.log("get product error.", error.response);
        this.masterData = [];
      }
    },
    selectProduct() {
      this.productSelected = this.products.find((product) => {
        return product.productCode == this.productCode;
      });
      this.productName = this.productSelected.productName;
    },
    selectUnitFromDistributor() {
      this.unitFromDistributorId = this.units.find(
        (unit) => unit.code == this.unitFromDistributor
      ).id;
    },
    selectUnitFromImport() {
      this.unitImportId = this.units.find(
        (unit) => unit.code == this.unitImport
      ).id;
    },
  },
  mounted() {
    this.getProduct();
    this.getMasterData();
  },
  // watch: {
  //   quantityformDistributor(newValue) {
  //     const result = newValue
  //       .replace(/\D/g, "")
  //       .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  //     Vue.nextTick(() => (this.quantityformDistributor = result));
  //   },
  // },
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