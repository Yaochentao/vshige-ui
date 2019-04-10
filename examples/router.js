import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/swipe-tab',
      component: () => import('../examples/components/e-swipe-tab.vue')
    },
    {
      path: '/touch-flipbook',
      component: () => import('../examples/components/e-touch-flipbook.vue')
    },
  ]
})
