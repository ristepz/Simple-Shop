<template>
  <div class="dashboard dashboard-login">
    <div class="login-form">
      <h4>Login</h4>
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
          if (!resp.data.success) {
            // Login Failed
            this.message = resp.data.data;
          } else {
              // Login success
              localStorage.setItem('token', resp.data.data);
              this.$router.replace('/add-user');
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
body {
  background-image: linear-gradient(
    1.3deg,
    rgba(91, 117, 163, 1) 11.4%,
    rgba(68, 98, 128, 1) 77%
  );
}
div.login-form {
  width: 400px;
  margin: 0 auto;
  background: #fff;
  padding: 30px;
  transform: translateY(50%);
}
div.login-form h4 {
  font-weight: 300;
}
</style>