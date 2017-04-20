import Vue from 'vue'
import Router from 'vue-router'
import News from 'components/News'
import Flights from 'components/Flights'
import Todos from 'components/Todos'
import Home from 'components/Home'
import Routes from 'components/Routes'
import Register from 'components/Register'
import Login from 'components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
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
      meta: {
        titleText: 'Todo List',
        subtitleText: 'Get your stuff done...'
      }
    },
    {
      path: '/flights',
      name: 'Flights',
      component: Flights,
      meta: {
        titleText: 'Flight List',
        subtitleText: 'Check flight fares...'
      }
    },
    {
      path: '/routes',
      name: 'Routes',
      component: Routes,
      meta: {
        titleText: 'Route List',
        subtitleText: 'Manage routes used for flights...'
      }
    }
  ]
})
