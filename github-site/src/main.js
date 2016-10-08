import Vue from 'vue'
import Router from 'vue-router'
import { sync } from 'vuex-router-sync';
import store from 'store/store.js';
import App from './App.vue'; //根元素
import index from 'views/index.vue'; //首页
import module from 'views/module.vue'; //模块详情

// install router
Vue.use(Router)
//全局使用路由 
var router = new Router({
  hashbang:false,
  history:true
});

//路由表
router.map({
  '/index': {
  	name:'index',
    component: index
  },
  '/module/:id':{
  	name:'module',
  	component:module
  }
});

//启动时导航首页
router.redirect({
  '*': '/index'
});

//启动路由，第一个参数root组件，第二个参数入口页面的vue启动元素
router.start(App, 'app')
//路由与store连接
sync(store,router);