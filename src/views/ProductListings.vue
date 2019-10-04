<template>
  <div class="product-listings">
      <div class="product" v-for="(p, i) in products" 
      :key="i">
      <figure>
          <img :src="`http://localhost:8080/products/${p.image}`" />
          <figcaption>
              {{p.title}}
          </figcaption>
      </figure>
      </div>
  </div>
</template>

<script>
import { AdminApi } from "../services/Auth";
export default {
  data() {
    return {
      products: []
    };
  },
  created() {
    this.getAllProducts();
  },
  methods: {
    getAllProducts() {
      AdminApi.get("/products")
        .then(resp => {
          this.products = resp.data.data;
        })
        .catch(err => {});
    }
  }
};
</script>

<style scoped>
div.product-listings{
    display: flex;
    flex-wrap: wrap;
}
div.product-listings .product{
    flex: 0 0 33.3333333333%;
}
div.product-listings .product figure{
    display: block;
    box-sizing: border-box;
    text-align: center;
    margin: 10px auto;
    padding: 10px;
    width: 320px;
    border: 1px #999 solid;
}
div.product-listings .product figure img{
    display: block;
    margin: 0 auto;
}
</style>