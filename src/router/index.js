import Vue from 'vue'
import Router from 'vue-router'
import loginMask from '@/components/LoginMask'
import jobList_index from '@/components/jobList_index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'loginMask',
      component: loginMask
    },{
      path:'/jobList_index',
      name:'jobList_index',
      component:jobList_index
    }
  ]
})
