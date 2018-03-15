import Vue from 'vue'
import Router from 'vue-router'
import index from '@/page/index.vue'
import bedInfo from '@/page/bedInfo.vue'
import search from '@/page/search.vue'
import machine from '@/page/machine.vue'
// import test1 from '@/page/test1.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/bedInfo',
      name: 'bedInfo',
      component: bedInfo
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/machine',
      name: 'machine',
      component: machine
    }
  ]
})
