<template >
  <div>
    <div class="header-purchase">สร้างรายการซื้อ</div>
    <purchase-header :sync-data="syncData" purshaseType="update"></purchase-header>
    <div class="row product-box">
      <div class="col-6"></div>
      <div class="col-6 text-right">
        <button class="btn btn-report">
          <img src="../assets/img/check.svg" class="icon-btn" /> อนุมัติการสั่งซื้อ
        </button>
        <button class="btn btn-report" @click="printPurchase">พิมพ์ใบเสนอซื้อ</button>
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
              :class="product == productSelected ? 'selected-product': ''"
            >
              <td>{{ key +1 }}</td>
              <td>{{ product.productCode }}</td>
              <td>{{ product.productName }}</td>
              <td>{{ formatNumber(product.quantityImport) }}</td>
              <td>{{ product.unitName }}</td>
              <td class="text-right">{{ formatNumber(product.pricePerUnitRound) }}</td>
              <td class="text-right">{{ formatNumber(product.priceDiscount) }}</td>
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
            <label class="label-summary">{{ formatFloat(totalPriceExcludeDiscount) }}</label>
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
        <button class="btn btn-footer btn-footer-cancel" @click="redirectToHome">กลับหน้าหลัก</button>
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
// import Swal from "sweetalert2";
import { generatePurchasePDF } from "../api";

export default {
  name: "PurchaseUpdate",
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
    async printPurchase() {
      try {
        const id = this.$route.params.purchaseId;
        const response = await generatePurchasePDF(id);
        this.printPreview(response.data);
      } catch (error) {
        console.log(error);
      }
    },
    printPreview(data, type = "application/pdf") {
      let blob = null;
      blob = this.b64toBlob(data, type);
      const blobURL = URL.createObjectURL(blob);
      const theWindow = window.open(blobURL);
      const theDoc = theWindow.document;
      const theScript = document.createElement("script");
      //function injectThis() {
      //  window.print();
      //}
      theScript.innerHTML = `window.onload = purchase${this.$route.params.purchaseId};`;
      theDoc.body.appendChild(theScript);
    },

    b64toBlob(content, contentType) {
      contentType = contentType || "";
      const sliceSize = 512;
      // method which converts base64 to binary
      const byteCharacters = window.atob(content);

      const byteArrays = [];
      for (
        let offset = 0;
        offset < byteCharacters.length;
        offset += sliceSize
      ) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }
      const blob = new Blob(byteArrays, {
        type: contentType,
      }); // statement which creates the blob
      return blob;
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