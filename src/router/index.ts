import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LnHomeView from '@/views/LnHomeView.vue'
import LightnovelsGetView from '@/views/LightnovelsGetView.vue'
import LightnovelGetView from '@/views/LightnovelGetView.vue'
import LightnovelUpdateView from '@/views/LightnovelUpdateView.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/ln1',
      name: 'ln2',
      component: LnHomeView,
    },
    {
      path: '/ln5',
      name: 'lnsGet',
      component: LightnovelsGetView,
    },
    {
      path: '/ln6/:id',
      name: 'lnGet',
      component: LightnovelGetView,
    },
    {
      path: '/ln7/:id',
      name: 'lnUpdate',
      component: LightnovelUpdateView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
