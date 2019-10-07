<template>
  <div class="my-cart" @mouseenter="showMiniCart = true" @mouseleave="showMiniCart = false">
    <span class="cart-count">{{productsInCart}}</span>
    <i class="fas fa-shopping-cart"></i> My Cart
    <div class="mini-cart" v-show="showMiniCart && Object.keys(miniCart).length">
      <div class="arrow-up"></div>
      <ul>
        <li v-for="(p, i) in miniCart" :key="`prd-${i}`">
          <span :style="{'background': 'url(' + imageUrl + p.image + ')'}"></span>
          <h3>{{p.title}}</h3>
          <h3>
            {{$store.state.currency | currencyFormater}}
            <strong>{{p.price | priceFormat}}</strong>
          </h3>
          <i @click="removeProduct(p.id)" class="remove-product fas fa-trash-alt"></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showMiniCart: false,
      imageUrl: "http://localhost:8080/products/"
    };
  },
  methods: {
    removeProduct(id) {
      this.$store.commit("removeFromCart", id);
    }
  },
  computed: {
    productsInCart() {
      return Object.keys(this.$store.state.cart).length;
    },
    miniCart() {
      return this.$store.state.cart;
    }
  }
};
</script>

<style>
</style>