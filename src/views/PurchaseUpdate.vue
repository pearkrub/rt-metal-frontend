<template >
  <div>
    <div class="header-purchase">สร้างรายการซื้อ</div>
    <purchase-header
      v-if="!loading"
      :sync-data="syncData"
      purshaseType="update"
      :purchaseStatus="purchaseStatus"
      :distributorData="distributorData"
      :purchaseData="purchase"
    ></purchase-header>
    <div class="row product-box">
      <div class="col-6"></div>
      <div class="col-6 text-right">
        <button
          class="btn btn-report"
          @click="updateStatus('APPROVED')"
          v-if="purchaseStatus == 'PENDING'"
        >
          <img src="../assets/img/check.svg" class="icon-btn" />
          อนุมัติการสั่งซื้อ
        </button>
        <button
          class="btn btn-report-success"
          @click="updateStatus('SUCCESS')"
          v-if="purchaseStatus == 'APPROVED'"
        >
          <img src="../assets/img/check.svg" class="icon-btn" />
          ยืนยันการรับสินค้า
        </button>
        <button
          class="btn btn-report"
          :disabled="
            purchaseStatus != 'APPROVED' &&
            purchaseStatus != 'SUCCESS' &&
            purchaseStatus != 'SUCCESS_BY_CREDIT'
          "
          @click="printPurchase('ORDER')"
        >
          พิมพ์ใบเสนอซื้อ
        </button>
        <button
          class="btn btn-report"
          :disabled="
            purchaseStatus != 'SUCCESS' && purchaseStatus != 'SUCCESS_BY_CREDIT'
          "
          @click="printPurchase('PURCHASE')"
        >
          พิมพ์ใบซื้อ
        </button>
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
              :class="product == productSelected ? 'selected-product' : ''"
            >
              <td>{{ key + 1 }}</td>
              <td>{{ product.product.productCode }}</td>
              <td>{{ product.product.productName }}</td>
              <td>{{ formatNumber(product.quantityStock) }}</td>
              <td>{{ product.unitPurchase.name }}</td>
              <td class="text-right">
                {{ formatNumber(product.pricePerUnit) }}
              </td>
              <td class="text-right">
                {{ formatNumber(product.discount) }}
              </td>
              <td class="text-right">{{ formatNumber(product.price) }}</td>
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
          กลับหน้าหลัก
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
import { sumBy, get } from "lodash";
import numeral from "numeral";
import Swal from "sweetalert2";
import {
  generatePurchasePDF,
  getPurchaseById,
  updateStatusPurchase,
  updatePurchaseInventory,
} from "../api";

export default {
  name: "PurchaseUpdate",
  components: {
    PurchaseHeader,
    AddProductToPurchase,
    EditProductToPurchase,
  },
  computed: {
    totalPrice() {
      return sumBy(this.products, "price");
    },
    totalDiscount() {
      return sumBy(this.products, "discount");
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
    purchaseStatus() {
      return get(this.purchaseTransStatus, "purchaseTransStatus", "");
    },
    distributorData() {
      return get(this.purchase, "distributor");
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
    async printPurchase(documentType) {
      try {
        const id = this.$route.params.purchaseId;
        const payload = {
          documentType: documentType,
        };
        const response = await generatePurchasePDF(id, payload);
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
    async getPurchase() {
      this.loading = true;
      try {
        const response = await getPurchaseById(this.$route.params.purchaseId);
        console.log(response.data);
        this.purchase = response.data.purchase;
        this.products = response.data.purchaseItems;
        this.purchaseTransStatus = response.data.purchaseTransStatus;
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
    },
    async updateStatus(status) {
      Swal.fire({
        title:
          status == "APPROVED" ? "อนุมัติรายการสั่งซื้อ" : "ยืนยันการรับสินค้า",
        // text: "You won't be able to revert this!",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        cancelButtonText: "บันทึก",
        confirmButtonText: "ยกเลิก",
      }).then(async (result) => {
        if (!result.isConfirmed) {
          if (status == "APPROVED") {
            this.updatePurchase(status);
          } else {
            this.updateInventory(this.$route.params.purchaseId);
          }
        }
      });
    },
    async updatePurchase(status) {
      try {
        const payload = {
          status: status,
        };
        await updateStatusPurchase(this.$route.params.purchaseId, payload);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    },
    async updateInventory(purchaseId) {
      const inputOptions = new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            CASH: "เงินสด",
            CREDIT: "เครดิต",
          });
        }, 500);
      });

      const { value: paymentMethod } = await Swal.fire({
        title: "ช่องทางการชำระเงิน",
        input: "radio",
        inputOptions: inputOptions,
        inputValidator: (value) => {
          if (!value) {
            return "กรุณาเลือก ช่องทางการชำระเงิน";
          }
        },
      });

      if (paymentMethod) {
        try {
          const payload = {
            purchaseId: purchaseId,
            paymentMethod: paymentMethod,
          };
          await updatePurchaseInventory(payload);
          // window.location.reload();
        } catch (error) {
          console.log(error);
        }
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
      purchase: null,
      loading: false,
      purchaseTransStatus: null,
    };
  },
  mounted() {
    this.getPurchase();
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