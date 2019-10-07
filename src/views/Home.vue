<template>
  <div>
    <Header />
    <ProductListings />
  </div>
</template>

<script>
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
    ProductListings,
  }
};
</script>

<style scoped>
</style>