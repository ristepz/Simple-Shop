<template>
  <div>
    <Header />
    <div class="container">
      <h4 class="page-title">Add New Category</h4>
      <div class="form-control">
        <input type="text" v-model="title" placeholder="Title" />
      </div>
      <div class="form-control">
        <button class="button-primary" @click="AddCategory">Add Category</button>
        <p
          :class="['alert' ,{'alert-success': success, 'alert-danger': !success}]"
          v-if="message"
        >{{message}}</p>
      </div>
    </div>
    <table class="stripe-table">
      <thead>
        <tr>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>
          <tr v-for="(c, index) in categories" :key="`c-${index}`">
              <td>{{c.title}}</td>
          </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { AdminApi } from "../../services/Auth";
import Header from "../../components/dashboard/Header";
import ListProducts from '../../components/dashboard/ListProducts';
export default {
  data() {
    return {
      title: "",
      message: '',
      categories: []
    };
  },
  created(){
    this.getCategories();
  },
  methods: {
    AddCategory() {
      AdminApi.post("/category", {
        title: this.title
      })
        .then(resp => {
          this.success = resp.data.success;
          this.message = resp.data.success
            ? "Category Created Successfully"
            : "Category can not be created at this moment.";
            this.getCategories();
        })
        .catch(err => {});
    },
    getCategories() {
      AdminApi.get("/categories")
        .then(resp => {
          this.categories = resp.data.data;
        })
        .catch(err => {});
    }
  },
  components: {
    Header,
    ListProducts
  }
};
</script>

<style>
</style>