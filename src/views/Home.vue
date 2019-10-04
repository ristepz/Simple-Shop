<template>
  <div>
    <Header />
    <ProductListings />
  </div>
</template>

<script>
import Header from "../components/dashboard/Header";
import ProductListings from './ProductListings';

export default {
  data() {
    return {
      allUsers: []
    };
  },
  created() {
  },
  methods: {
  },
  components: {
    Header,
    ProductListings,
  }
};
</script>

<style scoped>
</style>