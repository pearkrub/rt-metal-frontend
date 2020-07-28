<template >
  <div>
    <div class="header-purchase">สร้างรายการซื้อ</div>
    <div class="row">
      <div class="address-box col-6">
        <div class="label-purchase">
          รายการสั่งซื้อเลขที่:
          <label class="item-purchase">HP63040001</label>
        </div>
        <div class="label-purchase">
          วันที่:
          <label class="date-box">{{ createDate }}</label>
        </div>
        <div class="label-purchase">
          สถานะ:
          <label class="item-purchase">
            <div class="status-pending">รอการอนุมัติ</div>
          </label>
        </div>
      </div>
      <div class="address-box col-6">
        <div class="label-purchase">หมายเหตุ:</div>
        <div class="label-purchase">
          <textarea class="remark-box" cols="35" rows="3"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
export default {
  name: "CreatePurchase",
  data() {
    return {
      createDate: moment().format("DD/MM/YYYY"),
    };
  },
};
</script>
<style lang="scss">
.header-purchase {
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 28px;

  color: #000000;
}
.label-purchase {
  font-family: Helvetica Neue;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
  color: #373a3c;
  display: flex;
  align-items: center;
}
.item-purchase {
  margin-left: 18px;
  margin-top: 8px;
}
.address-box {
  margin-top: 35px;
}
.date-box {
  width: 147px;
  height: 38px;
  background: #ffffff;
  border: 1px solid #cccccc;
  box-sizing: border-box;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 18px;
  margin-top: 8px;
}
.remark-box {
  background: #ffffff;
  border: 1px solid #cccccc;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 10px;
  margin-top: 5px;
}
</style>