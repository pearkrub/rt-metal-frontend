<template>
  <div class="text-center">
    <form class="form-signin" v-on:submit.prevent="postLogin">
      <h1 class="h3 mb-3 font-weight-normal">RT Metal</h1>
      <br />
      <label class="sr-only">Username</label>
      <input
        type="text"
        name="username"
        class="form-control"
        v-model="username"
        placeholder="Username"
        v-validate="'required'"
        autofocus
        :class="{'is-invalid': errors.has('username')}"
      />
      <div class="invalid-feedback">{{ errors.first('username') }}</div>
      <label class="sr-only">Password</label>
      <input
        type="password"
        name="password"
        class="form-control"
        v-model="password"
        placeholder="Password"
        v-validate="'required'"
        :class="{'is-invalid': errors.has('password')}"
      />
      <div class="invalid-feedback">{{ errors.first('password') }}</div>
      <button
        v-if="!loading"
        class="btn btn-lg btn-primary btn-block btn-submit"
        type="submit"
      >เข้าสู่ระบบ</button>
      <button
        v-else
        class="btn btn-lg btn-primary btn-block btn-submit disabled"
        type="button"
      >รอสักครู่...</button>
      <div v-if="isError" class="invalid-error">Username or password incorrect!</div>
    </form>
  </div>
</template>
<script>
import { login, getUserProfile } from "../api";
import store from "store2";

export default {
  name: "LoginPage",
  data() {
    return {
      username: "",
      password: "",
      loading: false,
      isError: false
    };
  },
  methods: {
    async postLogin() {
      if (!this.loading) {
        const validate = await this.$validator.validate();
        if (validate) {
          this.loading = true;
          this.isError = false;
          const payload = {
            username: this.username,
            password: this.password
          };
          try {
            const response = await login(payload);
            store.session.set("accessToken", response.data.token);

            this.$store.commit("updateToken", response.data.token);
            this.$router.push({ name: "home" });
          } catch (error) {
            console.log(error);
            this.isError = true;
            this.loading = false;
            return false;
          }
          try {
            const response = await getUserProfile();
            store.session.set("userProfile", response.data);
            this.$store.commit("updateProfile", response.data);
            this.$router.push({ name: "home" });
          } catch (error) {
            console.log(error);
            this.isError = true;
            this.loading = false;
            return false;
          }
          this.loading = false;
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
  margin-top: 20%;
}
.form-control {
  height: 50px;
  margin: 5px;
}
.btn-submit {
  margin: 5px;
  margin-top: 25px;
}
.invalid-error {
  color: red;
}
</style>