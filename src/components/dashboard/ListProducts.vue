<template>
  <div class="container">
      <h3>List All Products</h3>
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Category</th>
          <th>Price</th>
          <th>Image</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
          <tr v-for="(product, index) in products" :key="`product-${index}`">
              <td>{{product.title}}</td>
              <td>{{product.category}}</td>
              <td>{{product.price}}</td>
              <td>{{product.image}}</td>
              <td>{{product.description}}</td>
          </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    products: {
      type: Array,
      default: () => []
    }
  }
};
</script>

<style scoped>
table thead tr th, table tbody, tr td{
    color: #fff;
}
</style>