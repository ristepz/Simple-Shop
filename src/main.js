import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.filter('currencyFormater', (val) => {
  switch (val) {
    case 'EUR':
      return '€';
      break;
    case 'USD':
      return '$';
      break;
  }
});

Vue.filter('priceFormat', (val) => {
  return val.toFixed(2);
});

new Vue({
  router,
  store,
  beforeCreate() {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('user_role');
    const currency = localStorage.getItem('currency');
    if (token && role && currency) {
      const payload = {
        token, role, currency
      };
      this.$store.commit('setUserLogin', payload);
    }
  },
  render: h => h(App)
}).$mount('#app')
