import { createRouter, createWebHistory } from 'vue-router'
import Manage from '../views/Manage.vue'
import {store} from "core-js/internals/reflect-metadata";

const routes = [
  {
    path: '/',
    name: 'Manage',
    component: () => import('../views/Manage'),
    meta: {title :'后台管理',isCategory: true},
    redirect: "/home",
    children:[
      { path: 'user',name: 'User',meta: {title :'用户管理'}, component: () => import('../views/User')},
      { path: 'pet',name: 'Pet',meta: {title :'流浪动物管理'}, component: () => import('../views/Pet')},
      { path: 'home',name: 'Home',meta: {title :''},component: () => import('../views/Home'), },
      { path: 'person',name: 'Person',meta: {title :'个人信息'}, component: () => import('../views/Person')},
    ]
  },
  {
    path: '/about',
    name: 'About',
    meta: {title :'关于'},
    component: () => import('../views/About')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login')
  },
  {
    path: '/register',
        name: 'Register',
    component: () => import('../views/Register')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// //路由守卫
// router.beforeEach((to,from,next) => {
//   localStorage.setItem("currentPathName", to.name)//设置当前路由名称,为了在Header组件中去使用
//   store.commit("setPath")//触发store的数据更新
//   next()//放行路由
// })

export default router
