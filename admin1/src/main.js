// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI, { TabPane } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/index.scss'
import store from '@/store/store.js'

Vue.use(ElementUI)
Vue.config.productionTip = false
// 全局守卫。路由跳转前，验证token，防止未登录的用户跳转到其他页面
router.beforeEach((to,from,next)=>{
  let token = localStorage.getItem('mytoken')
  if(token){
    next()
  }else{
    if(to.path!=='/login'){
      // 如果没有登录，但是访问其他页面就让他跳到login页面
      next({path:'/login'})
    }else{
      //如果没有登录当时访问的是login页面，不干涉用户操作。
      next()
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: c => c(App)
})
