import { createRouter, createWebHistory } from 'vue-router'
import store from './../store/index'
const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../Login.vue'),
    meta: { auth: false },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../Register.vue'),
    meta: { auth: false },
  },

  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../Dashboard.vue'),
    meta: { auth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const tokenLocal = localStorage.getItem('tokenLocal');
  if (to.meta.auth === true && tokenLocal === null) {
    next({ name: 'login' })
  }
  else {
    next()
  }
})

export default router
