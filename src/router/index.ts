import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home/index'
  },
  {
    path: '/home',
    component: HomeView,
    children: [{
      path: 'index',
      component: () => import('../views/index/Index.vue'),
      meta: {
        keepAlive: true
      },
    }, {
      path: 'video',
      component: () => import('../views/video/Video.vue')
    }, {
      path: 'show',
      component: () => import('../views/show/Show.vue')
    }, {
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
  {
    path: '/detail/:id',
    component: () => import('../views/index/MovieDetail.vue')
  },
  {
    path: '/cinema-selection/:id',
    component: () => import('../views/index/CinemaSelection.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
