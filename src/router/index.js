import Vue from 'vue'
import Router from 'vue-router'
import News from 'components/News'
import Flights from 'components/Flights'
import Todos from 'components/Todos'
import Home from 'components/Home'
import Routes from 'components/Routes'
import Register from 'components/Register'
import Login from 'components/Login'
import store from '../Store'

Vue.use(Router)

function requireAuth (to, from, next) {
  if (!store.state.isLoggedIn) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter: requireAuth,
      meta: {
        titleText: 'Summary Stuff',
        subtitleText: 'All the stuff you need...'
      }
    },
    {
      path: '/news',
      name: 'News',
      component: News,
      meta: {
        titleText: 'News List',
        subtitleText: 'News from everywhere...'
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        titleText: 'Registration',
        subtitleText: 'Get access to all the goodies...'
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        titleText: 'Login',
        subtitleText: 'Get in the house...'
      }
    },
    {
      path: '/todos',
      name: 'Todos',
      component: Todos,
      beforeEnter: requireAuth,
      meta: {
        titleText: 'Todo List',
        subtitleText: 'Get your stuff done...'
      }
    },
    {
      path: '/flights',
      name: 'Flights',
      component: Flights,
      beforeEnter: requireAuth,
      meta: {
        titleText: 'Flight List',
        subtitleText: 'Check flight fares...'
      }
    },
    {
      path: '/routes',
      name: 'Routes',
      component: Routes,
      beforeEnter: requireAuth,
      meta: {
        titleText: 'Route List',
        subtitleText: 'Manage routes used for flights...'
      }
    }
  ]
})
