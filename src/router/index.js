import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Admin from '../admin/Admin'
import Login from '../login/Login'
import Dashboard from '../dashbaord/Dashboard'
import PotionsPage from '../potions/PotionsPage'
import PotionCategoriesPage from '../potionCategories/PotionCategoriesPage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Admin,
    meta: {
      requiresAuth: true
    },
    children: [
      { path: '', component: Dashboard },
      { path: '/potions', component: PotionsPage },
      { path: '/potion-categories', component: PotionCategoriesPage }
    ]
  },
  {
    path: '/login',
    component: Login,
    meta: {
      guest: true
    }
  }
  // {
  //   path: '/',
  //   name: 'home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let authenticated = store.getters.isAuthenticated
  if (store.state.auth.accessToken && store.state.auth.user === null) {
    store.commit('setUserFromToken', store.state.auth.accessToken)
  }

  if (to.matched.some(record => record.meta.requiresAuth) && !authenticated) {
    next({
      path: '/login',
      params: { nextUrl: to.fullPath }
    })
    return
  }

  if (to.matched.some(record => record.meta.guest) && authenticated) {
    next({ path: '/' })
    return
  }

  next()
})

export default router
