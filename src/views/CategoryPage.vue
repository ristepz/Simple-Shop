<template>
  <div>
    <Header />
    <div class="container">
      <div class="product-listings">
        <div class="product" v-for="(c, i) in categories" :key="i">
          <figure>
            <img src="http://localhost:8080/products/product01.jpg" />
            <figcaption>
              <h3>{{c.title}}</h3>
            </figcaption>
          </figure>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AdminApi } from "../services/Auth";
export default {
  data() {
    return {
      categories: {}
    };
  },
  created() {
    AdminApi.get(`/categories`)
      .then(resp => {
        this.categories = resp.data.data;
      })
      .catch(er => {});
  }
};
</script>

<style scoped>
</style>