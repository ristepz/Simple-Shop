<template>
  <header>
    <div class="top-bar">
      <div class="container">
        <span>Welcome to Pataku Furniture Store !</span>
        <ul class="user-menu">
          <template v-if="isLoggedInUserAdmin">
            <li>
              <router-link to="/add-user">Add User</router-link>
            </li>
            <li>
              <router-link to="/add-product">Add Product</router-link>
            </li>
            <li>
              <router-link to="/add-category">Add Category</router-link>
            </li>
          </template>
          <li v-if="isLoggedIn">
            <a href="#" @click.prevent="logout">
              <i class="fas fa-sign-out-alt"></i>&nbsp;Logout
            </a>
          </li>
          <li v-else>
            <router-link to="/login">
              <i class="fas fa-user-lock"></i>&nbsp;Login
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="logo-area">
      <div class="container">
        <div class="logo">
          <router-link to="/">
            <img src="@/assets/logo.jpg" />
          </router-link>
        </div>
        <div class="search">
          <input type="text" placeholder="Search Store..." />
          <i class="fas fa-search"></i>
        </div>
        <div class="my-cart" @mouseenter="showMiniCart = true" @mouseleave="showMiniCart = false">
          <span class="cart-count">{{productsInCart}}</span>
          <i class="fas fa-shopping-cart"></i> My Cart
          <div class="mini-cart" v-show="showMiniCart">
            <div class="arrow-up"></div>
            <ul>
              <li v-for="(p, i) in miniCart" :key="`prd-${i}`">
                <span :style="{'background': 'url(' + imageUrl + p.image + ')'}"></span>
                <h3>{{p.title}}</h3>
                <h3>{{$store.state.currency}} {{p.price}}</h3>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="main-nav">
      <div class="container">
        <ul>
          <li>
            <a>Home</a>
          </li>
          <li>
            <a>Categories</a>
          </li>
          <li>
            <a>About</a>
          </li>
          <li>
            <a>Contact</a>
          </li>
        </ul>
      </div>
    </div>
  </header>
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
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("user_role");
      this.$store.commit("setUserLogin", { token: "", role: "" });
      this.$router.push("/").catch(() => {});
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.token;
    },
    isLoggedInUserAdmin() {
      const token = this.$store.state.token;
      const userRole = this.$store.state.role;
      return token && userRole && userRole === "admin";
    },
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
  position: relative;
}
div.logo-area:after {
  content: "";
  clear: both;
  display: table;
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
div.main-nav ul li a:hover {
  color: #333;
}
div.mini-cart {
  position: absolute;
  width: 250px;
  height: 300px;
  background: rgb(235, 235, 235);
  border: 1px #999 solid;
  right: -60px;
  top: 50px;
  z-index: 9999;
  -webkit-box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.37);
  -moz-box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.37);
  box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.37);
}
div.mini-cart ul {
  list-style: none;
  width: 250px;
  height: 300px;
  overflow-y: auto;
}
div.mini-cart ul li {
  display: block;
  clear: both;
  overflow: hidden;
  margin: 0 0 12px 0;
  padding: 5px;
  box-sizing: border-box;
  font-size: 12px;
  font-weight: 300;
  border-bottom: 1px #fff solid;
}
div.mini-cart ul li h3 {
  font-weight: 300;
}
div.mini-cart ul li span {
  float: left;
  width: 50px;
  height: 50px;
  border: 1px #ccc solid;
  display: block;
  background-size: cover !important;
  margin: 0 10px 0 0;
}
div.mini-cart div.arrow-up {
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-bottom: 20px solid rgb(235, 235, 235);
  position: absolute;
  left: 50%;
  transform: translateX(-20px);
  top: -20px;
}
</style>