<template >
  <div>
    <div class="header-purchase">สร้างรายการซื้อ</div>
    <purchase-header :sync-data="syncData"></purchase-header>
    <div class="row product-box">
      <div class="col-6">
        <button class="btn btn-add-product btn-action">เพิ่ม</button>
        <button class="btn btn-edit-product btn-action">แก้ไข</button>
        <button class="btn btn-delete-product btn-action">ลบ</button>
      </div>
      <div class="col-6 text-right">
        <button class="btn btn-report disabled">
          <img src="../assets/img/check.svg" class="icon-btn" /> อนุมัติการสั่งซื้อ
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
            <tr>
              <td>1</td>
              <td>P0001</td>
              <td>เหล็ก</td>
              <td>100</td>
              <td>เส้น</td>
              <td class="text-right">5,000.00</td>
              <td class="text-right">1,000.00</td>
              <td class="text-right">22.000.00</td>
            </tr>
            <tr>
              <td>1</td>
              <td>P0001</td>
              <td>เหล็ก</td>
              <td>100</td>
              <td>เส้น</td>
              <td class="text-right">5,000.00</td>
              <td class="text-right">1,000.00</td>
              <td class="text-right">22.000.00</td>
            </tr>
            <tr>
              <td>1</td>
              <td>P0001</td>
              <td>เหล็ก</td>
              <td>100</td>
              <td>เส้น</td>
              <td class="text-right">5,000.00</td>
              <td class="text-right">1,000.00</td>
              <td class="text-right">22.000.00</td>
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
            <label class="label-summary">1,223,600.00</label>
          </div>
        </div>
        <div class="row item-summary">
          <div class="col-10 label-summary">
            หักเศษ:
            <input type="text" class="input-discount" readonly value="5,000.00" />
          </div>
          <div class="col-2">
            <label class="label-summary">1,218,600.00</label>
          </div>
        </div>
        <div class="row item-summary">
          <div class="col-10 label-summary">
            <input type="text" class="input-discount" readonly value="VAT 7%" />
          </div>
          <div class="col-2">
            <label class="label-summary">84,602.00</label>
          </div>
        </div>
        <div class="row item-summary">
          <div class="col-10 label-summary" style="font-size: 20px">
            <b>รวมเงินทั้งสิ้น:</b>
          </div>
          <div class="col-2">
            <label class="label-summary" style="font-size: 20px">
              <b>1,293,202.00</b>
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="row footer-form">
      <div class="col-12 text-center">
        <button class="btn btn-footer btn-footer-cancel">ยกเลิก</button>
        <button class="btn btn-footer btn-footer-submit">บันทึก</button>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import PurchaseHeader from "../components/PurchaseHeader";
export default {
  name: "CreatePurchase",
  components: {
    PurchaseHeader,
  },
  computed: {},
  methods: {
    syncData(data) {
      this.distribuData = data;
    },
  },
  data() {
    return {
      createDate: moment().format("DD/MM/YYYY"),
      distribuData: null,
    };
  },
};
</script>
<style lang="scss">
</style>