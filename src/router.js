import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/dashboard/Login';
import AddUser from './views/dashboard/AddUser';
import AddProduct from './views/dashboard/AddProduct';
import AddCategory from './views/dashboard/AddCategory';

const UserAuth = (to, from, next) => {
  const token = localStorage.getItem('token');
  console.log('TOKEN: ', token);
  if (token) {
    next();
  } else {
    next('/dashboard');
  }
};


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/dashboard',
      component: Login
    },
    {
      path: '/add-user',
      component: AddUser,
      beforeEnter: UserAuth
    },
    {
      path: '/add-product',
      component: AddProduct,
      beforeEnter: UserAuth
    },
    {
      path: '/add-category',
      component: AddCategory,
      beforeEnter: UserAuth
    }
  ]
});
