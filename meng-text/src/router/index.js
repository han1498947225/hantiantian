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
    redirect: 'page',
    children: [{
        path: '/page',
        name: 'page',
        component: () => import('../views/PageView.vue')
      },
      {
        path: '/member',
        name: 'member',
        component: () => import('../views/MemberView.vue')
      },
      {
        path: '/supplier',
        name: 'supplier',
        component: () => import('../views/SupplierView.vue')
      },
      {
        path: '/goods',
        name: 'goods',
        component: () => import('../views/GoodsView.vue')
      },
      {
        path: '/staff',
        name: 'staff',
        component: () => import('../views/StaffView.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
// 登录鉴权
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.path == '/' && token) {
    next('/about')
  }
  if (to.path == '/about' && !token) {
    next('/')
  }
  next()
})
export default router