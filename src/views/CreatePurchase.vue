<template >
  <div>
    <div class="header-purchase">สร้างรายการซื้อ</div>
    <purchase-header :sync-data="syncData"></purchase-header>
    <div class="row product-box">
      <div class="col-6">
        <button
          class="btn btn-add-product btn-action"
          @click="openModalProduct = true"
          data-toggle="modal"
          data-target=".add-purchase-product-modal"
          data-backdrop="static"
          data-keyboard="false"
        >
          เพิ่ม
        </button>
        <button
          class="btn btn-edit-product btn-action"
          @click="openModalProductEdit = true"
          data-toggle="modal"
          data-target=".edit-purchase-product-modal"
          data-backdrop="static"
          data-keyboard="false"
          :disabled="!productSelected"
        >
          แก้ไข
        </button>
        <button
          class="btn btn-delete-product btn-action"
          :disabled="!productSelected"
          @click="deleteProduct"
        >
          ลบ
        </button>
      </div>
      <div class="col-6 text-right">
        <button class="btn btn-report disabled">
          <img src="../assets/img/check.svg" class="icon-btn" />
          อนุมัติการสั่งซื้อ
        </button>
        <button class="btn btn-report disabled">พิมพ์ใบเสนอซื้อ</button>
        <button class="btn btn-report disabled">พิมพ์ใบซื้อ</button>
      </div>
    </div>
    <div class="row table-product">
      <div class="col-12">
        <table class="table-bordered table-striped table-hover table">
          <thead>
            <tr>
              <th>ลำดับที่</th>
              <th>รหัส</th>
              <th>ชื่อสินค้า</th>
              <th>จำนวน</th>
              <th>หน่วย</th>
              <th>ราคาทุนต่อหน่วย</th>
              <th>เศษ</th>
              <th>จำนวนเงิน</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(product, key) in products"
              :key="key"
              style="cursor: pointer"
              title="เลือก"
              @click="selectProduct(product)"
              :class="product == productSelected ? 'selected-product' : ''"
            >
              <td>{{ key + 1 }}</td>
              <td>{{ product.productCode }}</td>
              <td>{{ product.productName }}</td>
              <td>{{ formatNumber(product.quantityImport) }}</td>
              <td>{{ product.unitName }}</td>
              <td class="text-right">
                {{ formatNumber(product.pricePerUnitRound) }}
              </td>
              <td class="text-right">
                {{ formatNumber(product.priceDiscount) }}
              </td>
              <td class="text-right">{{ formatNumber(product.totalPrice) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="row">
      <div class="col-12 text-right">
        <div class="row item-summary">
          <div class="col-10 label-summary">รวม:</div>
          <div class="col-2">
            <label class="label-summary">{{ formatFloat(totalPrice) }}</label>
          </div>
        </div>
        <div class="row item-summary">
          <div class="col-10 label-summary">
            หักเศษ:
            <input
              type="text"
              class="input-discount"
              readonly
              :value="formatNumber(totalDiscount)"
            />
          </div>
          <div class="col-2">
            <label class="label-summary">{{
              formatFloat(totalPriceExcludeDiscount)
            }}</label>
          </div>
        </div>
        <div class="row item-summary">
          <div class="col-10 label-summary">
            <input type="text" class="input-discount" readonly value="VAT 7%" />
          </div>
          <div class="col-2">
            <label class="label-summary">{{ formatFloat(totalVat) }}</label>
          </div>
        </div>
        <div class="row item-summary">
          <div class="col-10 label-summary" style="font-size: 20px">
            <b>รวมเงินทั้งสิ้น:</b>
          </div>
          <div class="col-2">
            <label class="label-summary" style="font-size: 20px">
              <b>{{ formatFloat(totalPriceIncludeVat) }}</b>
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="row footer-form">
      <div class="col-12 text-center">
        <button
          class="btn btn-footer btn-footer-cancel"
          @click="redirectToHome"
        >
          ยกเลิก
        </button>
        <button
          class="btn btn-footer btn-footer-submit"
          :disabled="products.length == 0"
          @click="savePurchase"
        >
          บันทึก
        </button>
      </div>
    </div>
    <AddProductToPurchase
      v-if="openModalProduct"
      :callback-create="callbackCreate"
      :on-close-modal="closeModal"
      :product-list="products"
    />
    <EditProductToPurchase
      v-if="openModalProductEdit"
      :callback-create="callbackUpdate"
      :on-close-modal="closeModal"
      :product-selected="productSelected"
    />
  </div>
</template>
<script>
import moment from "moment";
import PurchaseHeader from "../components/PurchaseHeader";
import AddProductToPurchase from "../components/AddProductToPurchase";
import EditProductToPurchase from "../components/EditProductToPurchase";
import { sumBy } from "lodash";
import numeral from "numeral";
import Swal from "sweetalert2";
import { createPurchase } from "../api";

export default {
  name: "CreatePurchase",
  components: {
    PurchaseHeader,
    AddProductToPurchase,
    EditProductToPurchase,
  },
  computed: {
    totalPrice() {
      return sumBy(this.products, "totalPrice");
    },
    totalDiscount() {
      return sumBy(this.products, "priceDiscount");
    },
    totalPriceExcludeDiscount() {
      return this.totalPrice - this.totalDiscount;
    },
    totalVat() {
      return this.roundPrecision(this.totalPrice * 0.07, 2);
    },
    totalPriceIncludeVat() {
      return this.totalPrice + this.totalVat;
    },
  },
  methods: {
    async savePurchase() {
      if (this.products.length > 0) {
        Swal.fire({
          title: "บันทึกรายการสั่งซื้อ",
          // text: "You won't be able to revert this!",
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          cancelButtonText: "บันทึก",
          confirmButtonText: "ยกเลิก",
        }).then(async (result) => {
          if (!result.isConfirmed) {
            try {
              const payload = {
                purchaseTransStatus: "PENDING",
                distributorId: this.distribuData.distributor.id,
                remark: this.distribuData.remark,
                purchaseItems: this.productPayload(),
              };
              const purChase = await createPurchase(payload);
              console.log(purChase.data);
              Swal.fire({
                title: "สร้างรายการซื้อสำเร็จ",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: `ตกลง`,
                cancelButtonText: `กลับหน้าหลัก`,
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  this.$router.push({
                    name: "purchase",
                    params: { purchaseId: purChase.data.id },
                  });
                } else {
                  this.redirectToHome();
                }
              });
              console.log(payload);
            } catch (error) {
              console.log(error);
            }
            this.loading = false;
          }
        });
      }
    },
    productPayload() {
      return this.products.map((product) => {
        return {
          quantityStock: product.quantityImport,
          quantityDistributor: product.quantityformDistributor,
          price: product.totalPrice,
          remark: product.remark,
          productId: product.productId,
          unitPurchaseId: product.unitFromDistributorId,
          unitStockId: product.unitImportId,
        };
      });
    },
    redirectToHome() {
      this.$router.push({ name: "purchase-list" });
    },
    syncData(data) {
      this.distribuData = data;
    },
    closeModal() {
      setTimeout(() => {
        this.openModalProduct = false;
        this.openModalProductEdit = false;
      }, 500);
    },
    callbackCreate(product) {
      this.products = [...this.products, product];
      this.closeModal();
    },
    callbackUpdate(product) {
      let products = [...this.products];
      let index = products.findIndex(
        (item) => item.productCode == product.productCode
      );
      products[index] = product;
      this.products = products;
      this.productSelected = product;
      this.closeModal();
    },
    selectProduct(product) {
      if (product != this.productSelected) {
        this.productSelected = product;
      } else {
        this.productSelected = null;
      }
    },
    roundPrecision(number, places) {
      const factor = Math.pow(10, places);
      return Math.round(number * factor) / factor;
    },
    isInt(n) {
      return n % 1 === 0;
    },
    formatNumber(number) {
      return this.isInt(number)
        ? numeral(number).format()
        : numeral(number).format("0,0.00");
    },
    formatFloat(number) {
      return numeral(number).format("0,0.00");
    },
    deleteProduct() {
      if (this.productSelected) {
        Swal.fire({
          title: "ลบสินค้าออกจากรายการ?",
          // text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "ลบสินค้า",
          cancelButtonText: "ยกเลิก",
        }).then((result) => {
          if (result.isConfirmed) {
            this.products = this.products.filter((product) => {
              return product.productCode != this.productSelected.productCode;
            });
            this.productSelected = null;
          }
        });
      }
    },
  },
  data() {
    return {
      createDate: moment().format("DD/MM/YYYY"),
      distribuData: null,
      openModalProduct: false,
      openModalProductEdit: false,
      products: [],
      productSelected: null,
    };
  },
};
</script>
<style lang="scss">
.selected-product {
  color: #155724;
  background-color: #d4edda !important;
  border-color: #c3e6cb !important;
}
</style>