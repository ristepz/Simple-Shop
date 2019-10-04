import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    role: '',
    currency: '',
    products: [],
    cart: {},
  },
  mutations: {
    setUserLogin(state, payload) {
      state.token = payload.token;
      state.role = payload.role;
      state.currency = payload.currency;
      localStorage.setItem("token", payload.token);
      localStorage.setItem("user_role", payload.role);
    },
    setProducts(state, products) {
      state.products = products;
    },
    addToCart(state, product) {
      if (!state.cart.hasOwnProperty(product.id)) {
        Vue.set(state.cart, product.id, product);
      }
    }
  },
  actions: {

  }
})
