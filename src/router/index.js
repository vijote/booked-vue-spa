import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Shop',
    component: () => import(/* webpackChunkName: "about" */ '../views/Shop.vue')
  },
  {
    path: '/register',
    name: 'Register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
  {
    path: '/book/:bookId',
    name: 'BookDetails',
    component: () => import('../views/BookDetails.vue')
  },
  {
    path: '/cart',
    name: 'Checkout',
    component: () => import('../views/Cart.vue')
  },
  {
    path: '/payment',
    name: 'Payment',
    component: () => import('../views/Payment.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/read/:bookId',
    name: 'Reader',
    component: () => import('../views/Reader.vue')
  },
  {
    path: '/recover',
    name: 'Recover',
    component: () => import('../views/Recover.vue')
  },
  {
    path: '/newpassword/:token',
    name: 'NewPassword',
    component: () => import('../views/NewPassword.vue')
  },
  {
    path: '/mybooks',
    name: 'MyBooks',
    component: ()=> import('../views/MyBooks.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
