<template>
  <div>
    <nav class="dashboard-menu">
      <div class="nav-container">
        <div class="nav-logo">
          <a href="/">Dashboard</a>
        </div>
        <ul class="nav-links">
          <li><router-link to="/add-user">Add User</router-link></li>
          <li><router-link to="/add-product">Add Product</router-link></li>
          <li><router-link to="/add-category">Add Category</router-link></li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style>
nav.dashboard-menu{
    background: #f4f4f4;
}
.nav-links li a.router-link-active{
    border-bottom: 4px solid #303030;
}
</style>