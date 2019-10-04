import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  beforeCreate(){
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('user_role');
    if(token && role){
      const payload = {
        token, role
      };
      this.$store.commit('setUserLogin', payload);
    }
  },
  render: h => h(App)
}).$mount('#app')
