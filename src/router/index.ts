import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: 'index',
        component: () => import('../views/index/Index.vue')
      },
      {
        path: 'video',
        component: () => import('../views/video/Video.vue')
      },
      {
        path: 'show',
        component: () => import('../views/show/Show.vue')
      },
      {
        path: 'me',
        component: () => import('../views/me/Me.vue')
      },
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
