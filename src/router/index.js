import Vue from 'vue'
import Router from 'vue-router'
import News from 'components/News'
import Flights from 'components/Flights'
import Todos from 'components/Todos'
import Routes from 'components/Routes'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: News,
      meta: {
        titleText: 'News List',
        subtitleText: 'News from everywhere...'
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
