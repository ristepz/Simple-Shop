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
        <MiniCart />
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
import MiniCart from '../MinCart';
export default {
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
    }
  },
  components:{
    MiniCart
  }
};
</script>