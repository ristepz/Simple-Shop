<template>
  <header>
    <div class="top-bar">
      <div class="container">
        <span>Welcome to Pataku Furniture Store !</span>
        <ul class="user-menu">
          <li>
            <router-link to="/add-user">Add User</router-link>
          </li>
          <li>
            <router-link to="/add-product">Add Product</router-link>
          </li>
          <li>
            <router-link to="/add-category">Add Category</router-link>
          </li>
          <li>
            <a href="#" @click.prevent="logout">
              <i class="fas fa-sign-out-alt"></i>&nbsp;Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="logo-area">
      <div class="container">
        <div class="logo">
          <img src="@/assets/logo.jpg" />
        </div>
        <div class="search">
          <input type="text" placeholder="Search Store..." />
          <i class="fas fa-search"></i>
        </div>
        <div class="my-cart">
          <span class="cart-count">0</span>
          <i class="fas fa-shopping-cart"></i> My Cart
        </div>
      </div>
    </div>
    <div class="main-nav">
      <div class="container">
        <ul>
          <li><a>Home</a></li>
          <li><a>Categories</a></li>
          <li><a>About</a></li>
          <li><a>Contact</a></li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/dashboard");
    }
  }
};
</script>

<style>
div.top-bar {
  height: 46px;
  background: #f4f4f4;
  line-height: 46px;
  border-bottom: 1px #ededed solid;
  padding: 0 10px;
}
ul.user-menu {
  float: right;
  list-style: none;
}
ul.user-menu li {
  float: left;
}
ul.user-menu li a {
  display: inline-block;
  padding: 0 10px;
  color: #727272;
  text-decoration: none;
  border-left: 1px #ededed solid;
}
ul.user-menu li a:first-child {
  border-left: none !important;
}
ul.user-menu li a:hover {
  color: #369599;
}
div.logo {
  float: left;
}
div.logo-area {
  padding: 16px 0;
  background: #fff;
  clear: both;
  overflow: hidden;
}
div.search {
  float: left;
  margin: 0 0 0 20%;
  width: 400px;
  position: relative;
}
div.search input[type="text"] {
  box-sizing: border-box;
  border: none;
  border-bottom: 1px #d9d9d9 solid;
  height: 40px;
  padding: 24px !important;
  color: #333;
  width: calc(100% - 30px);
  outline: none !important;
}
div.search i {
  color: #ccc;
  padding-left: 10px;
  font-size: 26px;
  position: absolute;
  right: 30px;
  top: 25%;
}
div.my-cart {
  float: right;
  margin-top: 20px;
  position: relative;
}
div.my-cart i {
  font-size: 26px;
  color: rgb(114, 114, 114);
}
span.cart-count {
  position: absolute;
  border-radius: 50%;
  width: 22px;
  height: 20px;
  background: #369599;
  color: #fff;
  text-align: center;
  font-size: 13px;
  right: 24px;
  top: -10px;
}
div.main-nav {
  display: block;
  clear: both;
  overflow: hidden;
  height: 52px;
  background: #369599;
  margin-bottom: 25px;
}
div.main-nav ul {
  list-style: none;
}
div.main-nav ul li {
  float: left;
}
div.main-nav ul li a {
  display: block;
  height: 52px;
  line-height: 52px;
  color: #fff;
  font-weight: 600;
  padding: 0 20px;
}
div.main-nav ul li a:hover{
  color: #333;
}
</style>