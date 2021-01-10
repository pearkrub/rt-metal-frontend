<template>
  <div>
    <div
      class="modal fade add-user-modal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">เพิ่มข้อมูลผู้ใช้งาน</h5>
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
                ชื่อผู้ใช้งาน
                <span style="color: red">*</span> :
              </label>
              <div class="col-sm-8">
                <input
                  type="text"
                  class="form-control"
                  id="inputEmail2"
                  placeholder="ชื่อผู้ใช้งาน"
                  name="username"
                  v-model="username"
                  v-validate="'required'"
                  :class="{ 'is-invalid': errors.has('username') }"
                />
                <div v-if="errors.has('username')" class="invalid-feedback">
                  {{ errors.first("username") }}
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label for="inputEmail65" class="col-sm-4 col-form-label">
                รหัสผ่าน
                <span style="color: red">*</span> :
              </label>
              <div class="col-sm-8">
                <input
                  type="password"
                  class="form-control"
                  id="inputEmail65"
                  placeholder="รหัสผ่าน"
                  name="password"
                  ref="password"
                  v-model="password"
                  v-validate="'required|min:8'"
                  :class="{ 'is-invalid': errors.has('password') }"
                />
                <div v-if="errors.has('password')" class="invalid-feedback">
                  {{ errors.first("password") }}
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label for="inputEmail6" class="col-sm-4 col-form-label">
                ยืนยันรหัสผ่าน
                <span style="color: red">*</span> :
              </label>
              <div class="col-sm-8">
                <input
                  type="password"
                  class="form-control"
                  id="inputEmail6"
                  placeholder="ยืนยันรหัสผ่าน"
                  name="confirmPassword"
                  v-model="confirmPassword"
                  v-validate="'required|confirmed:password'"
                  :class="{ 'is-invalid': errors.has('confirmPassword') }"
                />
                <div
                  v-if="errors.has('confirmPassword')"
                  class="invalid-feedback"
                >
                  {{ errors.first("confirmPassword") }}
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label for="inputEmail9" class="col-sm-4 col-form-label">
                ชื่อ
                <span style="color: red">*</span> :
              </label>
              <div class="col-sm-8">
                <input
                  type="text"
                  class="form-control"
                  id="inputEmail9"
                  placeholder="ชื่อ"
                  name="firstName"
                  v-model="firstName"
                  v-validate="'required'"
                  :class="{ 'is-invalid': errors.has('firstName') }"
                />
                <div v-if="errors.has('firstName')" class="invalid-feedback">
                  {{ errors.first("firstName") }}
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label for="inputEmail3" class="col-sm-4 col-form-label">
                นามสกุล
                <span style="color: red">*</span> :
              </label>
              <div class="col-sm-8">
                <input
                  type="text"
                  class="form-control"
                  id="inputEmail3"
                  placeholder="นามสกุล"
                  name="lastName"
                  v-model="lastName"
                  v-validate="'required'"
                  :class="{ 'is-invalid': errors.has('lastName') }"
                />
                <div v-if="errors.has('lastName')" class="invalid-feedback">
                  {{ errors.first("lastName") }}
                </div>
              </div>
            </div>
            <div class="form-group row">
              <label for="inputEmail0" class="col-sm-4 col-form-label">
                สิทธิ์การใช้งาน
                <span style="color: red">*</span> :
              </label>
              <div class="col-sm-8">
                <select class="form-control" name="role" v-model="role">
                  <option
                    v-for="(role, index) in roles"
                    :key="index"
                    :value="role"
                  >
                    {{ role }}
                  </option>
                </select>
                <div v-if="errors.has('role')" class="invalid-feedback">
                  {{ errors.first("role") }}
                </div>
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
import { postUser } from "../api";
import Swal from "sweetalert2";
import { get } from "lodash";
import { Validator } from "vee-validate";

export default {
  name: "AddUserModal",
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
      username: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      role: "admin",
      loading: false,
      roles: ["admin", "manager", "staff", "seller"],
    };
  },
  methods: {
    async submit() {
      try {
        const validateResult = await this.$validator.validate();
        if (validateResult) {
          this.loading = true;
          const payload = {
            username: this.username,
            password: this.password,
            confirmPassword: this.confirmPassword,
            firstName: this.firstName,
            lastName: this.lastName,
            role: this.role,
          };
          const response = await postUser(payload);
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
  mounted() {
    const dict = {
      custom: {
        username: {
          required: "กรุณากรอกข้อมูล ชื่อผู้ใช้งาน",
        },
        password: {
          required: "กรุณากรอกข้อมูล รหัสผ่าน",
          min: "กรุณากรอกรหัสผ่านอย่างน้อย 8 ตัวอักษร",
        },
        confirmPassword: {
          required: "กรุณายืนยันรหัสผ่าน",
          confirmed: "กรุณากรอกรหัสผ่านให้ตรงกัน",
        },
        firstName: {
          required: "กรุณากรอกข้อมูล ชื่อ",
        },
        lastName: {
          required: "กรุณากรอกข้อมูล นามสกุล",
        },
        role: {
          required: "กรุณาเลือกสิทธิ์การใช้งาน",
        },
      },
    };

    Validator.localize("th");
    Validator.localize("th", dict);
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
