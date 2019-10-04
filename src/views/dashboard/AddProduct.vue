<template>
  <div>
    <Header />
    <div class="container">
      <h4 class="page-title">Add New Product</h4>
      <div class="form-control">
        <input type="text" v-model="title" placeholder="Title" />
      </div>
      <div class="form-control">
        <select v-model="category">
          <option :value="c.id" v-for="(c, index) in categories" :key="`cc-${index}`">{{c.title}}</option>
        </select>
      </div>
      <div class="form-control">
        <input type="text" v-model="price" placeholder="Price" />
      </div>
      <div class="form-control">
        <input type="text" v-model="image" placeholder="Image Url" />
      </div>
      <div class="form-control">
        <textarea v-model="description" placeholder="Description"></textarea>
      </div>
      <div class="form-control">
        <button class="button-primary" @click="AddProduct">Add Product</button>
        <p
          :class="['alert' ,{'alert-success': success, 'alert-danger': !success}]"
          v-if="message"
        >{{message}}</p>
      </div>
    </div>
    <ListProducts :products="allProducts" />
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
      category: "1",
      price: "0.00",
      image: "",
      description: "",
      success: false,
      message: "",
      allProducts: [],
      categories: []
    };
  },
  created(){
    this.getAllProducts();
    this.getCategories();
  },
  methods: {
    AddProduct() {
      AdminApi.defaults.headers.common["Token"] = localStorage.getItem("token");
      AdminApi.post("/product", {
        title: this.title,
        category: this.category,
        price: this.price,
        image: this.image,
        description: this.description
      })
        .then(resp => {
          this.success = resp.data.success;
          this.message = resp.data.success
            ? "Product Created Successfully"
            : "Product can not be created at this moment.";
            this.getAllProducts();
        })
        .catch(err => {});
    },
    getAllProducts() {
      AdminApi.get("/products")
        .then(resp => {
          this.allProducts = resp.data.data;
        })
        .catch(err => {});
    },
    getCategories() {
      AdminApi.get("/categories")
        .then(resp => {
          this.categories = resp.data.data;
          this.category = this.categories[0].id;
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