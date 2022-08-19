import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    redirect: "personal",
    children: [{
      path: '/personal',
      name: 'personal',
      component: () => import('../views/PersonalView.vue')
    }]
  }
]

const router = new VueRouter({
  routes
})

export default router