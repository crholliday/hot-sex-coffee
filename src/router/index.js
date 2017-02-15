import Vue from 'vue'
import Router from 'vue-router'
import News from 'components/News'
import Flights from 'components/Flights'

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
      path: '/flights',
      name: 'Flights',
      component: Flights,
      meta: {
        titleText: 'Flight List',
        subtitleText: 'Check flight fares...'
      }
    }
  ]
})
