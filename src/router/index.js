import Vue from 'vue'
import VueRouter from 'vue-router'

const App = resolve => require(['../App.vue'], resolve);
const Login = resolve => require(['@/components/Login.vue'], resolve);
const Main = resolve => require(['@/components/main/main.vue'], resolve);
const Home = resolve => require(['@/components/home/home.vue'], resolve);
const NotFound = resolve => require(['@/components/404.vue'], resolve);

//Nav1
const Page1 = resolve => require(['@/module/Nav1/Page1.vue'], resolve);
const PersonList = resolve => require(['@/module/Nav1/PersonList.vue'], resolve);
//Nav2
const Page2 = resolve => require(['@/module/Nav2/Page2.vue'], resolve);

const Page3 = resolve => require(['@/module/Nav3/Page.vue'], resolve);
const test = resolve => require(['@/module/Nav3/test.vue'], resolve);




Vue.use(VueRouter)



const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'login',
      meta: { keepAlive: true },
      hidden: true,
      component: Login
    },
    {
      path: '/404',
      name: '404',
      hidden: true,
      component: NotFound
    },
    {
      path: '/',
      redirect: { name: 'home' },
      component: Main,
      name: '导航一',
      iconCls: 'el-icon-menu',
      children: [
        { path: '/home', name: 'home', meta: { keepAlive: true }, component: Home },
        { path: '/Page1', name: '页面1', meta: { keepAlive: true }, component: Page1 },
        { path: '/PersonList', name: '人员信息',  component: PersonList },
      ]
    },
    {
      path: '/',
      component: Main,
      name: '导航二',
      iconCls: 'el-icon-location',
      children: [
        { path: '/Page2', name: '页面2', meta: { keepAlive: true }, component: Page2 },
      ]
    },
    {
      path: '/',
      component: Main,
      name: '导航三',
      iconCls: 'el-icon-location',
      children: [
        { path: '/Page3', name: 'Page',  component: Page3 },
        { path: '/test', name: '测试页', meta: { keepAlive: true }, component: test },
      ]
    },
  ]
})

// router.beforeEach((to, from, next) => {
//   if (to.name === "login") {
//     next();
//     return;
//   }

//   guardRoute(to, from, next);
// });

function guardRoute(to, from, next) {
  if (to.name === 'home') {
    next({
      name: 'login'
    });
  } else {
    next({
      name: 'login',
      query: {
        redirect: to.fullPath
      }
    });
  }
}


export default router;