<template>
  <div>
    <div
      class="modal fade edit-purchase-product-modal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="bd-example">
            <div class="form-group row" v-if="product == 'old'">
              <label for="inputCode" class="col-sm-4 col-form-label">
                รหัส
                <span style="color: red">*</span> :
              </label>
              <div class="col-sm-5">
                <input
                  type="text"
                  class="form-control"
                  id="inputCode"
                  placeholder
                  name="productCode"
                  v-model="productCode"
                  v-validate="'required'"
                  :class="{'is-invalid': errors.has('productCode')}"
                  :readonly="isReadonlyForm"
                />
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
import { getMasterData } from "../api";
import { get } from "lodash";
// import Vue from "vue";

export default {
  name: "EditProductToPurchase",
  props: {
    callbackCreate: {
      type: Function,
      default: () => {},
    },
    onCloseModal: {
      type: Function,
      default: () => {},
    },
    productSelected: {
      type: Object,
      default: null,
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
      masterData: [],
      unitFromDistributor: "",
      unitImport: "",
      quantityformDistributor: "",
      quantityImport: "",
      priceImport: "",
      cost: 0,
      unitFromDistributorId: "",
      unitImportId: "",
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
    async getMasterData() {
      try {
        const masterData = await getMasterData();
        this.masterData = masterData.data;
      } catch (error) {
        console.log("get product error.", error.response);
        this.masterData = [];
      }
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
    setupData() {
      this.productCode = get(this.productSelected, "productCode", "");
      this.productName = get(this.productSelected, "productName", "");
      this.quantityformDistributor = get(
        this.productSelected,
        "quantityformDistributor",
        ""
      );
      this.quantityImport = get(this.productSelected, "quantityImport", "");
      this.priceImport = get(this.productSelected, "totalPrice", "");
      this.unitFromDistributor = get(
        this.productSelected,
        "unitFromDistributor",
        ""
      );
      this.unitImport = get(this.productSelected, "unitImport", "");
      this.unitFromDistributorId = get(
        this.productSelected,
        "unitFromDistributorId",
        ""
      );
      this.unitImportId = get(this.productSelected, "unitImportId", "");
      this.remark = get(this.productSelected, "remark", "");
    },
  },
  mounted() {
    // this.getProduct();
    this.getMasterData();
    console.log(this.productSelected);
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