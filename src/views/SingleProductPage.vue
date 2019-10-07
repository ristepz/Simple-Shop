<template>
  <div>
    <Header />
    <div class="single-product">
      <h3>Single Product</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      default: -1
    }
  }
};
</script>

<style>
</style>