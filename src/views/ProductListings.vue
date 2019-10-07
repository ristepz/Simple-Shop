<template>
  <div class="listings-wrap">
    <FiltersComp />
    <div class="product-listings">
      <div class="product" v-for="(p, i) in products" :key="i">
        <figure>
          <div class="add-to-cart">
            <h3 class="prd-details">
              <router-link :to="`/product/${p.id}`">Details</router-link>
            </h3>
            <i class="fas fa-cart-plus" @click="addToCart(p)"></i>
          </div>
          <img :src="`http://localhost:8080/products/${p.image}`" />
          <figcaption>
            <h3>{{p.title}}</h3>
            <span class="product-price">{{currency | currencyFormater}} {{p.price | priceFormat}}</span>
          </figcaption>
        </figure>
      </div>
    </div>
  </div>
</template>

<script>
import { AdminApi } from "../services/Auth";
import FiltersComp from "../components/FiltersComp";
export default {
  data() {
    return {
      currency: ""
    };
  },
  created() {
    this.currency = this.$store.state.currency;
    this.$store.dispatch("getAllProducts");
  },
  computed: {
    products() {
      return this.$store.state.products;
    }
  },

  methods: {
    addToCart(product) {
      this.$store.commit("addToCart", product);
    }
  },
  components: {
    FiltersComp
  }
};
</script>
