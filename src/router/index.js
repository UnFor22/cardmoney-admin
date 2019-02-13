import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/Layout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('@/views/Login')
    },
    {
      path: '/layout',
      component: Layout,
      redirect: '/layout/home',
      children: [
        {
          path: 'home',
          meta: {
            title: '首页'
          },
          component: ()=> import('@/views/Home')
        },
        {
          path: 'dataReport',
          meta: {
            title: '申请数据报表'
          },
          component: ()=> import('@/views/dataReport/dataReport.vue')
        },
        {
          path: 'summary',
          meta: {
            title: '汇总统计'
          },
          component: ()=> import('@/views/summary/summary.vue')
        },
        {
          path: 'personalQuery',
          meta: {
            title: '个人查询'
          },
          component: ()=> import('@/views/personalQuery/personalQuery.vue')
        },
        
      ]
    }
  ]
})
