<template>
  <div class="filters-column">
    <div class="filters-pad">
      <div class="form-control">
        <select v-model="category" @change="loadCategoryData">
          <option value="-1">Select Category</option>
          <option :value="c.id" v-for="(c, index) in categories" :key="`cc-${index}`">{{c.title}}</option>
        </select>
      </div>
      <div class="form-control">
        <select v-model="price" @change="filterByPrice">
          <option value="-1">Select Price Range</option>
          <option
            :value="index"
            v-for="(p, index) in priceRange"
            :key="`pr-${index}`"
          >{{p.min}} - {{p.max}}</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import { AdminApi } from "../services/Auth";

export default {
  data() {
    return {
      category: "-1",
      price: 0,
      priceRange: [
        { min: 40, max: 100 },
        { min: 101, max: 210 },
        { min: 211, max: 320 },
        { min: 321, max: 1000 }
      ]
    };
  },
  created() {
    this.$store.dispatch("getCategories");
  },
  computed: {
    categories() {
      const categoryData = this.$store.state.categories;
      return categoryData;
    }
  },
  methods: {
    loadCategoryData() {
      AdminApi.get(`/products/${this.category}`)
        .then(resp => {
          this.$store.commit("setProducts", resp.data.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    filterByPrice() {
      let apiUrl = `products`;
      if (typeof this.priceRange[this.price] !== "undefined") {
        const range = this.priceRange[this.price];
        apiUrl = `products/${range.min}/${range.max}`;
      }
      
      AdminApi.get(apiUrl)
        .then(resp => {
          this.$store.commit("setProducts", resp.data.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
div.filters-column {
  height: 1000px;
  flex: 0 0 300px;
}
div.filters-pad {
  padding: 10px;
  box-sizing: border-box;
  border: 1px #ccc solid;
  margin-right: 5px;
}
div.form-control {
  max-width: 300px !important;
}
div.form-control select {
  max-width: 100%;
}
</style>