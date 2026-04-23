import { createRouter, createWebHistory } from 'vue-router'
import ShipmentListPage from '../pages/ShipmentListPage.vue'
import ShipmentDetailPage from '../pages/ShipmentDetailPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import { useAuthStore } from '../stores/auth-store'

const routes = [
  {
    path: '/',
    redirect: '/shipments'
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/shipments',
    name: 'ShipmentList',
    component: ShipmentListPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/shipments/:id',
    name: 'ShipmentDetail',
    component: ShipmentDetailPage,
    props: true,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, _, next) => {
  const authStore = useAuthStore()
  
  const isAuthenticated = authStore.isAuthenticated

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' })
  } else if (to.name === 'Login' && isAuthenticated) {
    next({ name: 'ShipmentList' })
  } else {
    next()
  }
})

export default router
