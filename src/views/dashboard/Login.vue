<template>
  <div class="dashboard dashboard-login">
    <div class="login-form">
      <h4 class="page-title">Login</h4>
      <div class="form-control">
        <label>Email</label>
        <input type="text" :class="{'invalid': invalidEmail}" v-model="email" placeholder="Email" />
        <p class="validation-error" v-show="invalidEmail">Please enter a valid email.</p>
      </div>
      <div class="form-control">
        <label>Password</label>
        <input type="password" :class="{'invalid': invalidPassword}" v-model="password" />
        <p class="validation-error" v-show="invalidPassword">Please enter a valid password.</p>
      </div>
      <div class="form-control">
        <button class="button-primary" @click="Login">Login</button>
        <p class="validation-error" v-show="message">{{message}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { AdminLogin } from "../../services/Auth";
export default {
  data() {
    return {
      email: "",
      password: "",
      invalidEmail: false,
      invalidPassword: false,
      message: ""
    };
  },
  methods: {
    Login() {
      this.invalidEmail = false;
      this.invalidPassword = false;
      if (!this.email) {
        this.invalidEmail = true;
      }
      if (!this.password) {
        this.invalidPassword = true;
      }
      if (!this.email || !this.password) {
        return;
      }
      AdminLogin(this.email, this.password)
        .then(resp => {
          console.log(resp);
          if (!resp.data.success) {
            // Login Failed
            this.message = resp.data.data;
          } else {
            // Login success
            this.$store.commit('setUserLogin', {token: resp.data.token, role: resp.data.role});
            if (resp.data.role === "admin") {
              this.$router.replace("/add-user");
            } else {
              this.$router.replace("/");
            }
          }
        })
        .catch(err => {
          // Login Failed
          this.message = "Invalid login details";
        });
    }
  }
};
</script>

<style>
div.login-form {
  width: 500px;
  margin: 0 auto;
  background: #fff;
  padding: 30px;
  transform: translateY(50%);
  -webkit-box-shadow: 0px 0px 18px -4px rgba(0, 0, 0, 0.46);
  -moz-box-shadow: 0px 0px 18px -4px rgba(0, 0, 0, 0.46);
  box-shadow: 0px 0px 18px -4px rgba(0, 0, 0, 0.46);
}
div.login-form h4 {
  font-weight: 300;
}
p.validation-error {
  font-size: 12px;
  color: #b10000;
  margin: 10px 0;
}

p.alert {
  display: block;
  padding: 8px;
  margin: 15px 0 10px 0;
}
p.alert-success {
  background: #4fb8bc;
  color: #fff;
}
</style>