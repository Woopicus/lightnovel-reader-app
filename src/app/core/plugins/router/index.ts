import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../../../../views/HomeView.vue'
import { LightnovelRoutingModule } from '@/app/modules/lightnovel/Lightnovel routing module.ts'
import TestPage from '@/app/modules/lightnovel/pages/TestPage.vue'
import LoginLightnovelPage from '@/app/modules/lightnovel/pages/LoginLightnovelPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    ...LightnovelRoutingModule,
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../../../../views/AboutView.vue'),
    },
    {
      path: "/test",
      name: "testpage",
      component: TestPage,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginLightnovelPage
    },
  ],
})

export default router
