<template>
  <div>
    <Header />
    <div class="container">
      <div class="checkout-cart">
        <ul>
          <li v-for="(p, key) in cart" :key="key">
            <img :src="`http://localhost:8080/products/${p.image}`" />
            <h3>
              {{p.title}}
              <span>{{$store.state.currency | currencyFormater}} {{p.price | priceFormat}}</span>
            </h3>
            <div class="quantity">
              Quantity:
              <input type="number" @input="updateQty($event, key)" class="qty" value="1" />
            </div>
          </li>
        </ul>
        <div class="totals">
          <h2>
            Total:
            <span>{{$store.state.currency | currencyFormater}} {{total | priceFormat}}</span>
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
export default {
  data() {
    return {
      qty: {},
    };
  },
  created(){
      const cart = this.$store.state.cart;
      for(let prd in cart){
          Vue.set(this.qty, prd, 1);
      }
  },
  computed: {
    cart() {
      return this.$store.state.cart;
    },
    total() {
        let totals = 0;
        const cart = this.$store.state.cart;
      for (let prdID in this.qty) {
          totals += cart[prdID].price * this.qty[prdID];
      }
      return totals;
    }
  },
  methods: {
    updateQty(evt, key) {
        if(Number.parseInt(evt.target.value, 10) < 1){
            evt.target.value = 1;
            return;
        }
      Vue.set(this.qty, key, evt.target.value);
    }
  }
};
</script>

<style scoped>
div.checkout-cart ul li {
  display: block;
  clear: both;
  overflow: hidden;
  padding: 20px 5px 20px 0;
  border-bottom: 1px #999 solid;
}
.checkout-cart ul li img {
  float: left;
  width: 100px;
  height: auto;
  padding: 8px;
  border: 1px #ccc solid;
  margin-right: 15px;
}
.checkout-cart ul li h3 {
  font-size: 24px;
}
input.qty {
  width: 50px;
  height: 30px;
  font-size: 18px;
}
div.totals h2 {
  margin: 25px 0 25px 0;
  font-weight: 400;
  font-size: 26px;
}
div.totals h2 span {
  float: right;
  font-weight: 600;
  font-size: 28px;
}
</style>