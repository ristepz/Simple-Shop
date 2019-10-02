<template>
  <div>
    <Header />
    <div class="add-user">
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
          <option value>Select Currency</option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../../components/dashboard/Header";
export default {
  components: {
    Header
  }
};
</script>

<style>
</style>