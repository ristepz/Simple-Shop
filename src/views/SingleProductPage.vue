<template>
  <div>
    <Header />
    <div class="container single-product">
      <div class="product-image">
        <img :src="`http://localhost:8080/products/${product.image}`" />
      </div>
      <div class="product-details">
        <h3>
          {{product.title}}
          <span>{{$store.state.currency | currencyFormater}} {{product.price | priceFormat}}</span>
        </h3>
        <p class="desc">{{product.description}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { AdminApi } from "../services/Auth";
export default {
  data() {
    return {
      product: {}
    };
  },
  created() {
    const productID = this.$route.params.id;
    AdminApi.get(`/product/${productID}`)
      .then(resp => {
        this.product = resp.data.data;
      })
      .catch(er => {});
  },
  props: {
    id: {
      type: Number,
      default: -1
    }
  }
};
</script>

<style scoped>
div.product-image {
  float: left;
  padding: 0 25px 0 0;
}
div.product-image img {
  display: block;
  padding: 10px;
  border: 1px #999 solid;
}
div.product-details h3 {
  font-size: 28px;
  color: #333;
  font-weight: 400;
}
</style>