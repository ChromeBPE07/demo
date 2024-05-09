import { createRouter, createWebHistory } from 'vue-router'
import Manage from '../views/Manage.vue'
import {store} from "core-js/internals/reflect-metadata";

const routes = [
  {
    path: '/',
    name: 'Manage',
    component: () => import('../views/Manage'),
    redirect: "/home",
    children:[
      { path: 'home',name: 'Home', component: () => import('../views/Home'), },
      { path: 'user',name: 'User', component: () => import('../views/User'), },
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About')
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
