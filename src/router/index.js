import {createRouter, createWebHistory} from 'vue-router'
import request from "@/utils/request";

const routes = [
  {
    path: '/',
    name: 'Manage',
    component: () => import('../views/Manage'),
    meta: {title :'后台管理',isCategory: true, requiresAuth: true}, // 标记为需要登录，且需要管理员权限
    redirect: "/home",
    children:[
      { path: 'user',name: 'User',meta: {title :'用户管理', isAdmin: true}, component: () => import('../views/User')},
      { path: 'pet',name: 'Pet',meta: {title :'流浪动物管理', isAdmin: true}, component: () => import('../views/Pet')},
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

//获取localstorage存储的user数据
function getUser(){
  return localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : false;
}

// 检查用户角色
async function checkUserRole() {
  const user = getUser();
  if (!user.username) return false;
  try {
    const res = await request.get(`/user/username/${user.username}`);
    if (res.code === '200') {
      return res.data.role === user.role;
    }
  } catch (error) {
    console.error('Error checking user role:', error);
    return false;
  }
}

//路由守卫
    router.beforeEach(async (to, from, next) => {
      const user = getUser();
      const rolechk = await checkUserRole();
      console.log("这是user"+ user);
      // next();
      if (to.matched.some(record => record.meta.requiresAuth)) { // 检查路由是否需要登录访问【检查当前路由是否有一个或多个路由记录，并且其中至少一个记录的 meta 字段中具有 requiresAuth 属性，且其值为 true。
        if (!user) {
          next('/login'); // 如果用户未登录，重定向到登录页面
        } else {
          if (to.meta.isAdmin && (user.role !== "admit" || !rolechk)) {
              next('/'); // 如果不是管理员或身份验证失败，重定向到首页
          } else {
              next();
            }// 允许访问
        }
      } else {
        next(); // 允许访问无需登录的页面
      }
    });

export default router
