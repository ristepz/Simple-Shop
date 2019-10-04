<template>
  <div class="container">
    <h4 class="page-title">Add New User</h4>
    <div class="form-control">
      <input type="text" v-model="firstName" placeholder="First Name" />
    </div>
    <div class="form-control">
      <input type="text" v-model="lastName" placeholder="Last Name" />
    </div>
    <div class="form-control">
      <input type="text" v-model="email" placeholder="Email" />
    </div>
    <div class="form-control">
      <input type="password" v-model="password" placeholder="Password" />
    </div>
    <div class="form-control">
      <select v-model="currency">
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
      </select>
    </div>
    <div class="form-control">
      <select v-model="role">
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
    </div>
    <div class="form-control">
      <button class="button-primary" @click="AddUser">Add User</button>
      <p
        :class="['alert' ,{'alert-success': success, 'alert-danger': !success}]"
        v-if="message"
      >{{message}}</p>
    </div>
  </div>
</template>

<script>
import { AdminApi } from "../../services/Auth";
export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      currency: "EUR",
      role: "user",
      message: "",
      success: false
    };
  },
  methods: {
    AddUser() {
      AdminApi.post("/user", {
        first_name: this.firstName,
        last_name: this.lastName,
        email: this.email,
        password: this.password,
        currency: this.currency,
        role: this.role
      })
        .then(resp => {
          this.success = resp.data.success;
          this.message = resp.data.success
            ? "User Created Successfully"
            : "User can not be created at this moment.";
          if (this.success) {
            this.firstName = "";
            this.lastName = "";
            this.email = "";
            this.password = "";
            this.currency = "USD";
            this.role = "user";
            this.$emit('userAdded');
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
