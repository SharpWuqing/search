import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Index from '@/components/Index'
import Detail from '@/components/Detail'
import Toplist from '@/components/Toplist'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    },
    {
      path:'/toplist',
      name:'toplist',
      component:Toplist
    }
  ]
})
