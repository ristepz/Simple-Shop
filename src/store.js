import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    role: ''
  },
  mutations: {
    setUserLogin(state, payload){
      state.token = payload.token;
      state.role = payload.role;
      localStorage.setItem("token", payload.token);
      localStorage.setItem("user_role", payload.role);
    }
  },
  actions: {

  }
})
