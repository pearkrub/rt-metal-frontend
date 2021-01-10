<template>
  <div>
    <div class="panel-group">
      <div class="panel panel-default">
        <div class="panel-heading header-panel-address">
          <a data-toggle="collapse" class="btn btn-info" href="#collapse1"
            >ซ่อน/แสดง ข้อมูลที่อยู่</a
          >
        </div>
        <div id="collapse1" class="panel-collapse collapse in show">
          <div class="row">
            <div class="address-box col-6">
              <div class="label-purchase" v-if="purshaseType == 'update'">
                รายการสั่งซื้อเลขที่:
                <label class="item-purchase">{{ purchaseCode }}</label>
              </div>
              <div class="label-purchase">
                วันที่:
                <label class="date-box">{{ createDate }}</label>
              </div>
              <div class="label-purchase">
                สถานะ:
                <label class="item-purchase" v-html="statusPurchase"> </label>
              </div>
              <div class="label-purchase" v-if="showPaymentMethod">
                ช่องทางการชำระเงิน:
                <label class="item-purchase" v-html="paymentMethod"></label>
              </div>
            </div>
            <div class="address-box col-6">
              <div class="label-purchase">หมายเหตุ:</div>
              <div class="label-purchase">
                <textarea
                  v-model="remark"
                  class="remark-box"
                  cols="35"
                  rows="3"
                ></textarea>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="address-box col-12">
              <div class="label-purchase">
                ผู้จัดจำหน่าย:
                <label class="item-purchase">
                  <div class="input-group">
                    <select
                      class="form-control form-merchant"
                      :disabled="purshaseType == 'update'"
                      v-model="distributorId"
                    >
                      <option
                        v-for="(item, index) in distributors"
                        :key="index"
                        :value="item.id"
                      >
                        {{ item.distributorName }}
                      </option>
                    </select>
                    <button
                      class="btn btn-primary btn-add-merchant"
                      data-toggle="modal"
                      data-target=".add-distributer-modal"
                      @click="openModalCreate = true"
                      data-backdrop="static"
                      data-keyboard="false"
                      v-if="purshaseType == 'create'"
                    >
                      เพิ่ม
                    </button>
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="address-box col-6">
              <div class="label-purchase">
                รหัส:
                <label class="item-purchase">{{
                  getData(distributor, "id")
                }}</label>
              </div>
              <div class="label-purchase">
                เลขประจำตัวผู้เสียภาษีอากร:
                <label class="item-purchase">{{
                  getData(distributor, "distributorTaxId")
                }}</label>
              </div>
              <div class="label-purchase">
                ที่อยู่ 1:
                <label class="item-purchase">{{
                  getData(distributor, "distributorAddress1", "-")
                }}</label>
              </div>
              <div class="label-purchase">
                ที่อยู่ 2:
                <label class="item-purchase">{{
                  getData(distributor, "distributorAddress2", "-")
                }}</label>
              </div>
              <div class="label-purchase">
                รหัสไปรษณีย์:
                <label class="item-purchase">{{
                  getData(distributor, "distributorPostcode", "-")
                }}</label>
              </div>
            </div>
            <div class="address-box col-6">
              <div class="label-purchase">
                ผู้ติดต่อ:
                <label class="item-purchase">{{
                  getData(distributor, "distributorContactName", "-")
                }}</label>
              </div>
              <div class="label-purchase">
                เบอร์โทรศัพท์:
                <label class="item-purchase">{{
                  getData(distributor, "distributorTelNo")
                }}</label>
              </div>
              <div class="label-purchase">
                หมายเหตุ:
                <label class="item-purchase">{{
                  getData(distributor, "remark", "-")
                }}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AddDistributerModal
      v-if="openModalCreate"
      :callback-create="callbackCreate"
      :on-close-modal="closeModal"
    />
  </div>
</template>

<script>
import moment from "moment";
import { getDistribute } from "../api";
import { get, head, find } from "lodash";
import AddDistributerModal from "../components/AddDistributerModal";
import Swal from "sweetalert2";

export default {
  props: {
    syncData: {
      type: Function,
      default: () => {},
    },
    purshaseType: {
      type: String,
      default: "create",
    },
    purchaseStatus: {
      type: String,
      default: "PENDING",
    },
    distributorData: {
      type: Object,
      default: null,
    },
    purchaseData: {
      type: Object,
      default: null,
    },
  },
  name: "PurchaseHeader",
  components: {
    AddDistributerModal,
  },
  data() {
    return {
      distributors: [],
      distributorId: get(this.distributorData, "id"),
      remark: get(this.purchaseData, "remark"),
      openModalCreate: false,
    };
  },
  computed: {
    createDate() {
      return moment().format("DD/MM/YYYY");
    },
    distributor() {
      if (this.distributorId != "") {
        return find(this.distributors, (distributor) => {
          return distributor.id == this.distributorId;
        });
      }
      return null;
    },
    statusPurchase() {
      return this.getStatus(this.purchaseStatus);
    },
    paymentMethod() {
      return this.purchaseStatus == "SUCCESS"
        ? '<div class="status-success">เงินสด</div>'
        : '<div class="status-approved">บัตรเครดิต</div>';
    },
    showPaymentMethod() {
      return (
        this.purchaseStatus == "SUCCESS" ||
        this.purchaseStatus == "SUCCESS_BY_CREDIT"
      );
    },
    purchaseCode() {
      return get(this.purchaseData, "purchaseCode", "");
    },
  },
  methods: {
    async doGetDistribute() {
      try {
        const response = await getDistribute();
        this.distributors = get(response, "data");
        if (this.distributorData) {
          let distributor = this.distributorData;
          this.distributorId = get(distributor, "id");
        } else {
          let distributor = head(this.distributors);
          this.distributorId = get(distributor, "id");
        }
      } catch {
        this.distributors = [];
      }
    },
    getData(obj, index, def = "") {
      return !get(obj, index, "", def) ? def : get(obj, index, "", def);
    },
    doSyncData() {
      const dataSync = {
        distributor: this.distributor,
        remark: this.remark,
      };
      return this.syncData(dataSync);
    },
    callbackCreate(distributor) {
      Swal.fire("สำเร็จ!", "บันทึกข้อมูลเรียบร้อยแล้ว", "success");
      this.closeModal();
      this.distributors = [...this.distributors, distributor];
      this.distributorId = get(distributor, "id", "");
    },
    closeModal() {
      setTimeout(() => {
        this.openModalCreate = false;
      }, 500);
    },
    getStatus(status) {
      return this.convertStatus(status.toLowerCase());
    },
    convertStatus(status) {
      const statusList = {
        pending: '<div class="status-pending">รอการอนุมัติ</div>',
        approved: '<div class="status-approved">อนุมัติแล้ว</div>',
        success: '<div class="status-success">ได้รับสินค้าแล้ว</div>',
        success_by_credit: '<div class="status-success">ได้รับสินค้าแล้ว</div>',
      };
      return statusList[status];
    },
  },
  mounted() {
    this.doGetDistribute();
  },
  watch: {
    distributorId() {
      this.doSyncData();
    },
    remark() {
      this.doSyncData();
    },
  },
};
</script>

<style></style>
