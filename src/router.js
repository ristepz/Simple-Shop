import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/dashboard/Login';
import AddUser from './views/dashboard/AddUser';
import AddProduct from './views/dashboard/AddProduct';
import AddCategory from './views/dashboard/AddCategory';
import SingleProductPage from './views/SingleProductPage';

const UserAuth = (to, from, next) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('user_role');
  if (token && role === 'admin') {
    next();
  } else {
    next('/');
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
      path: '/login',
      component: Login,
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('user_role');
        if (token && role && role === 'admin') {
          next('/add-user');
        } else if (token && role && role === 'user') {
          next('/');
        }
        else {
          next();
        }
      }
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
    },
    {
      path: '/product/:id',
      component: SingleProductPage
    }
  ]
});
