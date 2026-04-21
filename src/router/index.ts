import { createRouter, createWebHistory } from 'vue-router'
import ShipmentListPage from '../pages/ShipmentListPage.vue'
import ShipmentDetailPage from '../pages/ShipmentDetailPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/shipments'
  },
  {
    path: '/shipments',
    name: 'ShipmentList',
    component: ShipmentListPage
  },
  {
    path: '/shipments/:id',
    name: 'ShipmentDetail',
    component: ShipmentDetailPage,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
