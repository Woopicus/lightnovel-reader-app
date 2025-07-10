import LightnovelCreatePage from './pages/LightnovelCreatePage.vue'
import LightnovelsOverviewPage from './pages/LightnovelsOverviewPage.vue'
import LightnovelDetailsPage from './pages/LightnovelDetailsPage.vue'
import LightnovelEditPage from './pages/LightnovelEditPage.vue'
import type { RouteRecordRaw } from 'vue-router'

export const LightnovelRoutingModule: RouteRecordRaw[] = [
  {
    path: '/lightnovels/create',
    name: 'lightnovel-create-page',
    component: LightnovelCreatePage,
  },
  {
    path: '/lightnovels',
    name: 'lightnovel-overview-page',
    component: LightnovelsOverviewPage,
  },
  {
    path: '/lightnovels/:id/details',
    name: 'lightnovel-details-page',
    component: LightnovelDetailsPage,
  },
  {
    path: '/lightnovels/:id/edit',
    name: 'lightnovel-edit-page',
    component: LightnovelEditPage,
  },
]

