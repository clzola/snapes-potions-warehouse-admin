import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Admin from '../admin/Admin'
import Login from '../login/Login'
import Dashboard from '../dashbaord/Dashboard'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Admin,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        component: Dashboard
      }
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
  let accessToken = store.state.accessToken
  let authenticated = accessToken !== null && accessToken !== undefined

  if (to.matched.some(record => record.meta.requiresAuth) && !authenticated) {
    console.log('next(requiresAuth)')
    next({
      path: '/login',
      params: { nextUrl: to.fullPath }
    })
    return
  }

  if (to.matched.some(record => record.meta.guest) && authenticated) {
    console.log('next(guest)')
    next({ path: '/' })
    return
  }

  console.log('next()')

  next()
})

export default router
