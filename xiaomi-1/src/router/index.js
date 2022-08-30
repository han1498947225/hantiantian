import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'home',
  component: HomeView,
  redirect: 'about',
  children: [{
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/whole',
      name: 'whole',
      component: () => import('../views/WholeView.vue')
    },
    {
      path: '/me',
      name: 'me',
      component: () => import('../views/MeView.vue')
    },
    {
      path: '/details:id',
      name: 'details',
      component: () => import('../views/DetailsView.vue')
    },
    {
      path: '/shopping',
      name: 'shopping',
      component: () => import('../views/ShoppingView.vue')
    },
    {
      path: '/collect',
      name: 'collect',
      component: () => import('../views/CollectView.vue')
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('../views/OrderView.vue')
    },
    {
      path: '/addOrder',
      name: 'addOrder',
      component: () => import('../views/AddOrder.vue')
    }
  ]
},]

const router = new VueRouter({
  routes
})

export default router