import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home/index.vue')
  },
  {
    path: '/play/:id',
    name: 'Play',
    component: () => import('../views/Play/index.vue')
  },
  {
    path: '/sign_in',
    name: 'SiginIn',
    component: () => import('../views/SignIn/index.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register/index.vue')
  },
  {
    path: '/sort',
    name: 'Sort',
    component: () => import('../views/Sort/index.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search/index.vue')
  },
  {
    path: '/history',
    name: 'History',
    component: () => import('../views/History/index.vue')
  },
  {
    path: '/upload',
    name: 'Upload',
    component: () => import('../views/Upload/index.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import('../views/404/index.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
