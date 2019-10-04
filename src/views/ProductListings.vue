<template>
  <div class="listings-wrap">
    <div class="filters-column"></div>
    <div class="product-listings">
      <div class="product" v-for="(p, i) in products" :key="i">
        <figure>
          <div class="add-to-cart">
            <h3 class="prd-details">Details</h3>
            <i class="fas fa-cart-plus" @click="addToCart(p)"></i>
          </div>
          <img :src="`http://localhost:8080/products/${p.image}`" />
          <figcaption>
            <h3>{{p.title}}</h3>
            <span class="product-price">{{currency}} {{p.price}}</span>
          </figcaption>
        </figure>
      </div>
    </div>
  </div>
</template>

<script>
import { AdminApi } from "../services/Auth";
export default {
  data() {
    return {
      currency: "",
      products: []
    };
  },
  created() {
    this.currency = this.$store.state.currency;
    this.getAllProducts();
  },
  methods: {
    getAllProducts() {
      AdminApi.get("/products")
        .then(resp => {
          this.products = resp.data.data;
          this.$store.commit("setProducts", resp.data.data);
        })
        .catch(err => {});
    },
    addToCart(product) {
        this.$store.commit('addToCart', product);
    }
  }
};
</script>
