import Vue from 'vue'
import Vuex from 'vuex'
import { AdminApi } from './services/Auth';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    role: '',
    currency: '',
    products: [],
    cart: {},
    categories: [],
  },
  mutations: {
    setUserLogin(state, payload) {
      state.token = payload.token;
      state.role = payload.role;
      state.currency = payload.currency;
      localStorage.setItem("token", payload.token);
      localStorage.setItem("user_role", payload.role);
      localStorage.setItem('currency', payload.currency);
    },
    setProducts(state, products) {
      state.products = products;
    },
    addToCart(state, product) {
      if (!state.cart.hasOwnProperty(product.id)) {
        Vue.set(state.cart, product.id, product);
      }
    },
    removeFromCart(state, productId) {
      Vue.delete(state.cart, productId);
    },
    setCategoryData(state, data) {
      state.categories = data;
    }
  },
  actions: {
    getCategories({ commit }) {
      AdminApi.get("/categories")
        .then(resp => {
          commit('setCategoryData', resp.data.data);
        })
        .catch(err => { });
    },
    getAllProducts({commit}) {
      AdminApi.get("/products")
        .then(resp => {
          commit("setProducts", resp.data.data);
        })
        .catch(err => { });
    },
  }
})
