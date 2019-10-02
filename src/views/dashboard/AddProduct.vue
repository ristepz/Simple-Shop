<template>
  <div>
    <Header />
    <div class="add-user">
      <h4>Add New Product</h4>
      <div class="form-control">
        <input type="text" v-model="title" placeholder="Title" />
      </div>
      <div class="form-control">
        <select v-model="category">
          <option value="1">Category 1</option>
          <option value="2">Category 2</option>
        </select>
      </div>
      <div class="form-control">
        <input type="text" v-model="price" placeholder="Price" />
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
      allProducts: []
    };
  },
  created(){
    this.getAllProducts();
  },
  methods: {
    AddProduct() {
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
        })
        .catch(err => {});
    },
    getAllProducts() {
      AdminApi.get("/products")
        .then(resp => {
          this.allProducts = resp.data.data;
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